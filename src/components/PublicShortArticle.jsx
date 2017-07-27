import React from 'react';
import {Link} from 'react-router-dom';

import './PublicShortArticle.less';

import FaLanguage from 'react-icons/lib/fa/language';

export class PublicShortArticle extends React.Component {
    render() {
        let path = `/articles/${this.props.articleID}/author/${this.props.authorID}`;

        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading shortArticle__head">
                        <a className="list-group-item">
                            <h4 className="list-group-item-heading shortArticle__title">{this.props.title}</h4>
                        </a>
                    </div>
                    <div className="row panel-body shortArticle__body">
                        <div className="col-xs-12 shortArticle__img">
                            <img className="thumbnail shortArticle__pic" src={this.props.image}/>
                        </div>
                        <p className="col-xs-12 shortArticle__text">{this.props.children}</p>
                    </div>
                    <div className="panel-footer clearfix shortArticle__footer">
                        <span className="shortArticle__bottom shortArticle__line">
                            <span className="shortArticle__bottom--bold">Автор:</span>
                            <span>{this.props.author}</span>
                        </span>
                        <Link to={path} className="btn btn-success pull-right shortArticle__bottom">
                            <FaLanguage className="shortArticle__bottom--bold"/>
                            Переглянути
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}