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
        let path = `/articles/${this.props.activePage}`;
        let stylePrev = "";
        let styleNext = "";

        if (this.props.activePage === 1) {
            stylePrev = "disabled";
        } else if (this.props.activePage === this.props.totalPages) {
            styleNext = "disabled";
        }

        return (
            <div className="navi">
                <ul className="pager">
                    <li className={stylePrev}>
                        <Link to={path} className="navi__link" onClick={() => this.goBack()}>
                            <FaCaretLeft/>
                            Попередня
                        </Link>
                    </li>
                    <li className={styleNext}>
                        <Link to={path} className="navi__link" onClick={() => this.goNext()}>
                            Наступна
                            <FaCaretRight/>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}