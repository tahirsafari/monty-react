import React, { Component } from 'react';
//import axios from 'axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import Customer from './Customer';
import Login from "./containers/Login";

class App extends Component {
    render() {
    return (
        <BrowserRouter>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Login}/>
            <Route path="/customers" component={Customer} />
          </Switch>
        </div>
      </BrowserRouter>
          )
  }

}

export default App;
