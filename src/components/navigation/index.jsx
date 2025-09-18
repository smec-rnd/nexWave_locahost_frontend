import React from "react";
import "./style.css";
import NightsStayOutlinedIcon from "@mui/icons-material/NightsStayOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TableViewOutlinedIcon from "@mui/icons-material/TableViewOutlined";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { DashboardContext } from "../context/context";
import exportFromJSON from "export-from-json";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CustomizedDialogs from "../dateRange/DateRnage";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import { useNavigate } from "react-router-dom";

/*
  Header component divided into two div "smeclogo-div" and "controler-tool"
  1."smeclogo-div" contain Smec icon and Company Name
  2."controler-tool" contain  Darkmode,Settings,Time,Period,Refreshbutton
*/

const NavBar = () => {
    const {
        darkMode,
        setdarkMode,
        dataRange,
        setdataRange,
        refreshDelay,
        setrefreshDelay,
        responceData,
        setRefreshingStatus,
        refreshingStatus,
        setOpenDateRange,
        saveButtonEnable,
        setBackNav,
    } = useContext(DashboardContext);

    const handleClickOpenDateRange = () => {
        setOpenDateRange(true);
    };

    /* function handiling datarange dropdown menu */
    const handledataRange = (e) => {
        setdataRange(e.target.value);
    };

    /* function handiling refreshDelay dropdown menu */
    const handlerefreshDelay = (e) => {
        setrefreshDelay(e.target.value);
    };

    /* Function to Export respone data to csv file*/
    const csvDownload = () => {
        const formatedDate = (dateString) => {
            const date = new Date(dateString);
            // Convert UTC time to IST
            const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5.5
            const istTime = new Date(date.getTime() + istOffset);
            const day = String(istTime.getDate()).padStart(2, "0");
            const month = String(istTime.getMonth() + 1).padStart(2, "0");
            const year = istTime.getFullYear();
            const hours = String(istTime.getHours()).padStart(2, "0");
            const minutes = String(istTime.getMinutes()).padStart(2, "0");
            const seconds = String(istTime.getSeconds()).padStart(2, "0");
            return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        };







        const convertKeyNames = (data) => {
            return data.map((obj) => ({           
                time_and_date: formatedDate(obj.column_7),
                CHMOP: parseFloat(obj.column_3),
                CHMIN: parseFloat(obj.column_4),
                CPMOP: parseFloat(obj.CPMOP),
                CRDT1: parseFloat(obj.CRDT1),
                CRDT2: parseFloat(obj.CRDT2),
                CRDT3: parseFloat(obj.CRDT3),
                CRMIN: parseFloat(obj.CRMIN),
                DF3KL: parseFloat(obj.DF3KL),
                DF5KL: parseFloat(obj.DF5KL),
                GVAT1: parseFloat(obj.GVAT1),
                GVAT2: parseFloat(obj.GVAT2),
                HCP1: parseFloat(obj.HCP1),
                HCP2: parseFloat(obj.HCP2),
                HWIP1: parseFloat(obj.HWIP1),             
                HWIP2: parseFloat(obj.HWIP2),
                MLCDS: parseFloat(obj.MLCDS),
                PMOP1: parseFloat(obj.PMOP1),
                PMOP2: parseFloat(obj.PMOP2),
                SAMT1: parseFloat(obj.SAMT1),
                STAT1: parseFloat(obj.STAT1),
                STAT2: parseFloat(obj.STAT2),
                STAT3: parseFloat(obj.STAT3),
                STAT4: parseFloat(obj.STAT4),
                STAT5: parseFloat(obj.STAT5)
            }));
        };

        const data = convertKeyNames(responceData);
        const fileName = "Data";
        const exportType = exportFromJSON.types.csv;
        exportFromJSON({ data, fileName, exportType });
    };

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    // This is a setting
    const DrawerList = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            style={{
                width: "300px",
                height: "100vh",
                color: darkMode ? "white" : "#222831",
                textAlign: "center",
                paddingTop: "10px",
                background: darkMode ? "#222831" : "white",
            }}
        >
            <h2>Settings</h2>
        </Box>
    );

    const convertDateFormat = (dateString) => {
        // Split the input string to get the individual date-time parts
        const dates = dateString.split(",");

        // Function to convert date-time string to DD/MM/YYYY format
        function formatDate(dateTimeString) {
            const datePart = dateTimeString.split(" ")[0];
            const [year, month, day] = datePart.split("-");
            return `${day}/${month}/${year}`;
        }

        // Convert both dates to DD/MM/YYYY format
        const startDate = formatDate(dates[0]);
        const endDate = formatDate(dates[1]);

        // Check if the start date and end date are the same
        if (startDate === endDate) {
            return startDate;
        } else {
            // Return the result in the desired format
            return `${startDate} - ${endDate}`;
        }
    };

    const navigate = useNavigate();

    return (
        <div className="Header" style={{ background: darkMode ? "black" : "#fff" }}>
            {/*smeclogo-div start*/}

            <div className="smeclogo-div">
                <img
                    src="smeclogo.webp"
                    alt=""
                    className="smeclogo"
                    onClick={() => {
                        navigate("/");
                    }}
                />
                <p style={{ color: darkMode ? "#fff" : "black" }}>SMEC Automation</p>
            </div>
            {/*smeclogo-div End*/}

            {/*controler-tool start*/}
            <div className="controler-tool">
                <Tooltip title={darkMode ? "Dark Mode" : "Light Mode"}>
                    <div
                        className="icon-border"
                        onClick={() => {
                            setdarkMode(darkMode ? false : true);
                        }}
                    >
                        {darkMode ? (
                            <NightsStayOutlinedIcon className="icons" style={{ color: "#fff" }} />
                        ) : (
                            <WbSunnyOutlinedIcon className="icons" style={{ color: "black" }} />
                        )}
                    </div>
                </Tooltip>

                <div className="icon-border">
                    <Tooltip title="Settings">
                        <SettingsIcon
                            className="icons"
                            style={{ color: darkMode ? "#fff" : "black" }}
                            onClick={toggleDrawer(true)}
                        />
                    </Tooltip>
                </div>

                <div
                    className="icon-border"
                    onClick={() => {
                        navigate("/table");
                        setBackNav(true);
                    }}
                >
                    <Tooltip title="Historical data">
                        <TableViewOutlinedIcon className="icons" style={{ color: darkMode ? "#fff" : "black" }} />
                    </Tooltip>
                </div>

                <div
                    className="icon-border"
                    onClick={() => {
                        navigate("/graph");
                        setBackNav(true);
                    }}
                >
                    <Tooltip title="graphs">
                        <QueryStatsOutlinedIcon className="icons" style={{ color: darkMode ? "#fff" : "black" }} />
                    </Tooltip>
                </div>

                <CustomizedDialogs />

                <Tooltip title="Export">
                    <div className="icon-border">
                        {saveButtonEnable ? (
                            <SaveOutlinedIcon
                                className="icons"
                                style={{ color: darkMode ? "#fff" : "black" }}
                                onClick={csvDownload}
                            />
                        ) : (
                            <SaveOutlinedIcon className="icons" style={{ color: darkMode ? "#fff" : "black" }} />
                        )}
                    </div>
                </Tooltip>
                <Tooltip title="Calender Range">
                    <div className="icon-border">
                        <CalendarMonthIcon
                            className="icons"
                            style={{ color: darkMode ? "#fff" : "black" }}
                            onClick={handleClickOpenDateRange}
                        />
                    </div>
                </Tooltip>

                <FormControl>
                    <Select
                        className="select"
                        value={dataRange}
                        displayEmpty
                        onChange={handledataRange}
                        inputProps={{ "aria-label": "Without label" }}
                        style={{ width: "100%" }}
                    >
                        <MenuItem value="24h">Last 24 Hours</MenuItem>
                        <MenuItem value="12h">Last 12 Hours</MenuItem>
                        <MenuItem value="6h">Last 6 Hours</MenuItem>
                        <MenuItem value="3h">Last 3 Hours</MenuItem>
                        <MenuItem value="1h">Last 1 Hours</MenuItem>
                        {dataRange.length > 4 ? (
                            <MenuItem value={dataRange}>{convertDateFormat(dataRange)}</MenuItem>
                        ) : null}
                    </Select>
                </FormControl>

                <FormControl>
                    <Select
                        className="select"
                        value={refreshDelay}
                        inputProps={{ "aria-label": "Without label" }}
                        onChange={handlerefreshDelay}
                    >
                        <MenuItem value="5s">5s</MenuItem>
                        <MenuItem value="10s">10s</MenuItem>
                        <MenuItem value="30s">30s</MenuItem>
                        <MenuItem value="1m">1m</MenuItem>
                        <MenuItem value="3m">3m</MenuItem>
                        <MenuItem value="5m">5m</MenuItem>
                        <MenuItem value="stop">
                            <b>Stop</b>
                        </MenuItem>
                    </Select>
                </FormControl>

                <input type="checkbox" id="refresh-checkbox" className="refresh-checkbox" />
                <label htmlFor="refresh-checkbox" className="refresh-label">
                    <Tooltip title="Refresh">
                        <div className="icon-border">
                            <AutorenewIcon
                                className="icons refresh-icon"
                                style={{ color: darkMode ? "#fff" : "black" }}
                                onClick={() => {
                                    setRefreshingStatus(!refreshingStatus);
                                }}
                            />
                        </div>
                    </Tooltip>
                </label>
            </div>

            {/* drawer of setting */}
            <Drawer
                open={open}
                anchor="right"
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "#222831",
                    },
                }}
            >
                {DrawerList}
            </Drawer>
            {/*controler-tool End*/}
        </div>
    );
};

export default NavBar;
