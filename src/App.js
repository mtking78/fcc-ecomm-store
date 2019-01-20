import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Details from './components/Details';
import Cart from './components/Cart';
import Default from './components/Default';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" Component={ProductList}></Route>
          <Route path="/details" Component={Details}></Route>
          <Route path="/cart" Component={Cart}></Route>
          <Route Component={Default}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
