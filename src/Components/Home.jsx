import React from 'react';
import './Styles/Home.scss';
import Footer from './Footer';
import './Styles/Categories.scss';
import Categories from './Categories';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div>
      <div className="container">
        <Navbar />
        <section className="hero w-120">
          <div className="hero__content">
            <div className="hero__text">
              <h1 className="hero__title">Fresh Farm Products Delivered to You</h1>
              <p className="hero__description">
                Farm Fresh connects you directly with local farmers, offering a wide range of fresh produce and farm products. Discover and enjoy the finest, farm-fresh goods right from the comfort of your home.
              </p>
              <Link to="/products" className="btn btn__hero">Shop Now</Link>
            </div>
            <div className="hero__img">
              <img
                src="https://raw.githubusercontent.com/mustafadalga/farm-landing-page/master/assets/img/hero.png"
                alt="Fresh Farm Products"
              />
            </div>
          </div>
        </section>
      </div>
      <div className="cat">
        <Categories />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
