import React, { Component } from 'react';
import Book from './Book.js'

function Bookshelf(props) {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">Currently Reading</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          <li>
            <Book
              bookTitle={props.books[0].bookTitle}
              bookAuthor={props.books[0].bookAuthor}
              bookCoverURL={props.books[0].bookCoverURL}
              bookShelf={props.books[0].bookShelf}
              changeShelf={props.changeShelf}
            ></Book>
          </li>
        </ol>
      </div>
    </div>
  )
} 

export default Bookshelf