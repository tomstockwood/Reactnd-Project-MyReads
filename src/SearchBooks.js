import React from 'react';
import Book from './Book.js';
// import { debounce } from 'lodash';

// @description Displays all books whose author or title contain the 
// text currently entered in the search bar.
// 
// @param {string} searchText. The current text in the search bar.
// Stored as a string in state. 
// 
// @param {function} handleSearch. Updates the value of searchText 
// when text is entered in the seach bar. 
// 
// @param {array} books. An array of books.
// 
// @param {bool} showSearchPage. A boolean determining whether to 
// display the search page. Stored in state.
// 
// @param {function} closeSearch. Function that changes 
// showSearchPage if the close search button is pressed. Returns the
// user to the main page
// 
// @param {function} changeShelf. Changes the shelf of a given book. 
// 
// @returns All books whose author or title contain the 
// text currently entered in the search bar.
function SearchBooks(props) {

  if (props.searchText === '') return null
  if (props.isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (!props.books || !props.books.length) {
    return (
      <div style={{ textAlign: 'center' }}>
        <img
          alt='oops!'
          style={{ width: '50%' }}
          src="https://cdn.dribbble.com/users/283708/screenshots/7084440/media/6cd8b29540bcfb6a7693c27f58db7b56.png"
        />
      </div>
    )
  }

  return (
    <ol className="books-grid">
      {props.books.map(entry => (
        <li key={entry.id}>
          <Book
            title={entry.title}
            bookCoverURL={entry.imageLinks.thumbnail}
            authors={entry.authors}
            shelf={entry.shelf}
            changeShelf={(event) => props.changeShelf(event, entry.id, entry)}
          />
        </li>
      ))}
    </ol>
  )
}

export default SearchBooks

// {/* Takes the books prop and only outputs those books
// whose author/title contains the searchText. It also 
// only outputs if there's an entry in the searchText */}
// {/* {props.setSearchBooks("h")} */}
// {/* {(props.books.isArray() === true) &&   */}