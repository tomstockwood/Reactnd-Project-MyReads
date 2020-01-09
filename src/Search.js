import React from 'react'
import { debounce } from 'lodash';
import SearchBooks from './SearchBooks.js';
import SearchBar from './SearchBar.js';
import * as BooksAPI from './BooksAPI';

/**
 * @description Renders the search page
 * @constructor
 */
class Search extends React.Component {
  state = {
    isLoading: false,
    searchText : "",
    searchBooks : []
  }

  /**
   * @description Debounces the search function, 
   * and deals with different search errors
   */
  debouncedSearch = debounce(() => {
    if (this.state.searchText === "") {
      this.setState({
        isLoading: false,
        searchBooks: []
      })
    } else {
      BooksAPI.search(this.state.searchText)
        .then((result) => {
          if (result.error) {
            this.setState({
              isLoading: false,
              searchBooks: []
            })
          } else {
            this.setState({
              isLoading: false,
              searchBooks: result
            })
          }
        })
    }
  }, 200);

  /** 
   * @description Handles text being entered in the search bar
   * @param {event} Text being entered in the search bar
   * @returns {string} Updated value of searchText within state
   */ 
  handleSearch = event => {
    this.setState({
      isLoading: true,
      searchText: event.target.value
    });
    this.debouncedSearch()
  }

  render() {
    console.log(this.state)
    return (
      <div className="search-books">
        <SearchBar
          searchText={this.state.searchText}
          handleSearch={this.handleSearch}
        />
        <div className="search-books-results">
          <SearchBooks
            isLoading={this.state.isLoading}
            searchText={this.state.searchText}
            books={this.state.searchBooks}
            library={this.props.library}
            changeShelf={this.props.changeShelf}
          />
        </div>
      </div>
    )
  }
}

export default Search