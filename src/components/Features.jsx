// "use client";
import { Truck, Headphones, RefreshCw, Lock } from "lucide-react";

const features = [
  {
    title: "FREE SHIPPING",
    desc: "Free shipping for all US order",
    icon: <Truck size={28} />,
  },
  {
    title: "SUPPORT 24/7",
    desc: "We support 24 hours a day",
    icon: <Headphones size={28} />,
  },
  {
    title: "100% MONEY BACK",
    desc: "You have 30 days to return",
    icon: <RefreshCw size={28} />,
  },
  {
    title: "PAYMENT SECURE",
    desc: "We ensure secure payment",
    icon: <Lock size={28} />,
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((item, i) => (
            <div
              key={i}
              className="border border-blue-500 rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all"
            >
              <div className=" mb-3 text-amber-600">{item.icon}</div>

              <h3 className="font-semibold text-lg tracking-wide text-blue-500">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
