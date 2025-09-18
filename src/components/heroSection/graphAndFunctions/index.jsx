import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/context";
import CanvasJSReact from '@canvasjs/react-charts';
import Switch from "@mui/material/Switch";
import "./style.css";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Index = () => {
  const { setBackNav, darkMode, graphData1, graphData2, displayError, displayLoading, dataRange } = useContext(DashboardContext);
  const [sensor1Visible, setSensor1Visible] = useState(true);
  const [sensor2Visible, setSensor2Visible] = useState(true);
  const [showDifference, setShowDifference] = useState(false);
  const [progress, setProgress] = useState(0);
  const [graphType, setGraphType] = useState(localStorage.getItem("graphtype") !== "splineArea" && localStorage.getItem("graphtype") !== null ? localStorage.getItem("graphtype") : "splineArea");

  useEffect(() => {
    localStorage.setItem("graphtype", graphType);
  }, [graphType]);

  function calculateDayDifference(dateTimeRange) {
    const [dateTime1, dateTime2] = dateTimeRange.split(',');
    const date1 = new Date(dateTime1);
    const date2 = new Date(dateTime2);
    const differenceInMillis = date2.getTime() - date1.getTime();
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, [dataRange]);

  useEffect(() => {
    setBackNav(true);
  }, [setBackNav]);

  useEffect(() => {
    if (dataRange.length > 3) {
      setShowDifference(false);
    }
  }, [dataRange]);

  const handleSensor1Toggle = () => {
    setSensor1Visible(prev => !prev);
  };

  const handleSensor2Toggle = () => {
    setSensor2Visible(prev => !prev);
  };

  const handleGraphTypeChange = (event) => {
    setGraphType(event.target.value);
  };

  const generateDifferenceSeries = () => {
    if (!showDifference) return [];

    return graphData1.map((point, index) => ({
      type: "line",
      showInLegend: false,
      markerSize: 0,
      color: "rgba(255, 0, 0, 0.5)", // Red with 50% opacity
      dataPoints: [
        { x: point.x, y: point.y },
        { x: graphData2[index].x, y: graphData2[index].y }
      ]
    }));
  };

  const options = {
    fillOpacity: graphType === "column" ? 1 : 0.3,
    backgroundColor: darkMode ? "black" : "white",
    theme: darkMode ? "dark1" : "light2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: ""
    },
    axisX: {
      gridThickness: 0.1,
      valueFormatString: dataRange.length > 4 && calculateDayDifference(dataRange) > 2 ? "DD/MM" : "HH:mm:ss TT",
      labelFontSize: 10,
      labelFontColor: darkMode ? "white" : "black",
      gridColor: darkMode ? "white" : "black",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      }
    },
    axisY: {
      gridThickness: 0.1,
      labelFontSize: 10,
      labelFontColor: darkMode ? "white" : "black",
      gridColor: darkMode ? "white" : "black",
    },
    toolTip: {
      shared: true,
      backgroundColor: darkMode ? "black" : "white",
      borderColor: darkMode ? "gray" : "black",
      fontColor: darkMode ? "white" : "black",
      contentFormatter: function (e) {
        let content = `<span style="color: ${darkMode ? "white" : "black"};">Date-Time: ${e.entries[0].dataPoint.x.toLocaleString()}</span><br/>`;
        let sensor1Value = null;
        let sensor2Value = null;

        for (let i = 0; i < e.entries.length; i++) {
          if (e.entries[i].dataSeries.name === "Sensor 1") {
            sensor1Value = e.entries[i].dataPoint.y;
            content += `<span style="color: ${e.entries[i].dataSeries.color};">${e.entries[i].dataSeries.name}: </span><span style="color: ${darkMode ? "white" : "black"};">${sensor1Value}</span><br/>`;
          }
          if (e.entries[i].dataSeries.name === "Sensor 2") {
            sensor2Value = e.entries[i].dataPoint.y;
            content += `<span style="color: ${e.entries[i].dataSeries.color};">${e.entries[i].dataSeries.name}: </span><span style="color: ${darkMode ? "white" : "black"};">${sensor2Value}</span><br/>`;
          }
        }

        if (showDifference && sensor1Value !== null && sensor2Value !== null) {
          const difference = sensor1Value - sensor2Value;
          content += `<span style="color: red;">Gap: ${Math.abs(difference).toFixed(2)}</span><br/>`;
        }

        return content;
      }
    },
    data: [
      {
        fillOpacity: graphType === "column" || graphType === "scatter" ? 1 : 0.2,
        type: graphType,
        name: "Sensor 1",
        legendText: "Sensor 1",
        color: sensor1Visible ? "#00a9dc" : "transparent",
        dataPoints: graphData1
      }, 
      {
        fillOpacity: graphType === "column" || graphType === "scatter" ? 1 : 0.2,
        type: graphType,
        name: "Sensor 2",
        color: sensor2Visible ? "rgb(0, 227, 150)" : "transparent",
        dataPoints: graphData2
      },
      ...(showDifference && sensor1Visible && sensor2Visible ? generateDifferenceSeries() : [])
    ]
  };

  const graphStyle = displayError.graph1Status || displayLoading ? { width: "100%" } : {};
  const customizationStyle = displayError.graph1Status || displayLoading ? { display: "none" } : {};

  return (
    <div className="graphAndFunctions">
      <div className="Graph" style={{ ...graphStyle, background: darkMode ? "black" : "white", position: "relative" }}>
        <CanvasJSChart options={options} containerProps={{ width: "100%", height: "100%" }} />
        <Alert severity="error" className="center-alert" style={{ display: displayError.graph1Status ? "flex" : "none" }}>{displayError.graph1Message}</Alert>
        <CircularProgress
          variant="determinate"
          value={progress}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "#007ad6",
            zIndex: 100,
            display: displayLoading ? "flex" : "none",
            textAlign: "center"
          }}
        />
      </div>
      <div className="graph-customization" style={{ ...customizationStyle, background: darkMode ? "black" : "white" }}>
        <h3 style={{ color: darkMode ? "white" : "black", textAlign: "center" }}>Charts</h3>
        <div>
          <select
            value={graphType}
            onChange={handleGraphTypeChange}
            style={{ color: darkMode ? "white" : "black", width: "100%", border: "1px solid grey", fontSize: "15px", background: darkMode ? "black" : "white" }}>
            <option value="spline">Curved</option>
            <option value="splineArea">Curved Area</option>
            <option value="line">Line </option>
            <option value="area">Line Area</option>
            <option value="column">Bar</option>
            <option value="scatter">Scatter</option>
            <option value="stepLine">Step Line</option>
            <option value="stepArea">Step Area</option>
          </select>
          <p className="switches" style={{ color: darkMode ? "white" : "black" }}>
            Sensor 1:
            <Switch
              checked={sensor1Visible}
              onChange={handleSensor1Toggle}
              sx={{
                "& .MuiSwitch-switchBase": {
                  color: "#00a9dc",
                  "&:hover": {
                    backgroundColor: "rgba(0 169 220 0.08)",
                  },
                },
                "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                  backgroundColor: "#00a9dc",
                },
              }}
            />
          </p>
          <p className="switches" style={{ color: darkMode ? "white" : "black" }}>
            Sensor 2:
            <Switch
              checked={sensor2Visible}
              onChange={handleSensor2Toggle}
              sx={{
                "& .MuiSwitch-switchBase": {
                  color: "rgb(0 227 150)",
                  "&:hover": {
                    backgroundColor: "rgba(0 227 150 .08)",
                  },
                },
                "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                  backgroundColor: "rgb(0 227 150)",
                },
              }}
            />
          </p>
          {sensor1Visible && sensor2Visible &&(dataRange.length <= 3?true:(calculateDayDifference(dataRange)===0)) && (
            <p className="switches" style={{ color: darkMode ? "white" : "black" }}>
              Gap:
              <Switch
                checked={showDifference}
                onChange={() => setShowDifference(prev => !prev)}
                sx={{
                  "& .MuiSwitch-switchBase": {
                    color: "red",
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.08)",
                    },
                  },
                  "& .MuiSwitch-switchBase + .MuiSwitch-track": {
                    backgroundColor: "red",
                  },
                }}
              />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
             