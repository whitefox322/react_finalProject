import React from 'react';
import {Link} from 'react-router-dom';

import './PublicArticles.less';
import FaCaretLeft from 'react-icons/lib/fa/caret-left';
import FaCaretRight from 'react-icons/lib/fa/caret-right';

export class PublicTopPagination extends React.Component {
    constructor() {
        super();
    }

    goBack() {
        this.props.goToPage(this.props.activePage - 1);
    }

    goNext() {
        this.props.goToPage(this.props.activePage + 1);
    }

    render() {
        return (
            <nav className="navi">
                <Link to="/articles/1" className="navi__link" onClick={() => this.goBack()}>
                    <FaCaretLeft/>
                    Попередня
                </Link>
                <Link to="/articles/1" className="navi__link" onClick={() => this.goNext()}>
                    Наступна
                    <FaCaretRight/>
                </Link>
            </nav>
        );
    }
}