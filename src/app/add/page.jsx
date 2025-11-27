// "use client";

// import React, { useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import RequireAuth from "@/components/RequireAuth";
// import Spinner from "@/components/Spinner";

// export default function AddPage() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   if (loading) return <Spinner />;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const product = {
//       title: e.target.title.value,
//       desc: e.target.desc.value,
//       longDesc: e.target.longDesc.value,
//       price: parseFloat(e.target.price.value),
//       category: e.target.category.value,
//       date: e.target.date.value,
//       priority: e.target.priority.value,
//       image: e.target.image.value || "",
//       userEmail: session?.user?.email || null,
//     };
// //    console.log('Before post', product)

//     try {
//       const res = await fetch("process.env.NEXT_PUBLIC_API_URL/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(product),
//       });

//       const data = await res.json();

//       if (!data.success) {
//         toast.error(data.message || "Failed to add product");
//         setLoading(false);
//         return;
//       }
//     //   console.log('after post', data)

//       toast.success("Product added successfully");
//       setLoading(false);
//       e.target.reset();
//       // Optional: navigate to manage page
//       router.push("/manage");
//     } catch (err) {
//     //   console.error(err);
//       toast.error("Server error. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <RequireAuth>
//       <div className="max-w-2xl mx-auto p-4 mt-6">
//         <h1 className="text-2xl font-bold mb-4 text-teal-600">Add Product</h1>

//         <div className="card bg-base-100 shadow p-6 border border-teal-300">
//           <form onSubmit={handleSubmit} className="space-y-3">
//             <label className="label">
//               <span className="label-text">Title</span>
//             </label>
//             <input name="title" className="input w-full" required />

//             <div>
//               <label className="label">
//                 <span className="label-text">Category</span>
//               </label>
//               <select name="category" className="select w-full">
//                 <option value="Home Decor">Home Decor</option>
//                 <option value="Phone Cases" defaultValue>
//                   Phone Cases
//                 </option>
//                 <option value="Bags">Bags</option>
//                 <option value="Kids">Kids</option>
//                 <option value="Women">Women</option>
//                 <option value="Men">Men</option>
//               </select>
//             </div>

//             <label className="label">
//               <span className="label-text">Short description</span>
//             </label>
//             <input name="desc" className="input w-full" required />

//             <label className="label">
//               <span className="label-text">Full description</span>
//             </label>
//             <textarea
//               name="longDesc"
//               className="textarea w-full"
//               rows="4"
//             />

//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <label className="label">
//                   <span className="label-text">Price</span>
//                 </label>
//                 <input
//                   name="price"
//                   type="number"
//                   step="0.01"
//                   className="input w-full"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="label">
//                   <span className="label-text">Date</span>
//                 </label>
//                 <input name="date" type="date" className="input w-full" required />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <label className="label">
//                   <span className="label-text">Priority</span>
//                 </label>
//                 <select name="priority" className="select w-full">
//                   <option value="low">Low</option>
//                   <option value="normal" defaultValue>
//                     Normal
//                   </option>
//                   <option value="high">High</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="label">
//                   <span className="label-text">Image URL (optional)</span>
//                 </label>
//                 <input
//                   name="image"
//                   type="url"
//                   className="input w-full"
//                   placeholder="https://..."
//                 />
//               </div>
//             </div>

//             <div className="pt-3">
//               <button
//                 className="btn bg-white text-black border-[#e5e5e5] hover:bg-blue-100"
//                 disabled={loading}
//               >
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </RequireAuth>
//   );
// }

"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import RequireAuth from "@/components/RequireAuth";
import Spinner from "@/components/Spinner";

export default function AddPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (loading) return <Spinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const product = {
      title: e.target.title.value,
      desc: e.target.desc.value,
      longDesc: e.target.longDesc.value,
      price: parseFloat(e.target.price.value),
      category: e.target.category.value,
      date: e.target.date.value,
      priority: e.target.priority.value,
      image: e.target.image.value || "",
      userEmail: session?.user?.email || null,
    };

    try {
      const res = await fetch("process.env.NEXT_PUBLIC_API_URL/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        toast.error("Server returned an error");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to add product");
        setLoading(false);
        return;
      }

      toast.success("Product added successfully");
      e.target.reset();
      setLoading(false);

      router.push("/manage");
    } catch (err) {
      toast.error("Unable to reach the server.");
      setLoading(false);
    }
  };

  return (
    <RequireAuth>
      <div className="max-w-2xl mx-auto p-4 mt-6">
        <h1 className="text-2xl font-bold mb-4 text-teal-600">Add Product</h1>

        <div className="card bg-base-100 shadow p-6 border border-teal-300">
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input name="title" className="input w-full" required />

            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select name="category" className="select w-full">
                <option value="Home Decor">Home Decor</option>
                <option value="Phone Cases">Phone Cases</option>
                <option value="Bags">Bags</option>
                <option value="Kids">Kids</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
              </select>
            </div>

            <label className="label">
              <span className="label-text">Short description</span>
            </label>
            <input name="desc" className="input w-full" required />

            <label className="label">
              <span className="label-text">Full description</span>
            </label>
            <textarea name="longDesc" className="textarea w-full" rows="4" />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  className="input w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <input
                  name="date"
                  type="date"
                  className="input w-full"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <select name="priority" className="select w-full">
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Image URL (optional)</span>
                </label>
                <input
                  name="image"
                  type="url"
                  className="input w-full"
                  placeholder="https://..."
                />
              </div>
            </div>

            <button
              className="btn bg-white text-black border-[#e5e5e5] hover:bg-blue-100"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </RequireAuth>
  );
}
