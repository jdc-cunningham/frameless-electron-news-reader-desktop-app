import React, { useState, useEffect, useForceUpdate } from 'react';
import './css-reset.css';
import './App.css';
import axios from 'axios';
import NewsSlider from './news-slider/NewsSlider';

const App = () => {

	const newsApiQuery = '/top-headlines/?country=us'
	const newsApiUrl = process.env.REACT_APP_NEWS_API_BASE_URL + newsApiQuery + '&apiKey=' + process.env.REACT_APP_NEWS_API_KEY;
	const [articles, setArticles] = useState([]);

	const [activeSlidesDir, setActiveSlidesDir] = useState({
		articleIndex: 0,
		slideClass: ""
	});

	// click next
	const cycleLeft = arr => {
		slideDir = "left";
		const arrCopy = [...arr];
		arrCopy.shift();
		arrCopy.push(arr[0]);
		return arrCopy;
	};
	
	// click prev
	const cycleRight = arr => {
		if (!slideDone) {
			return;
		}
		setSlideDone(false);
		slideDir = "right";
		const arrCopy = [...arr];
		arrCopy.pop();
		arrCopy.unshift(arr[arr.length - 1]);
		return arrCopy;
	};

	const getNextArticleIndex = ( curArticleIndex, dir ) => {
		const articlesLen = articles.length;
		const incrIndex = dir === "left"; // left means you went right kind of confusing
		let newArticleIndex;

		console.log('pre', incrIndex, curArticleIndex, articlesLen);

		if (incrIndex && curArticleIndex === articlesLen - 1) {
			newArticleIndex = 0;
		} else if (incrIndex) {
			newArticleIndex = curArticleIndex + 1;
		} else if (!incrIndex && curArticleIndex === 0) {
			console.log('here');
			newArticleIndex = articlesLen - 1;
		} else if (!incrIndex) {
			newArticleIndex = curArticleIndex - 1;
		}

		console.log(newArticleIndex);
		// activeSlidesDirection
		return newArticleIndex;
	}

	const prevArticle = () => {
		// getNextArticleIndex(activeSlidesDir.articleIndex, 'right');
		// setActiveSlidesDir(prev => ({
		// 	...prev,
		// 	slideClass: "slide-right"
		// }));
		setActiveSlidesDir(prev => ({
			...prev,
			articleIndex: getNextArticleIndex(activeSlidesDir.articleIndex, "slide-right")
		}));
	}

	const nextArticle = () => {
		console.log('next', activeSlidesDir);
		// getNextArticleIndex(activeSlidesDir.articleIndex, 'left');
		// setActiveSlidesDir(prev => ({
		// 	...prev,
		// 	slideClass: "slide-left"
		// }));
		setActiveSlidesDir(prev => ({
			...prev,
			articleIndex: getNextArticleIndex(activeSlidesDir.articleIndex, "slide-left")
		}));
	}

	const refresh = () => {
		setActiveSlidesDir(prev => ({
			...prev,
			articeIndex: 0
		}));
		getArticles();
	}

	const getArticles = () => {
		setArticles(
			[
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
			  ]
		)
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
	}

	const getArrNeighbors = ( arr, activeIndex ) => {
		console.log(activeIndex);
		const arrLen = arr.length;
	  
		if (!arrLen || arrLen < 2) {
			return arr;
		}
		
		if (arrLen === 2) {
			arr.reverse();
			return arr;
		}
		
		// left side(start)
		if (activeIndex === 0) {
			return [arrLen - 1, activeIndex, activeIndex + 1];
		}
		
		// right side(end)
		if (activeIndex === arrLen - 1) {
				return [activeIndex - 1, activeIndex, 0];
		}
		
		return [activeIndex - 1, activeIndex, activeIndex + 1];
	}

	useEffect(() => {
		getArticles();
	}, []);

	useEffect(() => {
		console.log('slide set', getArrNeighbors(articles,activeSlidesDir.articleIndex));
		setActiveArticles(
			Array.from(
				getArrNeighbors(articles,activeSlidesDir.articleIndex).map(articleIndex => articles[articleIndex])
			)
		);
		// setTimeout(() => {
		// 	console.log('timeout set', getArrNeighbors(articlesArr,activeSlidesDir.articleIndex))
		// 	setActiveSlidesDir(prev => ({
		// 		...prev,
		// 		// slideClass: "",
		// 		articleIndex: getNextArticleIndex(activeSlidesDir.articleIndex, activeSlidesDir.slideClass)
		// 	}));
		// }, 1000);
	}, [articles, activeSlidesDir.articleIndex]);

	// useEffect(() => {
	// 	setInterval(() => {
	// 		if (articles) {
	// 			nextArticle();
	// 		}
	// 	}, 5000);
	// }, [activeSlidesDir.articleIndex]);

	// useEffect(() => {
	// 	if (activeSlidesDir.slideClass) {
	// 		setActiveSlidesDir(prev => ({
	// 			...prev,
	// 			articleIndex: getNextArticleIndex(activeSlidesDir.articleIndex, activeSlidesDir.slideClass)
	// 		}));
	// 	}
	// }, [activeSlidesDir.slideClass]);

	// useEffect(() => {
	// 	setActiveArticles(
	// 		Array.from(
	// 			getArrNeighbors(articlesArr,articleIndex).map(articleIndex => articles[articleIndex])
	// 		)
	// 	);
	// }, [articleIndex]);

	// self refresh web worker, simplest state management

	return (
		<div className="app">
			<NewsSlider
				activeArticles={ activeArticles }
				prevArticle={ prevArticle }
				nextArticle={ nextArticle }
				refresh={ refresh }
				slideClass={ activeSlidesDir.slideClass }
			/>
		</div>
	);
}

export default App;
