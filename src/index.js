import React from 'react';
import ReactDOM from 'react-dom';
//import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
// import Customer from './Customer';
// import Login from "./containers/Login";
import registerServiceWorker from './registerServiceWorker';

// const routing = (
//   <Router>
//     <div>
//       <Route path="/" component={Login} />
//       <Route path="/customers" component={Customer} />
//     </div>
//   </Router>
// )
//ReactDOM.render(routing, document.getElementById('root'))
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
