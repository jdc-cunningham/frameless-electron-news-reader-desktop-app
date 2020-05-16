import React, { useEffect } from 'react';
import './NewsSlider.scss';
import refreshIcon from "../assets/refresh.svg";
import leftArrow from "../assets/round-arrow-left.svg";
import rightArrow from "../assets/round-arrow-right.svg";

const NewsSlider = ({ articles, prevArticle, nextArticle, refresh, slideClass, slideDone, translatePercentage }) => {
    const renderSlide = ( articleData, slideIndex ) => {
        const {
            author,
            description,
            title,
            urlToImage
        } = articleData;
        return (
            <div
                style={{
                    transform: `translateX(${translatePercentage}%)`
                }}
                key={ slideIndex }
                className="news-slide">
                <div
                    className="news-slider__img"
                    style={{ backgroundImage: `url(${urlToImage})` }}>
                    <button type="button" className="news-slider__img-btn" onClick={ prevArticle } disabled={ slideDone ? false : true }>
                        <img src={ leftArrow } className="news-slider__img-arrow" alt="left arrow icon" />
                    </button>
                    <button type="button" className="news-slider__img-btn" onClick={ nextArticle } disabled={ slideDone ? false : true }>
                        <img src={ rightArrow } className="news-slider__img-arrow" alt="right arrow icon" />
                    </button>
                </div>
                <div className="news-slider__body">
                    <h1>{ title }</h1>
                    <p>{ description }</p>
                </div>
                <div className="news-slider__footer">
                    <button title="refresh" type="button" className="news-slider__footer-refresh" onClick={ refresh } disabled={ slideDone ? false : true }>
                        <img src={ refreshIcon } alt="refresh icon" className="news-slider__footer-refresh-icon" />
                    </button>
                    <p>{ author }</p>
                </div>
                <div className="news-slider__news-api-attr">
                    <a href="https://newsapi.org">Powered by News API</a>
                </div>
            </div>
        )
    }

    const renderArticles = articles => articles.map((article, index) => { return renderSlide(article, index) });

    const articlesExist = articles => articles && articles.every(article => typeof article !== "undefined");

    return (
        articlesExist(articles)
            ? renderArticles(articles)
            : <h1 className="news-slider__loading-text">Loading articles...</h1>
    )
}

export default NewsSlider;