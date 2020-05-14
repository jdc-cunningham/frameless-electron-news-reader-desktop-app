import React, { useState, useEffect } from 'react';
import './css-reset.css';
import './App.css';
import axios from 'axios';
import NewsSlider from './news-slider/NewsSlider';

const App = () => {

	const newsApiQuery = '/top-headlines/?country=us'
	const newsApiUrl = process.env.REACT_APP_NEWS_API_BASE_URL + newsApiQuery + '&apiKey=' + process.env.REACT_APP_NEWS_API_KEY;

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
		  }
	];

	const [articles, setArticles] = useState([]);
	const [activeArticleIndex, setActiveArticleIndex] = useState(0); // articles array index
	const [activeArticle, setActiveArticle] = useState({
		articleImgSrc: articlesArr[0].urlToImage,
        articleTitle: articlesArr[0].title,
        articleBody: articlesArr[0].description,
        articleSrc: articlesArr[0].source.name,
        articleAuthor: articlesArr[0].author,
	}); // object

	console.log()

	useEffect(() => {
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
	}, []);

	// self refresh web worker, simplest state management

	return (
		<div className="app">
			<NewsSlider activeArticle={ activeArticle } />
		</div>
	);
}

export default App;
