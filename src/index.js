import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './index.css';
import serviceWorker from './serviceWorker.js';
import App from './App';
import Chat from './components/Chat';
import Begin from './components/Begin';
import Exit from './components/Exit';
import Accueil from './components/Acceuil';
import VueEnseignant from './components/VueEnseignant';
//import { PromiseProvider } from 'mongoose';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={Accueil} /> 
        <Route exact path='/etudiant' component={App} />
        <Route exact path='/enseignant' component={VueEnseignant} />
        <Route path='/chat/:id' component={Chat} />
        <Route path='/begin/:id' render={(props) => <Begin {...props} />} />
        <Route path='/exit' component={Exit} />
      </div>
  </Router>,
  document.getElementById('root')
);
serviceWorker();