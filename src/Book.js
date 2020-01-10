import React from 'react';
import PropTypes from 'prop-types'
import { isArray, find } from 'lodash'

/**
 * @description Displays a given book.
 * 
 * @param {string} title. The title of the book
 * 
 * @param {object} bookCoverURL. The object containing the url for the 
 * cover image of the book.
 * 
 * @param {array} authors. Array containing all the authors of a book.
 * 
 * @param {array} library. Array containing all the books currently in 
 * the user's collection.  
 * 
 * @param {string} shelf. The current shelf of the book.
 * 
 * @param {function} changeShelf. Changes the shelf of the book.
 * 
 * @returns The given book
 */


function Book(props) {

  let { shelf } = props

  // If the book has no cover image, it isn't rendered.
  if (props.bookCoverURL===undefined) {
    return null
  }

  // If the book exists within props.library, the book's 
  // shelf prop is changed to the property of the book in the 
  // collection.
  if (find(props.library, ['id', props.id])!==undefined) {
    shelf = find(props.library, ['id', props.id]).shelf
  }

  return(
    <div className="book">
      <div className="book-top">
        {/* img tag which displays the bookcover */}
        <img className="book-cover"
          src={props.bookCoverURL.thumbnail}
          width={128}
          alt=''
        ></img>

        {/* select tag which allows the shelf of the book to be changed */}
        <div className="book-shelf-changer">
          <select onChange={props.changeShelf} defaultValue={shelf}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      {/* Displays the book title */}
      <div className="book-title">{props.title}</div>
      
      {/* Displays the book author(s). If there are multiple authors, they are 
      displayed in sequence seperated by a comma. */}
      <div className="book-authors">{isArray(props.authors) && props.authors.join(", ")}</div>
    </div>
  )
}

Book.propTypes = {
  title: PropTypes.string,
  bookCoverURL: PropTypes.object,
  authors: PropTypes.array,
  library: PropTypes.array,
  shelf: PropTypes.string,
  changeShelf: PropTypes.func
}

export default Book