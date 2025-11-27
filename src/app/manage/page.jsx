"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";
import Spinner from "@/components/Spinner";
import Swal from "sweetalert2";

export default function ManagePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("process.env.NEXT_PUBLIC_API_URL/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        toast(err.message);
      }
    }
    load();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `process.env.NEXT_PUBLIC_API_URL/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.success) {
        Swal.fire("Error", data.message || "Delete failed", "error");
        return;
      }

      // Update UI instantly
      setProducts((prev) => prev.filter((p) => p._id !== id));

      Swal.fire({
        title: "Deleted!",
        text: "Product has been deleted.",
        icon: "success",
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Server Error", "Something went wrong.", "error");
    }
  };

  // const handleDelete = async (id) => {
  //   // if (!confirm("Delete this product?")) return;
  //   try {
  //     const res = await fetch(`process.env.NEXT_PUBLIC_API_URL/products/${id}`, {
  //       method: "DELETE",
  //     });
  //     const data = await res.json();
  //     if (!data.success) {
  //       toast.error(data.message || "Delete failed");
  //       return;
  //     }
  //     toast.success("Deleted");
  //     setProducts((p) => p.filter((it) => it._id !== id));
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Server error");
  //   }
  // };

  if (loading) return <Spinner />;

  return (
    <RequireAuth>
      <div className="max-w-5xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-semibold mb-4 text-teal-600">
          Manage Products
        </h1>
        {products.length === 0 ? (
          <div>
            No products found.{" "}
            <Link href="/add" className="text-blue-500">
              Add one
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <div className="hidden md:table-cell">
                    <th className="">SL</th>
                    <th className="">Image</th>
                  </div>
                  <th>Title</th>
                  <th>Price</th>
                  <th>View</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product._id}>
                    <div className="hidden md:table-cell">
                      <th className="">
                        <span>{index + 1}</span>
                      </th>
                      <td className="">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product?.image || "No Image"}
                              alt="No Image"
                            />
                          </div>
                        </div>
                      </td>
                    </div>
                    <td>
                      <div className="md:font-bold">{product.title}</div>
                    </td>
                    <td>$ {product.price}</td>
                    <th>
                      <Link
                        href={`/products/${product._id}`}
                        className="btn btn-xs btn-outline text-teal-600"
                      >
                        View
                      </Link>
                    </th>
                    <th>
                      <Link
                        href={`/products/${product._id}/edit`}
                        className="btn btn-xs btn-outline text-teal-600"
                      >
                        Edit
                      </Link>
                    </th>
                    <th>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-xs btn-outline text-red-600"
                      >
                        Delete
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </RequireAuth>
  );
}
