import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Slogin from './studentpages/Slogin'
import Sregister from './studentpages/Sregister'
import Alogin from './adminpages/Alogin'
import Ahome from './adminpages/Ahome'
import Shome from './studentpages/Shome'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route,Link } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
  <Route path='/logsuccessstudent' element={<Shome/>}/>
  <Route path='/logsuccessadmin' element={<Ahome/>}/>
  <Route path='/stu-register' element={<Sregister/>}/>
    <Route path='/stu-login' element={<Slogin/>}/>
    <Route path='/adm-login' element={<Alogin/>}/>
    <Route exact path='/' element={<App/>}/>
  </Routes>
  </BrowserRouter>
);

reportWebVitals();
