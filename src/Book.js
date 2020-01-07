import React from 'react';
import { isArray, find } from 'lodash'
// @description Displays a given book.
// @param {string} title. The title of the book
// @param {string} bookCoverURL. The url for the cover image of the book.
// @param {array} authors. Array containing all the authors of a book.
// @param {string} shelf. The current shelf of the book.
// @param {function} changeShelf. Changes the shelf of the book.
// @returns The given book
function Book(props) {

  let shelf = props.shelf

  if (props.bookCoverURL===undefined) {
    return null
  }

  if (find(props.library, ['id', props.id])!==undefined) {
    console.log(find(props.library, ['id', props.id]))
    console.log(find(props.library, ['id', props.id]).shelf)
    shelf = find(props.library, ['id', props.id]).shelf
  }

  // if (props.id==='5CtYoSSxomcC') {
  //   console.log(props.id)
  //   console.log(props.library)
  // }

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

export default Book