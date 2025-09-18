
import './App.css'
import GraphAndFunctions from './components/heroSection/graphAndFunctions/index.jsx';
import { useContext } from 'react';
import {DashboardContext} from "./components/context/context.jsx"
import DataFetch from "./components/api/DataFetch.jsx"
import HeaderSection from "./components/headerSection/index.jsx"
import Dashboard from "./components/heroSection/dashboard/index.jsx"
import {Routes,Route,HashRouter} from 'react-router-dom';
import TableData from './components/heroSection/TableData/index.jsx'

function App() {
  const { darkMode } = useContext(DashboardContext);
  return (
    <>
      <div className="App" style={{ background: darkMode ? "#121212" : "#ededed" }}>
        <HashRouter>
          <HeaderSection />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/graph" element={<GraphAndFunctions />} />
            <Route path="/table" element={<TableData />} />
          </Routes>
        </HashRouter>
        <DataFetch />
      </div>
      <div className="no-support-message">
        Sorry, this application is not supported on mobile or tablet devices. Please use a desktop browser.
      </div>
    </>
  );
}

export default App;

