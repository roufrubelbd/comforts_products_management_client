import React from "react";
import Link from "next/link";

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);

  if (!res.ok) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p>Product not found.</p>
        <Link href="/">Back</Link>
      </div>
    );
  }

  const product = await res.json();

  return (
    <div className=" px-6 md:px-16 lg:px-24 mt-10 mx-auto min-h-screen">
      <h2 className="text-2xl font-bold my-6 text-teal-600">Product Details</h2>
      <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.title}
            className=" object-cover rounded p-4 bg-teal-50"
          />
        </div>
        <div className="w-full  md:w-1/2 space-y-2 ">
          <h3 className="text-3xl font-bold">{product.title}</h3>
          <p className="text-gray-600">
            {product.fullDescription || product.desc}
          </p>
          <div>
            <strong>Price:</strong> {product.price}
          </div>
          <div>
            <strong>Category:</strong> {product.category}
          </div>
          <Link
            href="/products"
            className="btn text-teal-600 btn-outline hover:text-white hover:bg-teal-600"
          >
            All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
