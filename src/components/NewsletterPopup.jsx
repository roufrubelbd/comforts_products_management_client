// "use client";

import Image from "next/image";
import img01 from "../assets/subscribe.png";

const NewsletterSection = () => {
  return (
    <div className="py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <Image
            src={img01}
            width={400}
            height={300}
            className="object-contain"
            alt="White Tiger Shirt"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h2 className="text-4xl font-semibold mb-4">Newsletter</h2>

          <p className="text-gray-600 mb-6">
            Be the first to know about our new arrivals, exclusive offers, and
            the latest fashion updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter email"
              className="flex-1 border border-gray-300 p-3 rounded-md focus:outline-none"
            />

            <button className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-md font-medium w-full sm:w-auto">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
