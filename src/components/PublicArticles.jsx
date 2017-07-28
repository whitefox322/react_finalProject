import React from 'react';

import './PublicArticles.less';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';

import {PublicShortArticle} from './PublicShortArticle';
import {PublicTopPagination} from './PublicTopPagination';

export class PublicArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            activePage: 1,
            limit: 5,
            totalPages: ''
        };
    }

    componentDidMount() {
        let page = this.props.match.params.page;

        if (!page) {
            return this.props.history.push("/articles/1");
        }

        // else дописати ;

        this.getArticles();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.activePage !== prevState.activePage) {
            this.getArticles();
            this.props.history.push(`/articles/${this.state.activePage}`);
        }
    }

    async getArticles() {
        try {
            let response = await fetch(`http://localhost:8081/api/articles/${this.state.activePage}/${this.state.limit}`);
            let responseJSON = await response.json();
            this.setState({
                articles: responseJSON.data,
                totalPages: responseJSON.totalPages
            });
        } catch (error) {
            console.error(error);
        }
    }

    routePage(page) {
        if (page < 1 || page > this.state.totalPages) {
            return;
        }
        this.setState({
            activePage: page
        });
    }

    render() {
        return (
            <div>
                <PublicTopPagination
                    activePage={this.state.activePage}
                    goToPage={(page) => this.routePage(page)}
                />
                <div>
                    {
                        this.state.articles.map(article => {
                            return (
                                <PublicShortArticle
                                    key={article.id}
                                    title={article.title}
                                    image={article.thumbnail}
                                    author={article.authorFullName}
                                    authorID={article.authorID}
                                    articleID={article.id}>
                                    {article.shortContent}
                                </PublicShortArticle>
                            );
                        })
                    }
                </div>
                <nav className="navi">
                    <a className="navi__downlink">
                        <FaChevronLeft/>
                    </a>
                    <a className="navi__downlink">1</a>
                    <a className="navi__downlink">2</a>
                    <a className="navi__downlink">3</a>
                    <a className="navi__downlink">
                        <FaChevronRight/>
                    </a>
                </nav>
            </div>
        );
    }
}