import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home'
import Page404 from './components/NotFound/Page404';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import DashBoard from './components/dashboard/dashboard';
import Technical from './components/technical/Technical';
import Manage from './components/managerial/Manage';
import Hr from './components/hr/Hr';
function App() {
  return (
    
      <div>
        <Router>
        <Switch>
        <Route exact path="/hr" component={Hr} />
        <Route exact path="/manage" component={Manage} />
        <Route exact path="/technical" component={Technical} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/dashboard" component={DashBoard}/>
        <Route exact path="/" component={Home} />
        <Route exact path="*" component={Page404} />
        
        </Switch>
        </Router>
      </div>
    
  );
}

export default App;
