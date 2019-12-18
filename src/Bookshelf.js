import React, { Component } from 'react';
import Book from './Book.js'

function Bookshelf(props) {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {props.bookshelfTitle}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((entry, index) => (
            <li key={index}>
              <Book
                bookTitle={entry.bookTitle}
                bookAuthor={entry.bookAuthor}
                bookCoverURL={entry.bookCoverURL}
                bookShelf={entry.bookShelf}
                changeShelf={(event) => props.changeShelf(event, index)}
              ></Book>  
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
} 

export default Bookshelf