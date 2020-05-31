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
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                setArticles(JSON.parse(this.responseText).value);
            }
        });

        xhr.open("GET", "https://microsoft-azure-bing-news-search-v1.p.rapidapi.com/");
        xhr.setRequestHeader("x-rapidapi-host", "microsoft-azure-bing-news-search-v1.p.rapidapi.com");
        xhr.setRequestHeader("x-rapidapi-key", process.env.REACT_APP_RAPID_API_KEY);

        xhr.send(data);
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
        // if (!worker && window.Worker) {
        //     var workerClock = new Worker(workerScript);
        //     getArticles();
        //     setWorker(workerClock);
        //     workerClock.onmessage = (msg) => {
        //         workerCallback(msg.data);
        //     };
        // } else {
        //     alert('Unable to automatically slide');
        //     console.log('web worker not available');
        // }
        getArticles();
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