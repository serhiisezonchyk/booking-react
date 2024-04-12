import React from 'react';
import { Link } from 'react-router-dom';
import { types } from '../../data/data';
import { QueryParam, TypeType } from '../../data/types';

const SearchBar: React.FC = () => {
  const [query, setQuery] = React.useState<QueryParam>({ type: 'buy', city: '', minPrice: 0, maxPrice: 0 });

  const switchType = (val: TypeType) => setQuery((prev) => ({ ...prev, type: val }));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="searchBar">
      <div className="searchBar__type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`searchBar__type-button ${query.type === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="searchBar__form">
        <input
          className="searchBar__form-input"
          type="text"
          name="city"
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          className="searchBar__form-input"
          type="number"
          name="minPrice"
          min={0}
          placeholder="Min price"
          onChange={handleChange}
        />
        <input
          className="searchBar__form-input"
          type="number"
          name="maxPrice"
          min={0}
          placeholder="Max price"
          onChange={handleChange}
        />
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button className="searchBar__form-button">
            <img className="form-button__img" src="/search.png" alt="Search button" />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
