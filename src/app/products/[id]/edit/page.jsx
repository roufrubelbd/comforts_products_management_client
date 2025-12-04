"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // Fetch product by ID
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
        );
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to load product");
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  // Handle Submit
  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = e.target;
    const updatedProduct = {
      title: form.title.value,
      price: form.price.value,
      image: form.image.value,
      desc: form.desc.value,
      longDesc: form.longDesc.value,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Product updated!");
        router.push("/manage");
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  if (loading) return <Spinner />;
  if (!product)
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-8 bg-base-100 shadow-xl border border-teal-300 rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center text-teal-600">
        Edit Product
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            defaultValue={product.title}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            type="text"
            name="image"
            defaultValue={product.image}
            className="input input-bordered w-full"
          />

          {/* Preview */}
          <div className="mt-2">
            <img
              src={product.image}
              alt="Preview"
              className="h-34 object-cover rounded border border-teal-100"
            />
          </div>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="number"
            name="price"
            defaultValue={product.price}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Short Description</span>
          </label>
          <textarea
            name="desc"
            defaultValue={product.desc}
            className="textarea textarea-bordered w-full"
            rows="2"
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Long Description</span>
          </label>
          <textarea
            name="longDesc"
            defaultValue={product.longDesc}
            className="textarea textarea-bordered w-full"
            rows="4"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-outline btn-error btn-sm rounded-full"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn btn-outline btn-success btn-sm rounded-full"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
