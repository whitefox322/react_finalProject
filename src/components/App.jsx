import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.less';

import {Header} from './Header';
import {PublicArticles} from "./PublicArticles";
import {PublicFullArticle} from "./PublicFullArticle";

export class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <div className="container">
                        <Route
                            exact
                            path="/"
                            component={PublicArticles}/>
                        <Route
                            exact
                            path="/articles"
                            component={PublicArticles}/>
                        <Route
                            exact
                            path="/articles/:page"
                            component={PublicArticles}/>
                        <Route
                            exact
                            path="/articles/:articleID/author/:authorID"
                            component={PublicFullArticle}/>
                    </div>
                </div>
            </Router>
        );
    }
}