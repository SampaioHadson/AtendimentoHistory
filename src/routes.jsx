import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
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
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/atendimento">
                    <Atendimento/>
                </Route>
                
            </Switch>
        </Router>
    )
}