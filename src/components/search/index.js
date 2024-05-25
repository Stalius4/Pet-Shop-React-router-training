import React, { useRef } from 'react';
import { useNavigate ,createSearchParams} from 'react-router-dom';




const Search = () => {

  // get navigate function
  const navigate = useNavigate();

  //Creates a reference to the search input field using the `useRef` hook. This reference allows direct access to the input field in the DOM.
  const searchInputRef = useRef();

  const onSearchHandler = (e) => {
    e.preventDefault();

    //It extracts the value entered by the user in the input field and constructs a search query object containing the name property.
    const searchQuery = {
      name: searchInputRef.current.value
    }

    // function to convert the search query object into a URL search string.
    const query = createSearchParams(searchQuery);

    // imperatively redirect with useNavigate() returned function
    navigate({
      pathname: '/search',
      search:`?${query}`
  })};

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
