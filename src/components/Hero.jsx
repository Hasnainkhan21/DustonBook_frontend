import React, { useEffect, useState } from "react";
import heroImage from '../assets/Hero.jpeg'
import { motion } from "framer-motion";

// Typing effect hook
function useTyping(text, speed = 50) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

const Hero = () => {
  const headline = useTyping("The Library of Infinite Stories", 60);

  return (
    <section className="min-h-[500px] flex flex-col-reverse lg:flex-row items-center justify-between bg-white px-6 lg:px-16 py-10">
      {/* Left Side - Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
        <motion.p
          className="text-[#BF092F] font-[syne] font-semibold text-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Dust On Books
        </motion.p>

        <motion.h1
          className="text-4xl sm:text-5xl  font-extrabold leading-tight text-[#BF092F]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="bg-yellow-400 text-white px-3 py-1 rounded-lg shadow-md inline-block">
            {headline}
          
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg max-w-md mx-auto lg:mx-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Discover hand-picked collections, literary classics, and modern bestsellers. Immerse yourself in the world of books.
        </motion.p>

        <motion.button
          className="mt-4 bg-[#BF092F] text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-[#a30828] transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          Browse Collections
        </motion.button>
      </div>

      {/* Right Side - Image */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="relative w-72 h-72 sm:w-120 sm:h-100 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={heroImage}
            alt="Your Portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
