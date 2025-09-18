import React, { useContext, useEffect } from "react";
import { AutoSizer, Column, Table } from "react-virtualized";
import "react-virtualized/styles.css";
import "./style.css";
import { DashboardContext } from "../../context/context";
import Alert from "@mui/material/Alert";

const Index = () => {
    const { responceData, darkMode, displayLoading, setBackNav, displayError } = useContext(DashboardContext);


//   // Function to format date
//   const formatDate = (date) => {
//     const pad = (num) => (num < 10 ? "0" : "") + num;
//     const day = pad(date.getDate());
//     const month = pad(date.getMonth() + 1);
//     const year = date.getFullYear();
//     const hours = pad(date.getHours());
//     const minutes = pad(date.getMinutes());
//     const seconds = pad(date.getSeconds());
//     return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
// };




   // Function to format date with Safari compatibility
const formatDate = (inputDate) => {
    // Ensure input is a valid Date object
    const date = new Date(inputDate);

    // Handle invalid date scenarios
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const pad = (num) => (num < 10 ? "0" : "") + num;

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};


    useEffect(() => {
        setBackNav(true);
    }, [setBackNav]);

    const rowGetter = ({ index }) => responceData[responceData.length - 1 - index];

    const cellRenderer = ({ cellData }) => <div className="table-cell">{cellData}</div>;

    const dateCellRenderer = ({ cellData }) => <div className="table-cell">{formatDate(new Date(cellData + "z"))}</div>;

    return (
        <div className="table-data" style={{ background: darkMode ? "black" : "#fff"}}>
            {displayLoading ? (
                <div className="loading">Loading...</div>
            ) : displayError.graph1Status ? (
                <div className="alert-container">
                    <Alert severity="error" style={{ display: displayError.graph1Status ? "flex" : "none" }}>
                        {displayError.graph1Message}
                    </Alert>
                </div>
            ) : (
                <AutoSizer>
                    {({ height, width }) => {
                        const columnWidths = {
                            slNo: 100,
                            timestamp: 300,
                            sensor1: 100,
                            sensor2: 100,
                            longitude: 100,
                            latitude: 100,
                            speed: 100,
                        };

                        return (
                            <div className="table-container" >
                                <Table
                                    width={2000}
                                    height={height - 10}
                                    headerHeight={27}
                                    rowHeight={23}
                                    rowCount={responceData.length}
                                    rowGetter={rowGetter}
                                    rowClassName={({ index }) => (darkMode ? "table-row-dark" : "table-row-light")}
                                    headerClassName="table-header"
                                    className={darkMode ? "darkmode" : "lightMode"}
                                >
                                    <Column
                                        label="Sl.No"
                                        dataKey="slNo"
                                        width={columnWidths.slNo}
                                        cellRenderer={({ rowIndex }) => <div className="table-cell">{rowIndex + 1}</div>}
                                        className="table-column"
                                    />
                                    <Column
                                        label="Timestamp"
                                        dataKey="column_7"
                                        width={columnWidths.timestamp}
                                        cellRenderer={dateCellRenderer}
                                        className="table-column"
                                    />
                                    <Column
                                        label="INV"
                                        dataKey="column_3"
                                        width={columnWidths.sensor1}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />
                                    <Column
                                        label="BTV"
                                        dataKey="column_4"
                                        width={columnWidths.sensor2}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />
                                    <Column
                                        label="ACI"
                                        dataKey="CPMOP"
                                        width={columnWidths.longitude}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />
                                    <Column
                                        label="LOD"
                                        dataKey="CRDT1"
                                        width={columnWidths.latitude}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />
                                    <Column
                                        label="TMP"
                                        dataKey="CRDT2"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="CRG"
                                        dataKey="CRDT3"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="KWH"
                                        dataKey="CRMIN"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="ACO"
                                        dataKey="DF3KL"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="WAT"
                                        dataKey="DF5KL"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="FLT"
                                        dataKey="GVAT1"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="GVAT2"
                                        dataKey="GVAT2"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="HCP-1"
                                        dataKey="HCP1"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="HCP-2"
                                        dataKey="HCP2"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="HWI-P1"
                                        dataKey="HWIP1"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="HWI-P2"
                                        dataKey="HWIP2"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="MLCDS"
                                        dataKey="MLCDS"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="PMOP1"
                                        dataKey="PMOP1"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="PMOP2"
                                        dataKey="PMOP2"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />

                                    <Column
                                        label="SAMT1"
                                        dataKey="SAMT1"
                                        width={columnWidths.speed}
                                        cellRenderer={cellRenderer}
                                        className="table-column"
                                    />
                                </Table>
                            </div>
                        );
                    }}
                </AutoSizer>
            )}
        </div>
    );
};

export default Index;
