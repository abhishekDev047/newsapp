import "./App.css";

import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";


export default class App extends Component {

  state = {
    progress: 0
  };

  setProgress=(progress)=>{
    this.setState({ progress: progress})
  }
  render() {
    return (
      <>
      <Router>
        <NavBar />
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
        <Routes>

        <Route exact path="/" element={<News setProgress={this.setProgress} key="general" pagesize={9} country={this.props.country} category="general"/>}> </Route>
        <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports"pagesize={9} country={this.props.country} category="sports"/>}> </Route>
        <Route exact path="/business" element={<News setProgress={this.setProgress} key="business" pagesize={9} country={this.props.country} category="business"/>}> </Route>
        <Route exact path="/health" element={<News setProgress={this.setProgress} key="health" pagesize={9} country={this.props.country} category="health"/>}> </Route>
        <Route exact path="/science" element={<News setProgress={this.setProgress} key="science" pagesize={9} country={this.props.country} category="science"/>}> </Route>
        <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pagesize={9} country={this.props.country} category="entertainment"/>}> </Route>
        <Route exact path="/technology" element={<News setProgress={this.setProgress} key="technology" pagesize={9} country={this.props.country} category="technology"/>}> </Route>
        
        </Routes>
        </Router>
      </>
    );
  }
}
