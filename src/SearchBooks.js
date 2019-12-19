import React from 'react';
import Book from './Book.js';


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
  return(
    <div className="search-books">
      <div className="search-books-bar">
        <button className="close-search" onClick={props.closeSearch}>Close</button>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
            
            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          */}
          <input 
            type="text" 
            placeholder="Search by title or author"
            value={props.searchText}
            onChange={props.handleSearch}
          />
          
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {/* Takes the books prop and only outputs those books
          whose author/title contains the searchText. It also 
          only outputs if there's an entry in the searchText */}
          {props.books.map((entry,index) => (
            (
              (entry.title.includes(props.searchText)
              || entry.authors.toString().includes(props.searchText))
              && (props.searchText !== "")
            )
             &&
            // true &&
              <li key={entry.id}>
                {console.log(props.books)}
                {console.log(props.searchText)}
                <Book
                  title={entry.title}
                  bookCoverURL={entry.imageLinks.thumbnail}
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

export default SearchBooks
