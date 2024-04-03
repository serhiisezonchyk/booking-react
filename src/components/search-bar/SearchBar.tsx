import React from 'react';
import { types } from '../../data/data';
import { QueryParam } from '../../data/types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = React.useState<QueryParam>({ type: 'buy', location: '', minPrice: 0, maxPrice: 0 });
  return (
    <div className="searchBar">
      <div className="searchBar__type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => setQuery((prevQuery) => ({ ...prevQuery, type }))}
            className={`searchBar__type-button ${query.type === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="searchBar__form">
        <input className="searchBar__form-input" type="text" name="location" placeholder="Location" />
        <input className="searchBar__form-input" type="number" name="minPrice" min={0} placeholder="Min price" />
        <input className="searchBar__form-input" type="number" name="maxPrice" min={0} placeholder="Max price" />
        <button className="searchBar__form-button">
          <img className="form-button__img" src="/search.png" alt="Search button" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
