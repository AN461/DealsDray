import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Home';
import CreateEmployee  from "./components/CreateEmployee";
import EmployeeList from './components/EmployeeList';
import RegistrationForm from "./components/RegistrationForm";
import userContext from "./Context/userContext";
import { useState } from "react";

const App=()=>{
  const [user, setUser] = useState({})
  
  return(
    <>
      <userContext.Provider value={{user,setUser}}>
        <BrowserRouter>
          <Routes>
            <Route exact element={<LoginForm/>} path='/login'></Route>
            <Route exact element={<RegistrationForm/>} path="/register"></Route>
            <Route exact element={<Dashboard/>} path='/'></Route>
            <Route exact element={<CreateEmployee/>} path='/createemployee'></Route>
            <Route exact element={<EmployeeList/>} path='/employeelist'></Route>
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
        
    </>
  );
}

export default App