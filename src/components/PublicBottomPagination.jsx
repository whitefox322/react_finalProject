import React from 'react';
import {Link} from 'react-router-dom';

import './PublicArticles.less';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';

export class PublicBottomPagination extends React.Component {
    constructor() {
        super();
        this.state = {
            pages: []
        }
    }

    componentWillReceiveProps(newProps) {
        this.filterPagination(newProps.totalPages);
    }

    fillPagination(start, limit, array) {
        for (start; start < limit; start++) {
            array.push(start + 1);
        }
    }

    filterPagination(limit) {
        let array = [];
        let start = this.props.activePage;
        let newLimit = 10;
        let brake = 5;
        let i = 0;

        if (limit > 10) {
            if (start > brake) {
                if (start >= (limit - brake)) {
                    i = limit - newLimit;
                    newLimit = limit;
                    array.push(1);
                    array.push("...");
                    this.fillPagination(i, newLimit, array);
                } else {
                    i = start - brake;
                    newLimit = 9 + i;
                    array.push(1);
                    array.push("...");
                    this.fillPagination(i, newLimit, array);
                    array.push("...");
                    array.push(limit);
                }
            } else {
                this.fillPagination(i, newLimit, array);
                array.push("...");
                array.push(limit);
            }
            this.setState({
                pages: array
            });
        } else {
            this.fillPagination(i, newLimit, array);
        }
    }

    goBack() {
        this.props.goToPage(this.props.activePage - 1);
    }

    goNext() {
        this.props.goToPage(this.props.activePage + 1);
    }

    goToNumber(event) {
        this.props.goToPage(parseInt(event.target.text));
    }

    render() {
        let pathArrow = `/articles/${this.props.activePage}`;
        let stylePrev = "";
        let styleNext = "";

        if (this.props.activePage === 1) {
            stylePrev = "disabled";
        } else if (this.props.activePage === this.props.totalPages) {
            styleNext = "disabled";
        }

        return (
            <div className="navi">
                <ul className="pagination">
                    <li className={stylePrev}>
                        <Link to={pathArrow} className="navi__downlink" onClick={() => this.goBack()}>
                            <FaChevronLeft/>
                        </Link>
                    </li>
                    {
                        this.state.pages.map(page => {
                            let pathNumber = `/articles/${page}`;
                            let styleNumber = "";
                            let key = page + Math.random();

                            if (this.props.activePage === page) {
                                styleNumber = "active";
                            } else if (page === "...") {
                                styleNumber = "disabled";
                            }

                            return (
                                <li key={key} className={styleNumber}>
                                    <Link to={pathNumber} className="navi__downlink" onClick={this.goToNumber.bind(this)}>
                                        {page}
                                    </Link>
                                </li>
                            );
                        })
                    }
                    <li className={styleNext}>
                        <Link to={pathArrow} className="navi__downlink" onClick={() => this.goNext()}>
                            <FaChevronRight/>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}