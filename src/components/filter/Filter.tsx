import { properties, types } from '../../data/data';

const Filter = () => {
  return (
    <div className="filter">
      <h1 className="filter__title">
        Search results for <b>London</b>
      </h1>
      <div className="filter__top">
        <div className="filter__item item--top">
          <label htmlFor="city">Location</label>
          <input type="text" id="city" name="city" placeholder="City Location" />
        </div>
      </div>
      <div className="filter__bottom">
        <div className="filter__item item--bottom">
          <label htmlFor="type">Type</label>
          <select id="type" name="type">
            {types.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="property">Property</label>
          <select id="property" name="property">
            {properties.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="minPrice">Min Price</label>
          <input type="number" id="minPrice" name="minPrice" placeholder="Any" />
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="maxPrice">Max Price</label>
          <input type="number" id="maxPrice" name="maxPrice" placeholder="Any" />
        </div>
        <div className="filter__item item--bottom">
          <label htmlFor="bedroom">Bedroom</label>
          <input type="text" id="bedroom" name="bedroom" placeholder="Any" />
        </div>
        <button className="filter__button">
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
};

export default Filter;
