import React from 'react'
import { Link } from 'react-router-dom';

/**
 * @description Creates a search bar which the user can interact with
 * @param props Takes two props: searchText and handleSearch 
 * @param {string} searchText - The text entered by the user in the search bar
 * @param {function} handleSearch - Function that handles when text is entered in the search bar
 */
const SearchBar = (props) => (
  <div className="search-books-bar">
    {/* Takes the user back to the main page. */}
    <Link to="/">
      <button className='close-search'></button>
    </Link>
    <div className="search-books-input-wrapper">
      <input 
        type="text" 
        placeholder="Search by topic"
        value={props.searchText}
        onChange={props.handleSearch}
      />
    </div>
  </div>
)

export default SearchBar
