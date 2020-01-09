import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { filter, find } from 'lodash';
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf.js';
import Search from './Search.js';


class BooksApp extends React.Component {
  state = {
    books2 : []
  }

  // @description Imports the books from the API
  componentDidMount() {
    BooksAPI.getAll()
      .then((books2) => {
        this.setState(()=>({
          books2
        }))
      })
  }
  
  // @description Changes the shelf of a book 
  // @param {event} Event that fires changeShelf, currently a new option being 
  // chosen in book-shelf-changer within Book.js
  // @param {string} bookID - The ID of the book
  // @returns {array} books2 - The updated collection of books, with changed shelf.
  changeShelf = (event, bookID, book) => {
    let { books2 } = this.state
    if (find(books2, ['id', bookID])===undefined) {
      books2.push(book)
    }
    find(books2, ['id', bookID]).shelf = event.target.value // Finds the specific book by ID and sets its shelf property
    BooksAPI.update((find(books2, ['id', bookID])), event.target.value) // Updates the API
    this.setState({ books2 });
  }

  render() {
    console.log(this.state)
    if (this.state.books2.length === 0) {
      return null
    }

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search 
            changeShelf={this.changeShelf}
            library={this.state.books2}
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
                books={filter(this.state.books2, { shelf: 'currentlyReading' })}
                changeShelf={this.changeShelf}
                bookshelfTitle='Currently Reading'
              ></Bookshelf>

              <Bookshelf
                books={filter(this.state.books2, { shelf: 'wantToRead'})}
                changeShelf={this.changeShelf}
                bookshelfTitle='Want to Read'
              ></Bookshelf>

              <Bookshelf
                books={filter(this.state.books2, { shelf: 'read'})}
                changeShelf={this.changeShelf}
                bookshelfTitle='Read'
              ></Bookshelf>
            </div>
          </div>

          {/* Opens the search page.*/}
          <div className="open-search">
            <Link
              to="/search"
            >
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
