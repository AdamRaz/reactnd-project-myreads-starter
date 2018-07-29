import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookShelf from './BookShelf.js'
import BookSearch from './BookSearch.js'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  /* app plan

  book menu click from anywhere -> BooksAPI.update -> array[i].shelf = "read or whatever"
  update base on select option: https://stackoverflow.com/questions/5024056/how-to-pass-parameters-on-onchange-of-html-select

  route pages, push method etc.
  
  buttons onClick = links to urls
  
  state - current books on shelf? Can have another state for search component? OR just deal with server and push/fetch every time? State can be much smaller than fetch data... just object with 3 shelve values and object per book:
  state = {
    shelf1: [{title: whatever, author: whatever, img: something}, {title: etc.}],
    shelf2: [],
    shelf3: []
  }
OR 1 object and the shelf detail is another property:
  state = {
    {shelf: something, title: whatever, author: whatever, img: something},
    {shelf: something, title: whatever, author: whatever, img: something},
    {shelf: something, title: whatever, author: whatever, img: something}
  }

  set selected="selected" attribute/value pair on correct shelf option... base off of fetch data somehow, short-circuit logic or ternary operator expression within html select options? 
  https://stackoverflow.com/questions/3518002/how-can-i-set-the-default-value-for-an-html-select-element

  
  main page - getAll books, shows everything on shelf, loop through and build elements as below for different shelves

  search field - onChange = {expression} 
  onChange = {(event) => BooksAPI.search somethin event.target.value} BUT separate this to a function
  render the results from the search request (loop data and build html) as a big grid, no headings, separate headings only for main page. Make sure the shelf value is current (i.e. that the BooksAPI.update function works)
  handle bad queries... promise .catch statement or filter against list of possible search terms
  if search field blank or just space, no search query
  allow multi word search, take whole text string

  option selection ->
  */
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // this.setState({ contacts })
      console.log(books);

    })
    BooksAPI.search('kafka').then((books) => {
      // this.setState({ contacts })
      console.log(books);

    })
  }

  render() {
    return (
      <div>
        <Route exact path='/search' render={() => (
          <BookSearch />
        )}/>
        <Route exact path='/' render={() => (
          <BookShelf />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
