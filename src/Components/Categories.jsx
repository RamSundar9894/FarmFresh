import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Categories.scss';
import Greens from './Images/greens.png';
import Grains from './Images/grains.png';
import Dairy from './Images/Dairy.png';
import Vegetables from './Images/Vegetables.jpg';
import Fruits from './Images/Fruits.jpg';
const categories = [
  { name: 'Vegetables', image: Vegetables },
  { name: 'Fruits', image: Fruits },
  { name: 'Dairy', image: Dairy },
  { name: 'Grains', image: Grains },
  { name: 'Greens', image: Greens }
];
const Categories = () => {
  return (
    <section className="categories w-120">
      <h2 className="categories__title">Explore Categories</h2>
      <div className="categories__content">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/products?category=${category.name}`}
            className="category__item"
          >
            <img src={category.image} alt={category.name} className="category__img" />
            <h3 className="category__name">{category.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default Categories;