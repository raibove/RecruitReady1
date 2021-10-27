import React from 'react';
import './App.css';
// import Main from  './components/audio/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home/Home'
import Page404 from './components/NotFound/Page404';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
function App() {
  return (
    
      <div>
        <Router>
        <Switch>
        {/* <Main/> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="*" component={Page404} />
        </Switch>
        </Router>
      </div>
    
  );
}

export default App;
