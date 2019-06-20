'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

import App from './App';
import NewBook from './NewBook';

import './App.css';

function Home() {
    return (
        <div>
            <h1 align="center">British Council Library</h1>
            <Router>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/new-book">New Book</Link></li>
                </ul>
                <Route exact path="/" component={App}/>
                <Route path="/new-book" component={NewBook}/>
            </Router>
        </div>
    )
}

ReactDOM.render(<Home/>, document.getElementById('root'));