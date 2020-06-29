import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Atendimento from './pages/atendimento/Atendimento'



export default function router(){
    return(
        <Router>   
            <Switch>  
                <Route path="/home">
                    <Home/>
                </Route>
                <Redirect exact from='/' to='/login'/>  
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </Router>
    )
}