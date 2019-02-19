import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './index.css';
import App from './App';
import Chat from './components/Chat';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/chat/:id' component={Chat} />
      </div>
  </Router>,
  document.getElementById('root')
);