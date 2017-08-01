import React from 'react';
import {Link} from 'react-router-dom';

import './Header.less';
import buttons from '../publicBtn.json';
import { Modal } from 'antd';
import LoginForm from "./LoginForm";

export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons,
            isSelected: 0,
            visible: false
        };
    }

    changeSelect(btn) {
        let newSelect = parseInt(btn);
        this.setState({
            isSelected: newSelect
        });
    }

    showModal() {
        this.setState({
            visible: true,
        });
    }

    handleOk(e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel (e) {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        return (
            <nav className="navbar navbar-inverse header">
                <div className="container-fluid">
                    <div className="navbar-header header__brand">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/articles/1" className="navbar-brand">
                            MyBlog.com
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            {
                                this.state.buttons.map(button => {
                                    let activeStyle = "";
                                    if (this.state.isSelected === parseInt(button.id)) {
                                        activeStyle = "active";
                                    }

                                    return (
                                        <li className={activeStyle} key={button.id} onClick={this.changeSelect.bind(this, button.id)}>
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
                                <Link to="#">
                                    Зареєструватися
                                </Link>
                            </li>
                            <li>
                                <Link to="#" onClick={() => this.showModal()}>
                                    Увійти в кабінет
                                </Link>
                                <Modal
                                    title="Вхід у особистий кабінет"
                                    visible={this.state.visible}
                                    onOk={this.handleOk.bind(this)}
                                    onCancel={this.handleCancel.bind(this)}
                                    footer={null}
                                >
                                    <LoginForm/>
                                </Modal>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}