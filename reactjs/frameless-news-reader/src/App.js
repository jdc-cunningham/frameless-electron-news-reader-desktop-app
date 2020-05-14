import React, { useState, useEffect, useForceUpdate } from 'react';
import './css-reset.css';
import './App.css';
import axios from 'axios';
import NewsSlider from './news-slider/NewsSlider';

const App = () => {

	const newsApiQuery = '/top-headlines/?country=us'
	const newsApiUrl = process.env.REACT_APP_NEWS_API_BASE_URL + newsApiQuery + '&apiKey=' + process.env.REACT_APP_NEWS_API_KEY;
	const [articles, setArticles] = useState([]);
	// const [articleIndex, setArticleIndex] = useState(0);
	const [activeArticles, setActiveArticles] = useState([]); // object
	// const [slideClass, setSlideClass] = useState("");
	// const [timeStamp, setTimeStamp] = useState(null);

	const [activeSlidesDir, setActiveSlidesDir] = useState({
		articleIndex: 0,
		slideClass: ""
	});

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
		axios.get(newsApiUrl)
			.then((res) => {
				console.log(res);
				if (res.data) {
					setArticles(
						res.data.articles.filter(article => article.urlToImage !== null)
					);
				}
			})
			.catch((err) => {
				alert('Failed to get articles');
				console.log('error:', err);
				setArticles([]); // shows err state with null value maybe
			});
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
