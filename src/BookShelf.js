import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookShelf extends React.Component {
  state = {
    shelfBooks: [],
    read: [],
    wantToRead: [],
    currentlyReading: []
    }
 
  changeOption(book, event) {
    let newShelf = event.target.value;
    console.log(newShelf);

    BooksAPI.update(book, newShelf).then((response) => {
        console.log(response);
      }
    ).then(
      this.stateUpdate(book, newShelf)
    )
  }

  // take the full list of books, sort into arrays for each shelf
  sortBooksToShelves(books) {
    let readArray = [];
    let wantToReadArray = [];
    let currentlyReadingArray = [];

    for (let i = 0; i < books.length; i++) {
      if (books[i].shelf === "read") {
        console.log(`getAll response, on read shelf: ${books[i].title}`)
        readArray.push(books[i]);
      } else if (books[i].shelf === "wantToRead") {
        console.log(`getAll response, on wantToRead shelf: ${books[i].title}`)
        wantToReadArray.push(books[i]);
      } else if (books[i].shelf === "currentlyReading") {
        console.log(`getAll response, on currentlyReading shelf: ${books[i].title}`)
        currentlyReadingArray.push(books[i]);
      }
    }
    this.setState(
      {
        read: readArray,
        wantToRead: wantToReadArray,
        currentlyReading: currentlyReadingArray
      }
    )
  }

  stateUpdate(book, newShelf) {
    let stateBooksCopy = this.state.shelfBooks;
    for (let i=0; i<stateBooksCopy.length; i++) {
      if (stateBooksCopy[i].id === book.id) {
        stateBooksCopy[i].shelf = newShelf;
      }
    }
      this.setState({shelfBooks: stateBooksCopy})
      this.sortBooksToShelves(stateBooksCopy);
  }

  // once a book has been moved to another shelf, get the full list of books and sort them so we can re-render the html
  booksUpdate() {
    BooksAPI.getAll().then((books) => {
      this.setState({shelfBooks: books});
      this.sortBooksToShelves(books);
    })
  }

  componentDidMount() {
    this.booksUpdate();
  }


  render() {
    let readShelf = this.state.read;
    let wantShelf = this.state.wantToRead;
    let currentShelf = this.state.currentlyReading;
    return (
      <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {currentShelf[0] && (currentShelf.map((book) => (
                // check above if array item(s) exist first, then build html
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks && (
                      // a blank box will display if no imageLink info is present
                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    )}

                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={(event) => this.changeOption(book, event)} >
                      {/* setting select value, see ref: https://stackoverflow.com/questions/5589629/value-attribute-on-select-tag-not-selecting-default-option and see Edoh - https://www.youtube.com/watch?v=PF8fCAKR0-I */}

                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
                </li>
              )))}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {wantShelf[0] && (wantShelf.map((book) => (
                // check above if array item(s) exist first, then build html
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks && (
                      // a blank box will display if no imageLink info is present
                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    )}

                    <div className="book-shelf-changer">
                      <select  value={book.shelf} onChange={(event) => this.changeOption(book, event)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
                </li>
              )))}
              </ol>
            </div>
          </div>

          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {readShelf[0] && (readShelf.map((book) => (
                // check above if array item(s) exist first, then build html
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks && (
                      // a blank box will display if no imageLink info is present
                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    )}

                    <div className="book-shelf-changer">
                      <select  value={book.shelf} onChange={(event) => this.changeOption(book, event)}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
                </li>
              )))}
              </ol>
            </div>
          </div>

        </div>
      </div>
      <div className="open-search">
        <Link to='/search' >Search, add a book</Link>
      </div>
    </div>
  

    )
  }
}

export default BookShelf
