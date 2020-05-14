import React, { useEffect } from 'react';
import './NewsSlider.scss';
import refreshIcon from "../assets/refresh.svg";
import arrowLeft from "../assets/round-arrow-left.svg";
import arrowRight from "../assets/round-arrow-right.svg";

const NewsSlider = ( props ) => {
    const {
        articleImgSrc,
        articleTitle,
        articleBody,
        articleSrc,
        articleAuthor,
        prevArticle,
        nextArticle,
        refresh
    } = props.activeArticle;

    return (
        <div className="news-slider">
            <div
                className="news-slider__img"
                style={{ backgroundImage: `url(${articleImgSrc})` }} />
            <div className="news-slider__body">
                <h1>{ articleTitle }</h1>
                <p>{ articleBody }</p>
            </div>
            <div className="news-slider__footer">
                <img src={ refreshIcon } className="news-slider__footer-refresh" />
                <p>{ articleAuthor }</p>
            </div>
            <div className="name-slider__news-api-attr">
                <a href="https://newsapi.org">Powered by News API</a>
            </div>
        </div>
    )
}

export default NewsSlider;