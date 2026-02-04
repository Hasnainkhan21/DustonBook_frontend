import React from 'react'
import { Link } from "react-router-dom";
import { FaShippingFast, FaTag, FaHeadset, FaTruck } from "react-icons/fa";

const features = [
  {
    icon: <FaShippingFast className="text-[#BF092F]" />,
    title: "Fast Delivery",
    desc: "Reliable shipping so your books arrive quickly and safely."
  },
  {
    icon: <FaTag className="text-[#BF092F]" />,
    title: "Best Prices",
    desc: "Curated deals and honest pricing across our entire catalog."
  },
  {
    icon: <FaHeadset className="text-[#BF092F]" />,
    title: "24/7 Support",
    desc: "Help whenever you need it — friendly, helpful customer service."
  },
  {
    icon: <FaTruck className="text-[#BF092F]" />,
    title: "Cash on Delivery",
    desc: "Shop with confidence using our secure cash on delivery option."
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-1 sm:py-14 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-3xl text-[#BF092F] font-semibold">Why Choose Us</p>
          <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
            Books that inspire, delivered with care
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300 max-w-2xl mx-auto">
            We combine a hand-picked selection, great prices, and exceptional service so you can focus on reading.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <article
              key={i}
              className="flex items-start gap-4 p-4 sm:p-5 bg-white dark:bg-slate-800 rounded-xl border border-transparent hover:shadow-lg hover:border-[#F6C5A8] transition-all duration-200"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-md bg-[#FFF8F6] dark:bg-slate-700/60 flex items-center justify-center text-lg sm:text-xl">
                {f.icon}
              </div>

              <div>
                <h4 className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100">{f.title}</h4>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-300">{f.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/books"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#BF092F] text-white text-sm font-semibold hover:bg-[#9d061f] transition"
            aria-label="Explore books"
          >
            Explore Our Collection
          </Link>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
