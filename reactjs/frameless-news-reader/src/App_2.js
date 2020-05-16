import React, { useState, useEffect } from 'react';
import './css-reset.css';
import './App.css';
import axios from 'axios';
import NewsSlider from './news-slider/NewsSlider';

const App = () => {

	const newsApiQuery = '/top-headlines/?country=us'
	const newsApiUrl = process.env.REACT_APP_NEWS_API_BASE_URL + newsApiQuery + '&apiKey=' + process.env.REACT_APP_NEWS_API_KEY;
    // const [articles, setArticles] = useState(null);
    // const [slideClass, setSlideClass] = useState("");
    // const [slideDone, setSlideDone] = useState(true);

    const [sliderState, setSliderState] = useState({
        articles: null,
        slideClass: "",
        slideDone: true
    });
    
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

    const shiftArticles = ( left ) => {
        let arrCopy;

        if (left) {
            arrCopy = [...sliderState.articles];
            arrCopy.shift();
            arrCopy.push(sliderState.articles[0]);
        } else {
            arrCopy = [...sliderState.articles];
            arrCopy.pop();
            arrCopy.unshift(sliderState.articles[sliderState.articles.length - 1]);
        }
        
        return arrCopy;
    }

    const prevArticle = () => {
        // if (!slideDone) {
        //     return;
        // }
        //   setSlideDone(false);
        // setSliderState(prev => ({
        //     ...prev,
        //     slideDone: false
        // }));
        setSliderState(prev => ({
            ...prev,
            slideDone: false,
            slideClass: "slide-right"
        }));
        // setArticles(arrCopy);
    }

    const nextArticle = () => {
        // if (!slideDone) {
        //     return;
        // }
        // slideDir = "left";
        // setSlideDone(false);
        // console.log(articles);
        // setSliderState(prev => ({
        //     ...prev,
        //     slideDone: false
        // }));
        
        setSliderState(prev => ({
            ...prev,
            slideDone: false,
            slideClass: "slide-left"
        }));
        // setArticles(arrCopy);
	}

	const refresh = () => {
		getArticles();
    }
    
    const getArticles = () => {
        setSliderState(prev => ({
            ...prev,
            articles: articlesArr
        }));
    }

    useEffect(() => {
        const slideClass = sliderState.slideClass;
        if (slideClass) { // this still runs on load somehow
            // this is a weird thing where it slides faster in one direction than the other
            if (slideClass === "slide-left") {
                console.log('left');
                setTimeout(() => {
                    setSliderState(prev => ({
                        ...prev,
                        slideClass: "",
                        slideDone: true,
                    }));
                }, 1000);
                setTimeout(() => {
                    setSliderState(prev => ({
                        ...prev,
                        articles: slideClass === "slide-left" ? shiftArticles(true) : shiftArticles(false)
                    }));
                }, 1050);
            } else {
                console.log('right');
                setTimeout(() => {
                    setSliderState(prev => ({
                        ...prev,
                        slideClass: "",
                        slideDone: true,
                    }));
                }, 1000);
                setTimeout(() => {
                    setSliderState(prev => ({
                        ...prev,
                        articles: slideClass === "slide-left" ? shiftArticles(true) : shiftArticles(false)
                    }));
                }, 1050);
            }
        }
    }, [sliderState.slideClass]);

    // get articles on load
    useEffect(() => {
        console.log(articlesArr);
        setSliderState(prev => ({
            ...prev,
            articles: articlesArr
        }));
		// axios.get(newsApiUrl)
		// 	.then((res) => {
		// 		console.log(res);
		// 		if (res.data) {
		// 			setArticles(
		// 				res.data.articles.filter(article => article.urlToImage !== null)
		// 			);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		alert('Failed to get articles');
		// 		console.log('error:', err);
		// 		setArticles([]); // shows err state with null value maybe
		// 	});
    }, []);

    return (
        <div className="app">
            <NewsSlider
                articles={ sliderState.articles }
                prevArticle={ prevArticle }
                nextArticle={ nextArticle }
                refresh={ refresh }
                slideClass={ sliderState.slideClass }
                slideDone={ sliderState.slideDone }
            />
        </div>
    );
}

export default App;