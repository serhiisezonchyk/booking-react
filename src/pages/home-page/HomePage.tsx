import React, { useContext } from 'react';
import SearchBar from '../../components/search-bar/SearchBar';

const HomePage: React.FC = () => {
  return (
    <div className="homePage">
      <div className="homePage-container container">
        <div className="homePage__text-container">
          <div className="homePage__text-container__wrapper">
            <h1 className="homePage__text-container__title">Find Real estate & get your dream place</h1>
            <p className="homePage__text-container__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, nihil iusto ipsum adipisci alias
              cupiditate animi ea recusandae harum aperiam eos quaerat excepturi, placeat sapiente tempora atque nisi
              porro reprehenderit!
            </p>
            <SearchBar />
            <div className="homePage__boxes">
              <div className="homePage__boxes__box box">
                <h2 className="box__title">16+</h2>
                <p className="box__description">Years of experience</p>
              </div>
              <div className="homePage__boxes__box">
                <h2 className="box__title">200</h2>
                <p className="box__description">Award Gained</p>
              </div>
              <div className="homePage__boxes__box">
                <h2 className="box__title">1200+</h2>
                <p className="box__description">Property Ready</p>
              </div>
            </div>
          </div>
        </div>
        <div className="homePage__img-container">
          <img className="homePage__img-container__img" src="/bg.png" alt="Background image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
