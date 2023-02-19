import React from 'react'

const NewsItem = (props)=> {
    let { title, description, imageurl, newsurl, date ,author, source} = props;
    return (
      <>

        <div className="card">
          <img src={imageurl} alt="Khabar.in" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5><span class="badge text-bg-success">{source}</span>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">by "{author? author: "unknown"}" on {new Date(date).toGMTString()}</small></p>
          </div>
          <div className="card-body">
            <a href={newsurl} target={'blank'} className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </>
    )
  };


export default NewsItem;