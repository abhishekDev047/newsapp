import React, { Component } from 'react'

export class NewsItem extends Component {
  // constructor(){
  //     super();
  // }
  render() {
    let { title, description, imageurl, newsurl, publishedAt
    } = this.props;
    return (
      <>

        <div className="card">
          <img src={imageurl} alt="Khabar.in" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{publishedAt}</li>
          </ul>
          <div className="card-body">
            <a href={newsurl} target={'blank'} className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </>
    )
  };
};

export default NewsItem