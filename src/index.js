import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {DashboardContextProvider} from './components/context/context'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <DashboardContextProvider>
       <App />
   </DashboardContextProvider>
   
 
);


reportWebVitals();
