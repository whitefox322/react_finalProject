import React from 'react';
import {Link} from 'react-router-dom';

import './PublicFullArticle.less';

import FaShareSquareO from 'react-icons/lib/fa/share-square-o';

export class PublicFullArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.getArticleData();
    }

    async getArticleData() {
        try {
            let response = await fetch(`http://localhost:8081/api/users/${this.props.match.params.authorID}/articles/${this.props.match.params.articleID}`);
            let responseJSON = await response.json();
            this.setState({
                data: responseJSON
            });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <h2 className="col-xs-12 fullArticle__center fullArticle__title fullArticle__margin">{this.state.data.title}</h2>
                    <div className="col-xs-12 fullArticle__center">
                        <img className="thumbnail fullArticle__img fullArticle__margin" src={this.state.data.thumbnail}/>
                    </div>
                    <div className="col-xs-12 fullArticle__text fullArticle__margin">
                        {this.state.data.content}
                    </div>
                    <div className="col-xs-6 fullArticle__margin">
                        <span className="fullArticle__bottom">
                            <span className="fullArticle__bottom--bold">Автор:</span>
                            <span>{this.state.data.authorFullName}</span>
                        </span>
                    </div>
                    <div className="col-xs-6 fullArticle__margin">
                        <Link to="/articles/1" type="button" className="btn btn-danger pull-right fullArticle__btn">
                            <FaShareSquareO className="fullArticle__bottom--bold"/>
                            До статтей
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}