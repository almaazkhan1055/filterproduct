"use client";

import React, { useEffect, useState } from "react";
import { products } from "../products";

const Fetch = () => {
  const [filteredData, setFilteredData] = useState(products);
  const [categories, setCategories] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const handleClick = (e) => {
    const categoryName = e.target.value;
    if (activeFilters.includes(categoryName)) {
      setActiveFilters(
        activeFilters.filter(
          (filteredCategory) => filteredCategory !== categoryName
        )
      );
    } else {
      setActiveFilters([...activeFilters, categoryName]);
    }
  };

  const filterProducts = () => {
    if (activeFilters.length) {
      const filtered = products.filter((item) =>
        activeFilters.includes(item.category)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(products);
    }
  };

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [activeFilters]);

  return (
    <div className="min-h-screen p-4 ">
      <div className="flex flex-wrap items-center justify-around gap-2 mb-4">
        {categories.map((category, index) => (
          <button
            key={index}
            value={category}
            onClick={handleClick}
            className={`border-2 capitalize border-black p-2 rounded-md hover:bg-gray-200 transition-all duration-300 ease-in-out ${
              activeFilters.includes(category)
                ? "bg-gray-800 text-white font-bold"
                : ""
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredData.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {product.name}
              </h3>
              <p className="text-gray-600">{product.brand}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fetch;
