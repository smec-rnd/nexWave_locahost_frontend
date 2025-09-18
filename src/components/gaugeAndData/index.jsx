import GaugeComponent from "react-gauge-component";
import "./style.css";
import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../context/context";

const GuageAndData = () => {
    const { darkMode, temperature, loss, responceData, displayLoading } = useContext(DashboardContext);

    function convertToIndianTime(utcTimestamp) {
        // Create a Date object using the UTC timestamp
        const utcDate = new Date(utcTimestamp);

        // Define the IST offset in minutes (UTC+5:30)
        const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds

        // Adjust the UTC time to IST
        const istDate = new Date(utcDate.getTime() + istOffset);

        // Format the IST date and time
        const options = {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };

        // Return the formatted IST date string
        return istDate.toLocaleString("en-IN", options);
    }

    const [totalUsageGaugeValues, setTotalUsageGaugeValues] = useState({
        label: {
            valueLabel: {
                fontSize: 40,
                formatTextValue: (value) => `${value}%`,
                matchColorWithArc: true,
                style: { textShadow: "none" },
            },
        },
        value: 30, // Initial value for the gauge
    });

    const [lossGaugeValues, setLossGaugeValues] = useState({
        label: {
            valueLabel: {
                fontSize: 40,
                formatTextValue: (value) => `${value}%`,
                matchColorWithArc: true,
                style: { textShadow: "none" },
            },
        },
        value: 0, // Initial value for the gauge
    });

    const [temperatureGaugeValues, setTemperatureGaugeValues] = useState({
        label: {
            valueLabel: {
                fontSize: 40,
                formatTextValue: (value) => `${value}°C`,
                matchColorWithArc: true,
                style: { textShadow: "none" },
            },
            tickLabels: {
                defaultTickValueConfig: {
                    formatTextValue: (value) => `${value}°C`,
                },
            },
        },
        value: 0, // Initial value for the gauge
    });

    useEffect(() => {
        setTemperatureGaugeValues((prevState) => ({
            ...prevState,
            value: temperature,
        }));

        setLossGaugeValues((prevState) => ({
            ...prevState,
            value: loss,
        }));
    }, [temperature, loss]);
console.log(temperatureGaugeValues)
    return (
        <div className="GuageAndData">
            <div className="guage-1 GuageAndData-child" style={{ background: darkMode ? "black" : "#fff" }}>
                <GaugeComponent height="10" labels={lossGaugeValues.label} value={lossGaugeValues.value} />
                <p style={{ color: darkMode ? "#fff" : "black" }}>AC Output</p>
            </div>
            <div className="guage-2 GuageAndData-child" style={{ background: darkMode ? "black" : "#fff" }}>
                <GaugeComponent height="10" labels={totalUsageGaugeValues.label} value={totalUsageGaugeValues.value} />
                <p style={{ color: darkMode ? "#fff" : "black" }}>Total Usage</p>
            </div>

            <div className=" guage-3 GuageAndData-child" style={{ background: darkMode ? "black" : "#fff" }}>
                <GaugeComponent labels={temperatureGaugeValues.label} value={temperatureGaugeValues.value} />
                <p style={{ color: darkMode ? "#fff" : "black" }}>Temperature</p>
            </div>

            <div className="large-div GuageAndData-child" style={{ background: darkMode ? "black" : "#fff" }}>
                <p style={{ color: darkMode ? "#fff" : "black" }}>Live Status</p>
                <div className="main-sub-div">
                    <div className="sub-div">
                        <p style={{ color: darkMode ? "#fff" : "black" }}>Voltage</p>
                        <div className="h1-div">
                            <h1>230V</h1>
                        </div>
                    </div>
                    <div className="sub-div">
                        <p style={{ color: darkMode ? "#fff" : "black" }}>Power</p>
                        <div className="h1-div">
                            <h1>5.2A</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="GuageAndData-child">
                <table className="container" style={{ background: darkMode ? "black" : "#fff" }}>
                    <thead>
                        <tr>
                            <th>
                                <h1 style={{ color: darkMode ? "white" : "black" }}>Time</h1>
                            </th>
                            <th>
                                <h1 style={{ color: darkMode ? "white" : "black" }}>Sensor 1</h1>
                            </th>
                            <th>
                                <h1 style={{ color: darkMode ? "white" : "black" }}>Sensor 2</h1>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ color: darkMode ? "white" : "black" }}>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 1]
                                    ? convertToIndianTime(
                                          responceData[responceData.length - 1]
                                              ? responceData[responceData.length - 1].column_7
                                              : "No Data"
                                      )
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 1]
                                    ? responceData[responceData.length - 1].column_3
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 1]
                                    ? responceData[responceData.length - 1].column_4
                                    : "No Data"}
                            </td>
                        </tr>

                        <tr>
                            <td style={{ color: darkMode ? "white" : "black" }}>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 2]
                                    ? convertToIndianTime(
                                          responceData[responceData.length - 2]
                                              ? responceData[responceData.length - 2].column_7
                                              : "No Data"
                                      )
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 2]
                                    ? responceData[responceData.length - 2].column_3
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 2]
                                    ? responceData[responceData.length - 2].column_4
                                    : "No Data"}
                            </td>
                        </tr>

                        <tr>
                            <td style={{ color: darkMode ? "white" : "black" }}>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 3]
                                    ? convertToIndianTime(
                                          responceData[responceData.length - 3]
                                              ? responceData[responceData.length - 3].column_7
                                              : "No Data"
                                      )
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 3]
                                    ? responceData[responceData.length - 3].column_3
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 3]
                                    ? responceData[responceData.length - 3].column_4
                                    : "No Data"}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ color: darkMode ? "white" : "black" }}>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 4]
                                    ? convertToIndianTime(
                                          responceData[responceData.length - 4]
                                              ? responceData[responceData.length - 4].column_7
                                              : "No Data"
                                      )
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 4]
                                    ? responceData[responceData.length - 4].column_3
                                    : "No Data"}
                            </td>
                            <td>
                                {displayLoading
                                    ? "Loading..."
                                    : responceData[responceData.length - 4]
                                    ? responceData[responceData.length - 4].column_4
                                    : "No Data"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GuageAndData;
