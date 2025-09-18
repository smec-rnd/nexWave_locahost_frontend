import React from 'react'
import "./style.css"
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import CanvasJSReact from '@canvasjs/react-charts';
import { useContext } from 'react'
import {DashboardContext} from "../context/context.jsx"
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';


const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GaugeAndData2 = () => {

  function calculateDayDifference(dateTimeRange) {
    // Split the input string to get the two date-time strings
    const [dateTime1, dateTime2] = dateTimeRange.split(',');
  
    // Parse the date-time strings into Date objects
    const date1 = new Date(dateTime1);
    const date2 = new Date(dateTime2);
  
    // Get the difference in time in milliseconds
    const differenceInMillis = date2.getTime() - date1.getTime();
  
    // Calculate the difference in days
    const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
  
    // Return the result
    return differenceInDays;
  }

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

  const [progress, setProgress] = React.useState(0);
  const {
    darkMode, 
    graphData1,
    displayError,
    displayLoading,
    dataRange
  }  = useContext(DashboardContext);

  React.useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, [dataRange]);

 




  
  const [series] = useState([44, 55, 41, 17]);
  const options ={
    chart: {
      type: 'donut',
    
      
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: '10px',
        colors: [darkMode?'#fff':'black']
        
      },
      dropShadow: {
        enabled: false,
       
    }
    },
    dropShadow: {
      enabled: false,
     
    },
    legend: {
      position: 'bottom',
      customLegendItems: ["Industry","Household",'Trasport','Other'],
      labels: {
        colors: darkMode? "#fff":"black",
    }
    },
    stroke:{
      show: false,
    },
    theme: {
      mode: darkMode?"black":'#fff', 
      palette: 'palette1', 
      monochrome: {
          enabled: false,
          color: '#255aee',
          
          shadeIntensity: 0.65
      },
  },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 260,
            foreColor: darkMode?"black":'#fff'
          },
          
        },
      },
    ],
  }





  let chartData = {
    series: [{
      data: [44, 55, 41, 64, 22, 43, 21]
    }, {
      data: [53, 32, 33, 52, 13, 44, 32]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 200,
        toolbar: {
          show: false,
        },
        foreColor:darkMode?"#fff":'black' 
        
      },
      theme: {
        mode: 'light', 
        palette: 'palette1', 
        monochrome: {
            enabled: false,
            color: '#255aee',
            
            shadeIntensity: 0.65
        },
    },
    grid:{
      show: false
    },
      
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top',
            
          },
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '10px',
          colors: [darkMode?'#fff':'#000']
        }
      },
      stroke: {
        show: false,
       
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      legend: {
        position: 'right',
        customLegendItems: ["Non Renewable","Renewable"],
       
      },
      xaxis: {
        categories: [2018, 2019, 2020, 2021, 2022, 2023, 2024],
        labels: {
          show: true,
          style: {
              colors: darkMode?"white":"black",
              
              
          },
        }
      },
    },
  }


  const dates = [
    // Example dates data
    { x: new Date('2023-01-01').getTime(), y: 3000000 },
    { x: new Date('2023-02-01').getTime(), y: 3500000 },
    { x: new Date('2023-03-01').getTime(), y: 2800000 },
  ];

  




const option = {
  backgroundColor: darkMode?'black':'#fff',
  axisX: {
    gridThickness: .6,
    valueFormatString:dataRange.length>4&&calculateDayDifference(dataRange)>2?"DD/MM":"HH:mm:ss TT",
 },
 axisY: {
  gridThickness: .6,
  
},
toolTip: {
  contentFormatter: function (e) {
    const date = new Date(e.entries[0].dataPoint.x);
    const formattedDate = convertToDDMMHHMMSS(date);
    return `<span style="color:#00c180;">${formattedDate}</span>, <span style='color:black;'> ${e.entries[0].dataPoint.y}</span>`;
  },
  backgroundColor: "#fff",
},
  theme:darkMode?'dark2':'light1' ,// "light1", "dark1", "dark2"
  animationEnabled: true,
  zoomEnabled: true,
  title: {
      text: "Power Production"
  },
  
  data: [{
      type: "splineArea",
      dataPoints:graphData1,
      color: "#00c180"
  }]
};


  return (
    <div className='GuageAndData2' >
      <div className='GuageAndData2-child' style={{background:darkMode?'black':'#fff'}}>
      <ReactApexChart options={options} series={series} type="donut" height={230}/>
     
         </div>
      <div className='GuageAndData2-child' style={{background:darkMode?'black':'#fff'}}>
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={200} />
      </div>
      <div className='GuageAndData2-child' style={{background:darkMode?'black':'#fff',display:"flex",alignItems:"center",justifyContent:"center"}} >
      
      <CanvasJSChart options={option}  containerProps={{ width: "100%", height:"100%"}}/>
      <Alert severity="error" style={{position:"absolute", zIndex:"100", display:displayError.graph1Status?"flex":"none",textAlign:"center"}}>{displayError.graph1Message}</Alert>
      <CircularProgress variant="determinate" value={progress}  style={{position:"absolute", zIndex:"100",color:"#00c180", display:displayLoading?"flex":"none",textAlign:"center"}}/>
      </div>
    </div>
  )
}

export default GaugeAndData2;
