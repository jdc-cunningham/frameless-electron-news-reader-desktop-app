import React, { useState, useEffect } from 'react';
import './css-reset.css';
import './App.css';
import axios from 'axios';
import NewsSlider from './news-slider/NewsSlider';
import workerScript from './worker.js';

const App = () => {
    console.log('app');
	const newsApiQuery = '/top-headlines/?country=us'
    const newsApiUrl = process.env.REACT_APP_NEWS_API_BASE_URL + newsApiQuery + '&apiKey=' + process.env.REACT_APP_NEWS_API_KEY;
    const [articles, setArticles] = useState([]);
    // let translatePercentage = "0"; // this is used to slide the long set of slides
    const [translatePercentage, setTranslatePercentage] = useState(0);
    const [slideInterval, setSlideInterval] = useState(null);
    const [worker, setWorker] = useState(null);
    const localStorage = window.localStorage;

    // tmp
    const articlesArr = [
        {
          "source": {
            "id": "cbs-news",
            "name": "CBS News"
          },
          "author": "Jonathan LaPook",
          "title": "Monkey trial of Oxford vaccine shows encouraging results - CBS News",
          "description": "When they exposed the animals to coronavirus, the monkeys that weren't vaccinated developed pneumonia, a sign of COVID-19 — but those that weren't vaccinated did not.",
          "url": "https://www.cbsnews.com/news/oxford-university-monkey-trial-of-coronavirus-vaccine-shows-encouraging-results/",
          "urlToImage": "https://cbsnews3.cbsistatic.com/hub/i/r/2020/03/06/d80375f7-4e18-42a7-b0eb-fd046572f15b/thumbnail/1200x630/56b5ba089898040c60f907710f3c2412/rts301gn.jpg",
          "publishedAt": "2020-05-16T00:30:32Z",
          "content": "The director of the National Institutes of Health (NIH) has said that no corners will be cut in the search for a coronavirus vaccine. But now, there's encouraging news about a potential vaccine that's now being tested on humans and monkeys. \r\nNIH researchers … [+1607 chars]"
        },
        {
          "source": {
            "id": null,
            "name": "Huffpost.com"
          },
          "author": "Carly Ledbetter",
          "title": "Meghan Markle, Prince Harry Surprised A Bunch Of People During A Zoom Meeting - HuffPost",
          "description": "The royal couple's first joint appearance since their Los Angeles move left one man \"shocked.\"",
          "url": "https://www.huffpost.com/entry/meghan-markle-prince-harry-zoom-meeting_n_5ebdb64bc5b698a290459a6e",
          "urlToImage": "https://img.huffingtonpost.com/asset/5ebef52b2200006916828d20.jpeg?cache=vohv82opWy&ops=1200_630",
          "publishedAt": "2020-05-16T00:22:22Z",
          "content": "Meghan Markle and Prince Harry can really liven up a work meeting. \r\nThe Duke and Duchess of Sussex, who are currently self-isolating at their home in Los Angeles and calling members of their patronages over Zoom, surprised members of the Crisis Text Line tea… [+1894 chars]"
        },
        {
          "source": {
            "id": null,
            "name": "Nytimes.com"
          },
          "author": "Sapna Maheshwari, Michael Corkery",
          "title": "J.C. Penney Files for Bankruptcy, Closing Some Stores - The New York Times",
          "description": "The chain’s move came after J. Crew and the Neiman Marcus Group filed, and represented the biggest casualty amid retail closures tied to the coronavirus pandemic.",
          "url": "https://www.nytimes.com/2020/05/15/business/jc-penney-bankruptcy-coronavirus.html",
          "urlToImage": "https://static01.nyt.com/images/2020/05/16/business/15virus-jcpenney-print/15virus-jcpenney-4-facebookJumbo.jpg",
          "publishedAt": "2020-05-15T23:43:17Z",
          "content": "J.C. Penney, with its budget-friendly clothing for families and reliable home furnishings, was for years a cornerstone of American malls and an undeniable success story. What started as a humble dry goods store in Wyoming in 1902 was a century later a nationa… [+6780 chars]"
        }
    ];

    const prevArticle = () => {
        if (translatePercentage < ((articles.length * 100) - 100)) { // when end of slides reached
            setTranslatePercentage(translatePercentage + 100);
        }

        if (translatePercentage === 0) {
            console.log('left edge', (articles.length * -100) + 100);
            setTranslatePercentage((articles.length * -100) + 100);
        }
    }

    const nextArticle = () => {
        console.log('state', articles);
        console.log(translatePercentage > ((articles.length * -100) + 100));
        console.log(translatePercentage, ((articles.length * -100) + 100), articles.length);
        if (translatePercentage === 0 || translatePercentage > ((articles.length * -100) + 100)) { // when end of slides reached
            setTranslatePercentage(translatePercentage - 100);
        }

        if (translatePercentage === ((articles.length * -100) + 100)) {
            setTranslatePercentage(0);
        }
    }

    const refresh = () => {
		getArticles();
    }
    
    const getArticles = () => {
        // setSliderState(prev => ({
        //     ...prev,
        //     articles: articlesArr
        // }));
        setArticles(articlesArr);
    }

    // https://stackoverflow.com/questions/8083410/how-can-i-set-the-default-timezone-in-node-js
    const getDate = () => {
        process.env.TZ = "America/Chicago";
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        return month + "-" + date + "-" + year;
    };

    // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    const getTime = () => {
        const date = new Date;
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    // just hits next or refresh to get new articles
    const workerCallback = (secGained) => {
        process.env.TZ = "America/Chicago";
        const curTime = getTime();
        const curDate = getDate();

        console.log(curTime);

        if (curTime === '4:09 pm') { // it's possible this will never run, hence manual refresh icon
            console.log('in');
            if (!localStorage.getItem(curDate)) { // since the 10 second interval means this check can run 6 times
                localStorage.setItem(curDate, 'refreshed');
                setTranslatePercentage(0);
                getArticles();
            }
        } else {
            console.log('next');
            nextArticle();
        }
    };

    // runs once on load
    useEffect(() => {
        // setSlideInterval(
        //     setInterval(() => {
        //         nextArticle();
        //     }, 10000)
        // );

        // this worker fires every 10 seconds
        if (!worker && window.Worker) {
            var workerClock = new Worker(workerScript);
            getArticles();
            setWorker(workerClock);
            workerClock.onmessage = (msg) => {
                workerCallback(msg.data);
            };
        } else {
            alert('Unable to automatically slide');
            console.log('web worker not available');
        }
    }, []);

    return (
        <div className="app">
            <NewsSlider
                articles={ articles }
                // articles={ sliderState.articles }
                prevArticle={ prevArticle }
                nextArticle={ nextArticle }
                refresh={ refresh }
                translatePercentage={ translatePercentage }
                // slideClass={ sliderState.slideClass }
                // slideDone={ sliderState.slideDone }
                slideDone={ true }
            />
        </div>
    );
}

export default App;