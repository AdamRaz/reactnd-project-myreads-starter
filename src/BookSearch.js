import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookSearch extends React.Component {
  state = {
    bookData: []
  }

  /*
  TODO
I'm thinking of (while on the search page) grabbing the current bookshelf with BooksAPI.getAll() then comparing/filtering (with something like .includes(),  ref - https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array) the search results with the getAll results into a new array.
Then assigning the correct shelf to the books that match/are filtered out (use the new array made from the getAll method to find shelf & generate html)
*/

  changeOption(book, event) {
    console.log(book.id);
    let newShelf = event.target.value;
    console.log(newShelf);

    BooksAPI.update(book, newShelf).then((response) => {
        console.log(response);
      }
    )
    // .then(
    //   this.booksUpdate()
    // )
  }

  updateBookState(booksArray) {
    this.setState({ bookData: booksArray });
  }

  getSearchResults(searchTerm) {
    // prevent blank search term being used
    // ideally could use regex to substitute spaces e.g. spaces in between terms
    let trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      console.log(`${trimmedTerm}`);
      BooksAPI.search(trimmedTerm).then((books) => {
        this.updateBookState(books);
        console.log(books);
  
      })
    } else {
      // if search term deleted by user, set state to blank array so search results disappear
      this.updateBookState([]);
    }

  }
  render() {
    let booksArray = this.state.bookData;
    console.log(booksArray);
    // short circuit eval below to only execute map function when books array data actually exists
    return (

      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            {/* <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a> */}
            <Link to='/' className='close-search'>Close</Link>
            <div className="search-books-input-wrapper">
              {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
              */}
              <input type="text" placeholder="Search by title or author" onChange = {(event) => this.getSearchResults(event.target.value)}/>

            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {booksArray[0] && (booksArray.map((book) => (
                <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks && (
                      // a blank box will display if no imageLink info is present
                                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    )}

                    <div className="book-shelf-changer">
                      <select value={book.shelf || "none"} onChange={(event) => this.changeOption(book, event)} >
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
    )
  }
}

export default BookSearch
