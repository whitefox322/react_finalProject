import React from 'react';

import './PublicArticles.less';

import {PublicShortArticle} from './PublicShortArticle';
import {PublicTopPagination} from './PublicTopPagination';
import {PublicBottomPagination} from "./PublicBottomPagination";

export class PublicArticles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            pages: [],
            activePage: 1,
            limit: 5,
            totalPages: ''
        };
    }
    componentWillReceiveProps(newProps) {
        let newPage = newProps.match.params.page;
        if (this.props.match.params.page !== newPage) {
            this.getArticles(newPage);
        }
    }

    componentDidMount() {
        let page = this.props.match.params.page;
        if (!page) {
            return this.props.history.push("/articles/1");
        }
        this.getArticles(page);
    }

    componentDidUpdate(prevProps, prevState) {
        let page = this.state.activePage;
        if (page !== prevState.activePage) {
            this.getArticles(page);
            this.props.history.push(`/articles/${page}`);
        }
    }

    async getArticles(page) {
        try {
            let response = await fetch(`http://localhost:8081/api/articles/${page}/${this.state.limit}`);
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
                    activePage={parseInt(this.props.match.params.page)}
                    totalPages={this.state.totalPages}
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
                                    articleID={article.id}
                                    page={parseInt(this.props.match.params.page)}>
                                    {article.shortContent}
                                </PublicShortArticle>
                            );
                        })
                    }
                </div>
                <PublicBottomPagination
                    activePage={parseInt(this.props.match.params.page)}
                    totalPages={this.state.totalPages}
                    goToPage={(page) => this.routePage(page)}
                />
            </div>
        );
    }
}