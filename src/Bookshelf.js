import React from 'react';
import PropTypes from 'prop-types'
import Book from './Book.js'

/**
 * @description Displays all books with a given shelf property
 * @param {array} books. An array of books. Each book is its own object.
 * @param {function} changeShelf. A function to change a book's shelf.
 * @param {string} bookshelfTitle. The name of the shelf.
 * @returns {list} A list of Book objects that have the same shelf prop 
 * as the shelf.
 * 
 */

function Bookshelf(props) {
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {props.bookshelfTitle}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {props.books.map((entry) => (
            <li key={entry.id}>
              <Book
                title={entry.title}
                bookCoverURL={entry.imageLinks}
                authors={entry.authors}
                shelf={entry.shelf}
                changeShelf={(event) => props.changeShelf(event, entry.id)}
              ></Book>  
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
} 

Bookshelf.propTypes = {
  bookshelfTitle: PropTypes.string,
  books: PropTypes.array,
  changeShelf: PropTypes.func,
}

export default Bookshelf