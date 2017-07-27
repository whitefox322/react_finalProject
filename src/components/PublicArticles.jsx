import React from 'react';

import './PublicArticles.less';
import FaCaretLeft from 'react-icons/lib/fa/caret-left';
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaChevronLeft from 'react-icons/lib/fa/chevron-left';
import FaChevronRight from 'react-icons/lib/fa/chevron-right';

import {PublicShortArticle} from './PublicShortArticle';

export class PublicArticles extends React.Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            activePage: 1,
            limit: 5,
            totalPages: ''
        };
    }

    componentDidMount() {
        this.getArticles();
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

    render() {
        return (
            <div>
                <nav className="navi">
                    <a className="navi__link">
                        <FaCaretLeft/>
                        Попередня
                    </a>
                    <a className="navi__link">
                        Наступна
                        <FaCaretRight/>
                    </a>
                </nav>
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