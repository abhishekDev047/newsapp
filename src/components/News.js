import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const capital = (x) => {
  let a = x.charAt(0).toUpperCase() + x.slice(1);
  return a;
};

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pagesize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.Updatenews = this.Updatenews.bind(this);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };

    document.title = `${capital(this.props.category)} - Khabar.in`;
  }
  async Updatenews() {
    this.props.setProgress(5);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e35f49b697b4944b5fef967dac23f05&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(25);
    let parsedData = await data.json();
    this.props.setProgress(75);
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  };
  async componentDidMount() {
    this.Updatenews();
  };

  // handleprevious = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.Updatenews();
  // };
  // handlenext = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.Updatenews();
  // };
  fetchMoreData = async() => {
      this.setState({ page: this.state.page+1});
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2e35f49b697b4944b5fef967dac23f05&page=${this.state.page}&pagesize=${this.props.pagesize}`;
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        loading: false,
      });
  };
  render() {
    return (
    <>
      <h2 className="text-center my-5">
          {" "}
          Khabar - {capital(this.props.category)} Headlines
        </h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="container my-2">
          <div className="row">
            {this.state.articles.map((element) => {
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
        {/* <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-3 my-3 btn-sm"
            onClick={this.handleprevious}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pagesize)
            }
            type="button"
            className="btn btn-dark mx-3 my-3 btn-sm"
            onClick={this.handlenext}
          >
            Next &rarr;
          </button>
        </div> */}
        
    </>

    );
  }
}
