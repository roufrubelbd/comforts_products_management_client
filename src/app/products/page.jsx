"use client";

import Link from "next/link";
// import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const categories = [
    "All",
    "Men",
    "Women",
    "Kids",
    "Home Decor",
    "Phone Cases",
    "Bags",
  ];

  // FILTERED PRODUCTS
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = filter === "All" || product.category === filter;
    return matchesSearch && matchesCategory;
  });

  //   console.log(products);

  return (
    <div className="px-6 md:px-16 lg:px-24 pb-16 pt-6">
      {/* PAGE TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-teal-600 py-4">
        All Collections
      </h1>
      <p className="text-gray-600 mb-8">
        Browse our latest collection of shirts, accessories, and lifestyle
        items.
      </p>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border border-gray-300 px-4 py-2 rounded-md w-full md:w-1/4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-neutral-100 rounded-lg shadow-sm p-4 hover:shadow-lg  transition transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full object-cover rounded-md mb-3"
            />
            {/* <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover rounded-md mb-3"
            /> */}

            <h2 className="text-lg font-semibold">{product.title}</h2>

            <p className="text-gray-600 text-sm line-clamp-2 mt-1">
              {product.desc || product?.shortDescription}
            </p>

            <p className="text-xs text-blue-500 font-medium mt-1">
              {product.category}
            </p>

            <div className="flex justify-between items-center">
              <p className="text-lg font-bold mt-2">${product.price}</p>

              <Link
                href={`/products/${product._id}`}
                className="btn text-teal-600 btn-sm btn-outline mt-3 rounded-md  hover:bg-teal-600 hover:text-white font-medium transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
