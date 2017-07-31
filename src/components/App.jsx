import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

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
                        <Redirect to="/articles/1"/>
                        <Route
                            exact
                            path="/articles/:page"
                            component={PublicArticles}/>
                        <Route
                            exact
                            path="/:page/article/:articleID/author/:authorID"
                            component={PublicFullArticle}/>
                    </div>
                </div>
            </Router>
        );
    }
}