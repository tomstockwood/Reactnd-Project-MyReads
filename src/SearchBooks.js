import React from 'react';
import Book from './Book.js';
/**
 * @description Displays all books whose author or title contain the 
 * text currently entered in the search bar.
 * 
 * @param {boolean} isLoading. Indicates whether the search results
 * are loaded and ready to be displayed. 
 * 
 * @param {string} searchText. The current text in the search bar.
 *  Stored as a string in state.
 *
 * @param {array} books. An array of books.
 * 
 * @param {array} library. An array of all the books currently stored 
 * in the user's collection.
 * 
 * @param {function} changeShelf. Changes the shelf of a given book. 
 * 
 * @returns All books whose subject matter relates to the search term in 
 * the search bar.
 */

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
            id={entry.id}
            bookCoverURL={entry.imageLinks}
            authors={entry.authors}
            library={props.library}
            shelf={"none"}
            changeShelf={(event) => props.changeShelf(event, entry.id, entry)}
          />
        </li>
      ))}
    </ol>
  )
}

export default SearchBooks