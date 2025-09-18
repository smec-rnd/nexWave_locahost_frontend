import {createContext,  useState,useEffect}  from 'react'


export const DashboardContext = createContext(null);

export const DashboardContextProvider =(props)=>{
    const [darkMode,setdarkMode] = useState(true);
    const [dataRange,setdataRange] = useState(localStorage.getItem("time") !== "1h" && localStorage.getItem("time") !== null && localStorage.getItem("time").length <3?localStorage.getItem("time"):"1h");
    const [refreshDelay,setrefreshDelay] = useState(localStorage.getItem("period") !== "5m" && localStorage.getItem("period") !== null ?localStorage.getItem("period"):"5m")
    const [temperature,setTemperature] = useState(0);
    const [loss,setLoss] = useState(false);
    const [graphData1,setGraphData1] = useState();
    const [graphData2,setGraphData2] = useState();
    const [refreshingStatus,setRefreshingStatus] = useState(false);
    const [openDateRange, setOpenDateRange] = useState(false);
    const [displayError,setdDisplayError ] = useState(false);
    const [displayLoading,setdisplayLoading] = useState(false);
    const [saveButtonEnable,setsaveButtonEnable] = useState(false);
    const [responceData,setresponceData] = useState(false);
    const [backNav,setBackNav] = useState(false);
    
    useEffect(()=>{
        localStorage.setItem("time",dataRange);
      },[dataRange])

      useEffect(()=>{
        localStorage.setItem("period",refreshDelay);
      },[refreshDelay])
        
    return(
        <DashboardContext.Provider value={{
        darkMode, 
        setdarkMode,
        dataRange,
        setdataRange,
        refreshDelay,
        setrefreshDelay,
        setGraphData1,
        setGraphData2,
        graphData1,
        graphData2,
        temperature,
        setTemperature,
        setRefreshingStatus,
        refreshingStatus,
        setOpenDateRange,
        openDateRange,
        displayError,
        setdDisplayError,
        displayLoading,
        setdisplayLoading,
        loss,
        setLoss,
        saveButtonEnable,
        setsaveButtonEnable,
        responceData,
        setresponceData,
        setBackNav,
        backNav
        }}>
            {props.children}
        </DashboardContext.Provider>)
}