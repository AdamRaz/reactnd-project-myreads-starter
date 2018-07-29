import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

class BookSearch extends React.Component {
  state = {
  
  }
 
  getSearchResults(searchTerm) {
    // prevent blank search term being used
    // ideally could use regex to substitute spaces e.g. spaces in between terms
    let trimmedTerm = searchTerm.trim();
    if (trimmedTerm) {
      console.log(`${trimmedTerm}`);
      BooksAPI.search(trimmedTerm).then((books) => {
        // this.setState({ contacts })
        console.log(books);
  
      })
    }

  }
  render() {
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
            <ol className="books-grid"></ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookSearch
