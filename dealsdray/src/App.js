import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Home';
import CreateEmployee  from "./components/CreateEmployee";
import EmployeeList from './components/EmployeeList';
import RegistrationForm from "./components/RegistrationForm";
import UserContext from "./Context/userContext";
import { useEffect, useState } from "react";

const App=()=>{
  const [user, setUser] = useState(()=>{
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token')
      return JSON.parse(atob(token.split('.')[1]));
    } 
    return{}
  },[])

  useEffect(()=>{
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token')
      setUser(JSON.parse(atob(token.split('.')[1])));
    } 
    console.log(user)
  },[])
  return(
    <>
      <UserContext.Provider value={{user,setUser}}>
        <BrowserRouter>
          <Routes>
            <Route element={<LoginForm/>} path='/login'></Route>
            <Route element={<RegistrationForm/>} path="/register"></Route>
            <Route element={<Dashboard/>} path='/'></Route>
            <Route element={<CreateEmployee/>} path='/createemployee'></Route>
            <Route element={<EmployeeList/>} path='/employeelist'></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
        
    </>
  );
}

export default App