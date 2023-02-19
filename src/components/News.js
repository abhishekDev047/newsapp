import React from "react";
import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const capital = (x) => {
  let a = x.charAt(0).toUpperCase() + x.slice(1);
  return a;
};

const News =(props)=> {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

    // document.title = `${capital(props.category)} - Khabar.in`;

 const UpdateNews =async()=> {
    props.setProgress(5);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(25);
    let parsedData = await data.json();
    props.setProgress(75);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);

    props.setProgress(100);
  };

  useEffect(() => {
    UpdateNews();
  }, [])
  
   

  const fetchMoreData = async() => {
      setPage(page+1);
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pagesize=${props.pagesize}`;
      setLoading(true);
      let data = await fetch(url);
      let parsedData = await data.json();
      props.setProgress(75);

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
  
      props.setProgress(100);
    
  };
    return (
    <>
      <h2 className="text-center my-5">
          {" "}
          Khabar - {capital(props.category)} Headlines
        </h2>
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
      <div className="container my-2">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
    </>
    );
  };
News.defaultProps = {
  country: "in",
  pagesize: 9,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
};

export default  News;