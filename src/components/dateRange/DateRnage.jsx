import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useContext, useState, React } from "react";
import { DashboardContext } from "../context/context";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import "./style.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

function CustomizedDialogs() {
    const {
        setOpenDateRange,
        openDateRange,

        setdataRange,
    } = useContext(DashboardContext);
    const handleCloseDateRange = () => {
        setOpenDateRange(false);
    };
    const submitDateRange = () => {
        setdataRange(`${format(state.startDate, "yyyy-MM-dd 00:00:00")},${format(state.endDate, "yyyy-MM-dd 23:59:59")}`);
        setOpenDateRange(false);
    };
    const [state, setstate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    });
    const handleSelect = (range) => {
        setstate(range.selection);
    };
    return (
        <>
            <BootstrapDialog
                onClose={handleCloseDateRange}
                aria-labelledby="customized-dialog-title"
                open={openDateRange}
                PaperProps={{
                    sx: {
                        minWidth: "400px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px",
                    },
                }}
            >
                {" "}
                <h2 style={{ textAlign: "center", color: "#3d91ff" }}>Date Range</h2>
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDateRange}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <p style={{ fontSize: "12px" }}>{`${format(state.startDate, "dd/MM/yyyy 12:00")}am  to  ${format(
                    state.endDate,
                    "dd/MM/yyyy 11:59"
                )}pm`}</p>
                <DateRangePicker ranges={[state]} maxDate={new Date()} onChange={handleSelect} />
                <div className="button-div">
                    <Button variant="contained" onClick={submitDateRange}>
                        OK
                    </Button>

                    <Button variant="contained" onClick={handleCloseDateRange}>
                        Cancel
                    </Button>
                </div>
            </BootstrapDialog>
        </>
    );
}
export default CustomizedDialogs;
