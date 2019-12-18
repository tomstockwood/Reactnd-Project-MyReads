import React from 'react';

// TODO: Figure out what to do if there are multiple authors

function Book(props) {
  return(
    <div className="book">
      <div className="book-top">
        <img className="book-cover"
          src={props.bookCoverURL}
          width={128}
          alt=''
        ></img>
        <div className="book-shelf-changer">
          <select onChange={props.changeShelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.bookTitle}</div>
  <div className="book-authors">{props.bookAuthor}</div>
    </div>
  )
}

export default Book