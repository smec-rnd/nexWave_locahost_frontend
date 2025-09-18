import React from "react";
import { useContext, useEffect } from "react";
import { DashboardContext } from "../context/context";
import axios from "axios";

const DataFetch = () => {
  const {
    refreshDelay,
    dataRange,
    setGraphData1,
    setGraphData2,
    setTemperature,
    refreshingStatus,
    setdDisplayError,
    setdisplayLoading,
    setLoss,
    setsaveButtonEnable,
    setresponceData,
  } = useContext(DashboardContext);

  function splitDateRange(dateRangeStr, daysPerSegment = 10){
    const [startDateStr, endDateStr] = dateRangeStr.split(',');
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const result = [];
    let currentStartDate = startDate;

    function formatDate(date, endOfDay = false) {
      const pad = (n) => n.toString().padStart(2,'0');
      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1);
      const day = pad(date.getDate());
      const hours = endOfDay ? '23':'00';
      const minutes = endOfDay ? '59':'00';
      const seconds = endOfDay ? '59':'00';
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    while (currentStartDate < endDate) {
      let currentEndDate = new Date(currentStartDate);
      currentEndDate.setDate(currentEndDate.getDate() + daysPerSegment - 1);
      if (currentEndDate > endDate) {
        currentEndDate = endDate;
      }
      result.push(`${formatDate(currentStartDate)},${formatDate(currentEndDate, true)}`);
      currentStartDate = new Date(currentEndDate);
      currentStartDate.setDate(currentStartDate.getDate() + 1);
    }

    return result;
  }

  useEffect(() => {
    setGraphData1([]);
    setGraphData2([]);

    const fetchData = async () => {
      try {
        if (dataRange.length < 4) {
          let mappedData1 = [];
          let mappedData2 = []; 
          const response = await axios.get(`${window.__APP_CONFIG__.API_URL}?id=${dataRange}`
          //`https://blpmiknxs8.execute-api.us-east-2.amazonaws.com/Deployment/rest_demo?id=${dataRange}`
          );
          console.log(response)
          setresponceData(response.data.body);
          setsaveButtonEnable(true);
          setdisplayLoading(false);
          if (response.data.body.length !== 0) {
            setLoss(response.data.body[response.data.body.length - 1].column_4);
            setTemperature(response.data.body[response.data.body.length - 1].column_3);
          }
          mappedData1 = mappedData1.concat(
            response.data.body.map((item) => ({
              x: new Date(item.column_7 + "z") || 0,
              y: parseFloat(item.column_3) || 0,
            }))
          );
 
          mappedData2 = mappedData2.concat(
            response.data.body.map((item) => ({
              x: new Date(item.column_7 + "z") || 0,
              y: parseFloat(item.column_4) || 0,
            }))
          );

          setGraphData1(mappedData1);
          setGraphData2(mappedData2);

          if (mappedData1.length === 0 && mappedData2.length === 0) {
            setdDisplayError({
              graph1Status: true,
              graph1Message: "No Data Found",
              graph2Status: true,
              graph2Message: "No Data Found",
            });
          } else {
            if (mappedData1.length === 0) {
              setdDisplayError({
                graph1Status: true,
                graph1Message: "No Data Found",
                graph2Status: false,
                graph2Message: "",
              });
            } else if (mappedData2.length === 0) {
              setdDisplayError({
                graph1Status: false,
                graph1Message: "",
                graph2Status: true,
                graph2Message: "No Data Found",
              });
            }
          }
        } else {
          let mappedData1 = [];
          let mappedData2 = [];
          const allResponseData = [];
          const splitedDateRange = splitDateRange(dataRange);

          for (let i = 0; i < splitedDateRange.length; i++) {
            const response = await axios.get(
              `${window.__APP_CONFIG__.API_URL}?id=${splitedDateRange[i]}`
              // `https://blpmiknxs8.execute-api.us-east-2.amazonaws.com/Deployment/rest_demo?id=${splitedDateRange[i]}`
            );
            allResponseData.push(...response.data.body);
           
            mappedData1 = mappedData1.concat(
              response.data.body.map((item) => ({
                x: new Date(item.column_7 + "z") || 0,
                y: parseFloat(item.column_3) || 0,
              }))
            );

            mappedData2 = mappedData2.concat(
              response.data.body.map((item) => ({
                x: new Date(item.column_7 + "z") || 0,
                y: parseFloat(item.column_4) || 0,
              }))
            );
          }

          setresponceData(allResponseData);
          setsaveButtonEnable(true);
          if (allResponseData.length !== 0) {
            setLoss(allResponseData[allResponseData.length - 1].DF3KL);
            setTemperature(allResponseData[allResponseData.length - 1].CRDT2);
          }

          setdisplayLoading(false);
          setGraphData1(mappedData1);
          setGraphData2(mappedData2);
          setdDisplayError({
            graph1Status: false,
            graph1Message: "",
            graph2Status: false,
            graph2Message: "",
          });

          if (mappedData1.length === 0 && mappedData2.length === 0) {
            setdDisplayError({
              graph1Status: true,
              graph1Message:"No Data Found",
              graph2Status: true,
              graph2Message: "No Data Found",
            });
          } else {
            if (mappedData1.length === 0) {
              setdDisplayError({
                graph1Status: true,
                graph1Message:"No Data Found",
                graph2Status: false,
                graph2Message:"",
              });
            } else if (mappedData2.length === 0) {
              setdDisplayError({
                graph1Status: false,
                graph1Message:"",
                graph2Status: true,
                graph2Message: "No Data Found",
              });
            }
          }
        }
      } catch (error) {
        
        setsaveButtonEnable(false);
        setGraphData1([]);
        setGraphData2([]);
        setdisplayLoading(false);
        if (error.message === "Cannot read properties of undefined (reading 'column_3')") {
          setdDisplayError({
            graph1Status: true,
            graph1Message: "No data Available",
            graph2Status: true,
            graph2Message: "No data Available",
          });
        } else {
          setdDisplayError({
            graph1Status: true,
            graph1Message: error.message,
            graph2Status: true,
            graph2Message: error.message,
          });
        }
      }
    };
    fetchData();

    const intervalDurations = {
      "5s": 5000,
      "10s": 10000,
      "15s": 15000,
      "30s": 30000,
      "1m": 60000,
      "3m": 180000,
      "5m": 300000,
    };

    if (refreshDelay in intervalDurations) {
      const interval = setInterval(fetchData, intervalDurations[refreshDelay]);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRange, refreshDelay, refreshingStatus]);

  useEffect(() => {
    setdDisplayError({
      graph1Status: false,
      graph1Message: "",
      graph2Status: false,
      graph2Message: "",
    });
    setdisplayLoading(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRange, refreshDelay, refreshingStatus]);

  return <></>;
};

export default DataFetch;



