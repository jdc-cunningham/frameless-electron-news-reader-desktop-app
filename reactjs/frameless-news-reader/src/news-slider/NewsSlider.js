import React, { useEffect } from 'react';
import './NewsSlider.scss';
import refreshIcon from "../assets/refresh.svg";
import leftArrow from "../assets/round-arrow-left.svg";
import rightArrow from "../assets/round-arrow-right.svg";

const NewsSlider = ({ activeArticles, prevArticle, nextArticle, refresh, slideClass }) => {
    const renderSlide = ( articleData, slideIndex ) => {
        const {
            author,
            description,
            title,
            urlToImage
        } = articleData;

        return (
            <div key={ slideIndex } className={ slideClass ? `news-slider ${slideClass}` : "news-slider" }>
                <div
                    className="news-slider__img"
                    style={{ backgroundImage: `url(${urlToImage})` }}>
                    <button type="button" className="news-slider__img-btn" onClick={ prevArticle }>
                        <img src={ leftArrow } className="news-slider__img-arrow" alt="left arrow icon" />
                    </button>
                    <button type="button" className="news-slider__img-btn" onClick={ nextArticle }>
                        <img src={ rightArrow } className="news-slider__img-arrow" alt="right arrow icon" />
                    </button>
                </div>
                <div className="news-slider__body">
                    <h1>{ title }</h1>
                    <p>{ description }</p>
                </div>
                <div className="news-slider__footer">
                    <button title="refresh" type="button" className="news-slider__footer-refresh" onClick={ refresh }>
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

    const articlesExist = articles => articles.every(article => typeof article !== "undefined");

    return (
        articlesExist(activeArticles)
            ? renderArticles(activeArticles)
            : <h1 className="news-slider__loading-text">Loading articles...</h1>
    )
}

export default NewsSlider;