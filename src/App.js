import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import MovieHeader from "./components/MovieHeader";
import Navigation from "./components/Navigation"
import Trending from "./pages/Trendings/Trending";
import Movies from "./pages/Movies/Movies";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";

function App(props) {
    return (
        <Router>
            <MovieHeader/>
            <div className="container main-app-container">
                <Switch>
                    <Route path="/" exact={true} component={Trending}/>
                    <Route path="/movies" exact={true} component={Movies}/>
                    <Route path="/series" exact={true} component={Series}/>
                    <Route path="/search" exact={true} component={Search}/>
                </Switch>

            </div>
            <Navigation/>
        </Router>
    );
}

export default App;
