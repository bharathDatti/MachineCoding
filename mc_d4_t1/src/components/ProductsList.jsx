import React, { useState, useEffect } from 'react';
import productsList from '../products';

const ProductList = () => {
  // Manage view state
  const [isGridView, setIsGridView] = useState(() => {
    const savedView = localStorage.getItem("isGridView");
    return savedView ? JSON.parse(savedView) : false;
  });

  // Persist view state to local storage
  useEffect(() => {
    localStorage.setItem("isGridView", JSON.stringify(isGridView));
  }, [isGridView]);

  // Toggle view
  const toggleView = () => {
    setIsGridView(prevState => !prevState);
  };

  return (
    <div className="App">
      <h1 className='title'>Product Catalog</h1>
      <button id="toggleViewBtn" onClick={toggleView}>
        {isGridView ? "🗂 List View" : "📦 Grid View"}
      </button>
      <div className={`product-container ${isGridView ? 'grid-view' : 'list-view'}`}>
        {productsList.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
