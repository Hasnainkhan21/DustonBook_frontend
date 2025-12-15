import React, { useEffect, useState } from "react";
import heroImage from "../assets/Hero.jpeg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Typing effect
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
  const MotionLink = motion(Link);

  return (
    <section className="min-h-[400px] flex flex-col md:flex-row items-center justify-between bg-[#FFF9F5] px-6 md:px-5 lg:px-15 gap-10 py-5 relative overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-200 opacity-40 rounded-full blur-3xl translate-x-20 -translate-y-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-yellow-200 opacity-40 rounded-full blur-3xl -translate-x-20 translate-y-10"></div>

      {/* TEXT – Mobile First */}
      <div className="w-full md:w-1/2 order-1 space-y-6 text-center md:text-left relative z-10">

        <motion.p
          className="text-red-700 font-bold tracking-widest uppercase text-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dust On Book
        </motion.p>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight text-gray-900"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-lg inline-block">
            {headline}
          </span>
        </motion.h1>

        <motion.p
          className="text-gray-700 text-lg md:text-xl max-w-lg mx-auto md:mx-0 font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Discover hand-picked collections, timeless classics, and modern masterpieces.
          Dive into a world where **every story matters**.
        </motion.p>

        <MotionLink
          to="/books"
          className="inline-block bg-red-700 hover:bg-red-800 text-white px-10 py-4 rounded-xl font-bold text-lg tracking-wide shadow-lg transition-transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.6 }}
        >
          Browse Collections
        </MotionLink>

      </div>

      {/* IMAGE – Mobile Second */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center mt-3 md:mt-0 order-2 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/30 to-red-300/30 rounded-full blur-2xl"></div>

          <div className="relative w-full h-full rounded-2xl overflow-hidden border-[3px] border-none shadow-2xl">
            <img
              src={heroImage}
              alt="Stack of Books"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
