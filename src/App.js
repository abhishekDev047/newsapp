import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {
  render() {
    return (
      <>
      <Router>
        <NavBar />
        <Routes>

        <Route exact path="/" element={<News key="general" pagesize={9} country="in" category="general"/>}> </Route>
        <Route exact path="/sports" element={<News  key="sports"pagesize={9} country="in" category="sports"/>}> </Route>
        <Route exact path="/business" element={<News key="business" pagesize={9} country="in" category="business"/>}> </Route>
        <Route exact path="/health" element={<News key="health" pagesize={9} country="in" category="health"/>}> </Route>
        <Route exact path="/science" element={<News key="science" pagesize={9} country="in" category="science"/>}> </Route>
        <Route exact path="/entertainment" element={<News key="entertainment" pagesize={9} country="in" category="entertainment"/>}> </Route>
        <Route exact path="/technology" element={<News key="technology" pagesize={9} country="in" category="technology"/>}> </Route>
        
        </Routes>
        </Router>
      </>
    );
  }
}
