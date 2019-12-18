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
            <li key={entry.id}>
              <Book
                bookTitle={entry.title}
                bookAuthor={entry.authors}
                bookCoverURL={entry.imageLinks.thumbnail}
                bookShelf={entry.shelf}
                changeShelf={(event) => props.changeShelf(event, entry.id)}
              ></Book>  
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
} 

export default Bookshelf