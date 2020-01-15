import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { filter } from 'lodash';
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf.js';
import Search from './Search.js';


class BooksApp extends React.Component {
  state = { books: [] }
  
  // @description Imports the books from the API
  async componentDidMount() {
    try {
      const books = await BooksAPI.getAll()
      this.setState(() => ({ books }))
    } catch (e) {
      console.log(e.message);
    }
  }
  
  /**
   * @description Changes the shelf of a book 
   * @param {event} Event that fires changeShelf, currently a new option being 
   * chosen in book-shelf-changer within Book.js
   * @param {object} book - The book whose shelf is being changed
   * @returns {array} books - The updated collection of books, with changed shelf.
   */
  changeShelf = (event, book) => {
    const updatedBook = { // A copy of the book with updated shelf
      ...book,
      shelf: event.target.value
    }
    
    const books = [ // A copy of this.state.books, with the updatedBook appended
      ...this.state.books.filter(({ id }) => id !== book.id), 
      updatedBook
    ]

    BooksAPI.update(updatedBook, event.target.value) // Updates the API
    this.setState({ books });
  }

  render() {
    if (this.state.books.length === 0) {
      return null
    }

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search 
            changeShelf={this.changeShelf}
            library={this.state.books}
          />
        )} />
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf
                  books={filter(this.state.books, { shelf: 'currentlyReading' })}
                  changeShelf={this.changeShelf}
                  bookshelfTitle='Currently Reading'
                />

                <Bookshelf
                  books={filter(this.state.books, { shelf: 'wantToRead' })}
                  changeShelf={this.changeShelf}
                  bookshelfTitle='Want to Read'
                />

                <Bookshelf
                  books={filter(this.state.books, { shelf: 'read' })}
                  changeShelf={this.changeShelf}
                  bookshelfTitle='Read'
                />
              </div>
            </div>

            {/* Opens the search page.*/}
            <div className="open-search">
              <Link to="/search">
                <button></button>
              </Link>
            </div>
          </div>
        )}/> 

      </div>
    )
  }
}

export default BooksApp
