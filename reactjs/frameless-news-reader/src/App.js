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
	const articlesArr = [
		{
			"source": {
				"id": "cnbc",
				"name": "CNBC"
			},
			"author": "Kevin Breuninger",
			"title": "Trump says Fauci's warnings about reopening amid coronavirus crisis are not 'acceptable' - CNBC",
			"description": "Trump did not single out which specific answer from Fauci that he found unacceptable, but referenced Fauci's testimony about reopening schools in the fall.",
			"url": "https://www.cnbc.com/2020/05/13/coronavirus-trump-says-faucis-warnings-about-reopening-are-not-acceptable.html",
			"urlToImage": "https://image.cnbcfm.com/api/v1/image/106536026-1589404589412gettyimages-1212895523.jpeg?v=1589404663",
			"publishedAt": "2020-05-13T22:41:08Z",
			"content": "Top coronavirus health expert Dr. Anthony Fauci's recent warning about the potentially dire consequences of reopening states and schools too soon was \"not an acceptable answer,\" President Donald Trump said Wednesday.\r\nTrump told reporters at the White House t… [+3242 chars]"
		},
		{
			"source": {
			  "id": "bbc-news",
			  "name": "BBC News"
			},
			"author": "https://www.facebook.com/bbcnews",
			"title": "Coronavirus may never go away, World Health Organization warns - BBC News",
			"description": "Experts say the disease may become embedded in populations in the same way that HIV has.",
			"url": "https://www.bbc.co.uk/news/world-52643682",
			"urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/12A30/production/_112263367_mediaitem112263363.jpg",
			"publishedAt": "2020-05-13T22:30:38Z",
			"content": "Image copyrightReutersImage caption\r\n There are more than 100 potential vaccines currently in development\r\nThe coronavirus \"may never go away\", the World Health Organization (WHO) has warned.\r\nSpeaking at a briefing on Wednesday, WHO emergencies director Dr M… [+1957 chars]"
		},
		{
			"source": {
				"id": null,
				"name": "Youtube.com"
			},
			"author": null,
			"title": "Unreal Engine 5 PS5 Tech Demo - Everything You Need To Know In Under 4 Minutes - GameSpot",
			"description": "Epic Games has announced Unreal Engine 5, releasing a nine-minute tech demo that showed a character and her dancing light exploring caves and ruins. The real...",
			"url": "https://www.youtube.com/watch?v=UMAP97C0ASU",
			"urlToImage": "https://i.ytimg.com/vi/UMAP97C0ASU/maxresdefault.jpg",
			"publishedAt": "2020-05-14T00:30:00Z",
			"content": "Epic Games has announced Unreal Engine 5, releasing a nine-minute tech demo that showed a character and her dancing light exploring caves and ruins. The real-time demo illustrated the new engine's two core technologies: Nanite and Lumen, which focus on geomet… [+374 chars]"
		}
	];

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
		// axios.get(newsApiUrl)
		// 	.then((res) => {
		// 		console.log(res);
		// 		if (res.data) {
		// 			setArticles(res.data.articles);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		alert('Failed to get articles');
		// 		console.log('error:', err);
		// 		setArticles(null); // shows err state
		// 	});
		
		setArticles(articlesArr);
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
		console.log('slide set', getArrNeighbors(articlesArr,activeSlidesDir.articleIndex));
		setActiveArticles(
			Array.from(
				getArrNeighbors(articlesArr,activeSlidesDir.articleIndex).map(articleIndex => articles[articleIndex])
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
