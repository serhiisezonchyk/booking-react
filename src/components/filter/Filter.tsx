import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { properties, types } from '../../data/data';

interface Query {
  type: string;
  city: string;
  property: string;
  minPrice: string;
  maxPrice: string;
  bedroom: string;
}

const Filter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<Query>({
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    property: searchParams.get('property') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedroom: searchParams.get('bedroom') || '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    const params = new URLSearchParams({
      type: query.type,
      city: query.city,
      property: query.property,
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
      bedroom: query.bedroom,
    });
    setSearchParams(params);
  };

  return (
    <div className="filter">
      <h1 className="filter__title">
        Search results for <b>{searchParams.get('city')}</b>
      </h1>
      <div className="filter__top">
        <div className="filter__item item--top">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            value={query.city}
          />
        </div>
      </div>
      <div className="filter__bottom">
        <div className="filter__item item--bottom">
          <label htmlFor="type">Type</label>
          <select id="type" name="type" onChange={handleChange} value={query.type}>
            <option value="">any</option>
            {types.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="property">Property</label>
          <select id="property" name="property" onChange={handleChange} value={query.property}>
            <option value="">any</option>
            {properties.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="Any"
            onChange={handleChange}
            value={query.minPrice}
          />
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="Any"
            onChange={handleChange}
            value={query.maxPrice}
          />
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="Any"
            onChange={handleChange}
            value={query.bedroom}
          />
        </div>
        <button className="filter__button" onClick={handleFilter}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
