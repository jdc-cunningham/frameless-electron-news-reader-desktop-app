import React, { useEffect } from 'react';
import './NewsSlider.scss';
import refreshIcon from "../assets/refresh.svg";
import leftArrow from "../assets/round-arrow-left.svg";
import rightArrow from "../assets/round-arrow-right.svg";

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
                style={{ backgroundImage: `url(${articleImgSrc})` }}>
                <button type="button" className="news-slider__img-btn" onClick={ prevArticle }>
                    <img src={ leftArrow } className="news-slider__img-arrow" alt="left arrow icon" />
                </button>
                <button type="button" className="news-slider__img-btn" onClick={ nextArticle }>
                    <img src={ rightArrow } className="news-slider__img-arrow" alt="right arrow icon" />
                </button>
            </div>
            <div className="news-slider__body">
                <h1>{ articleTitle }</h1>
                <p>{ articleBody }</p>
            </div>
            <div className="news-slider__footer">
                <button title="refresh" type="button" className="news-slider__footer-refresh" onClick={ refresh }>
                    <img src={ refreshIcon } alt="refresh icon" className="news-slider__footer-refresh-icon" />
                </button>
                <p>{ articleAuthor }</p>
            </div>
            <div className="news-slider__news-api-attr">
                <a href="https://newsapi.org">Powered by News API</a>
            </div>
        </div>
    )
}

export default NewsSlider;