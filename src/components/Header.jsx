import React from 'react';
import {Link} from 'react-router-dom';

import buttons from '../publicBtn.json';

export class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            buttons
        };
    }

    render() {
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-brand">
                            MyBlog.com
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {
                                this.state.buttons.map(button => {
                                    return (
                                        <li key={button.id}>
                                            <Link to={button.path}>
                                                {button.name}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <Link to="/login">
                                    Мій профіль
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}