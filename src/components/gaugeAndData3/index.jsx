import React, { useState ,useEffect} from 'react';
import "./style.css"
import ReactApexChart from 'react-apexcharts';
import CanvasJSReact from '@canvasjs/react-charts';
import { useContext } from 'react'
import {DashboardContext} from "../context/context.jsx"
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';



const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const GaugeAndData3 = () => {

  function convertToDDMMHHMMSS(dateString) {
    const date = new Date(dateString);

    const day = ("0" + date.getDate()).slice(-2);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);

    return `${day} ${month} ${hours}:${minutes}:${seconds}`;
  }

  const [options, setOptions] = useState({})

  const {darkMode,graphData2,displayError,displayLoading,dataRange}  = useContext(DashboardContext);


  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, [dataRange]);

  
  useEffect(()=>{

    setOptions({
      chart: {
          toolbar: {
              show: false,
              
          },
          animations: {
            enabled: false,
          },
          
       
        type: 'bar',
      },
      fill: {
          colors: ['#05b8d7']
        },
      theme: {
          mode: 'light'
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', 
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: [darkMode?"#fff":"black"]
        }
      },
      xaxis: {
        
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'bottom',
        axisBorder: {
          show: false
        },
        labels: {
          show: true,
          style: {
              colors: darkMode?"white":"black",
              
          },
        },
        axisTicks: {
          show: false
        },
      
        tooltip: {
          enabled: true,
         
        }
      },
      yaxis: {
        
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false,
        },
        
        labels: {
          
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
     
    });


  },[darkMode])

  
    
      const [series, setSeries] = useState([{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }]);



      
// graph2 option
    
      const option = {
        backgroundColor: darkMode?'black':'#fff',
        axisX: {
          gridThickness: .6,
          
       },
       axisY: {
        
        gridThickness: .6,
        
      },
      toolTip: {
        contentFormatter: function (e) {
          const date = new Date(e.entries[0].dataPoint.x);
          const formattedDate = convertToDDMMHHMMSS(date);
          return `<span style="color:#007ad6";>${formattedDate}</span>, <span style='color: black;'> ${e.entries[0].dataPoint.y}</span>`;
        },
        backgroundColor: "#fff"
      },
        theme:darkMode?'dark2':'light1' , // "light1", "dark1", "dark2"
        animationEnabled: true,
        zoomEnabled: true,
        title: {
            text: "Power consumption"
        },
        
        data: [{
            type: "splineArea",
            dataPoints: graphData2,
            color: "#007ad6"
        }]
      };
      
 
    
  return (
    <div className='GuageAndData3'>
      <div className='GuageAndData3-child ' style={{background:darkMode?"black":"#fff", position:"relative"}} >
        <h5 style={{color:darkMode?"white":"black"}}>Monthly Rating</h5>
      <ReactApexChart options={options} series={series} type="bar" height="85.99%" />
      </div>
      
      <div className='GuageAndData3-child' style={{background:darkMode?"black":"#fff", position:"relative",display:'flex',alignItems:"center",justifyContent:"center"}}>
      <CanvasJSChart options={option}  containerProps={{ width: "100%", height:"100%"}}/>
      <Alert severity="error" style={{position:"absolute", zIndex:"100",display:displayError.graph2Status?"flex":"none",textAlign:"center"}}>{displayError.graph2Message}</Alert>
      <CircularProgress variant="determinate" value={progress}  style={{position:"absolute",color:"#007ad6", zIndex:"100", display:displayLoading?"flex":"none",textAlign:"center"}}/>
      </div>
    </div>
  )
}

export default GaugeAndData3
