import { useContext, useEffect } from "react";
import "./style.css";
import { DashboardContext } from "../context/context.jsx";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const Tittle = () => {
  const { darkMode, setBackNav, backNav } = useContext(DashboardContext);
  const navigate = useNavigate();

  const handleBackClick = () => {
    setBackNav(false);
    navigate('/');
  };

  useEffect(() => {
    localStorage.setItem("backnav", backNav);
  }, [backNav])

  return (
    <div className='tittle' style={{ background: darkMode ? "black" : "#fff" }}>
      {backNav && (
        <Tooltip title="Back to Dashboard">
          <h4 onClick={handleBackClick} className={darkMode ? "dark-tittle-h4" : "light-tittle-h4"}><ArrowBackOutlinedIcon /></h4>
        </Tooltip>
      )}
      <h1>NexWave Dashboard</h1>
      {backNav && <div className="spacer"></div>}
    </div>
  );
};

export default Tittle;
