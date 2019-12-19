import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { filter, find, includes } from 'lodash';
import { Link, Route } from 'react-router-dom'
import Bookshelf from './Bookshelf.js';
import SearchBooks from './SearchBooks.js';



class BooksApp extends React.Component {
  state = {
    searchText : "",
    books : [
      {
      bookTitle : "To Kill a Mockingbird", 
      bookAuthor : "Harper Lee", 
      bookCoverURL : "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
      bookShelf : "currentlyReading" 
      },
      {
        bookTitle : "Ender's Game", 
        bookAuthor : "Orson Scott Card", 
        bookCoverURL : "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api",
        bookShelf : "currentlyReading" 
      }
    ],
    books2 : [],
    searchBooks : []
  }


  // @description Imports the books from the API
  componentDidMount() {
    BooksAPI.getAll()
      .then((books2) => {
        this.setState(() => ({
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
    // (find(books2, ['id', bookID])===undefined) &&
    //   books2.push(book)
    find(books2, ['id', bookID]).shelf = event.target.value // Finds the specific book by ID and sets its shelf property
    BooksAPI.update((find(books2, ['id', bookID])), event.target.value) // Updates the API
    // console.log(BooksAPI.update((find(books2, ['id', bookID])), event.target.value))
    this.setState({ books2 });
  }

  // @description Handles text being entered in the search bar
  // @param {event} Text being entered in the search bar
  // @returns {string} Updated value of searchText within state
  handleSearch = event => {
    BooksAPI.search(event.target.value)
    .then((searchBooks) => {
      this.setState(() => ({
        searchBooks
      }))
    })
    this.setState({ searchText: event.target.value });
  };
  
  render() {
    console.log(this.state)
    // console.log(this.state.books2[2])
    if (this.state.books2.length===0) {return null}
    // console.log(this.state.books2[2].id)
    console.log(includes(this.state.books2[0],'74XNzF_al3MC'))
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            searchText={this.state.searchText}
            handleSearch={this.handleSearch}
            books={this.state.searchBooks}
            changeShelf={this.changeShelf}
        ></SearchBooks>
        )}/>
        
        <Route exact path="/" render={() => (
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads!</h1>
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
