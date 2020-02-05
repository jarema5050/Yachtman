import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import Home from './components/Home';
import Account from './components/Account';
import Ships from './components/Ships';
import Error from './components/Error';
import Navigation from './components/Navigation';
import CruisesView from './components/CruisesView';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
          <Navigation />
            <Switch>
             <Route path="/" component={Account} exact/>
             <Route path="/cruises" component={CruisesView}/>
             <Route path="/ships" component={Ships}/>
            <Route component={Error}/>
           </Switch>
      </BrowserRouter>
    );
  }
}
 
export default App;