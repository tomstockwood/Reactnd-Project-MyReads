import React from 'react'
import { Link } from 'react-router-dom';


const SearchBar = (props) => (
  <div className="search-books-bar">
    {/* Takes the user back to the main page. */}
    <Link to="/">
      <button className='close-search'></button>
    </Link>
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
)

export default SearchBar
