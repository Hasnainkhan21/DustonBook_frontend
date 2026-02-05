import React from "react";
import aboutPic1 from "../assets/about.jpeg";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
const About = () => {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="py-10 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-3">
            About <span className="text-[#BF092F]">Dust on Book</span>
          </h1>
          <p className="text-lg font-[syne] text-gray-600 max-w-3xl mx-auto">
            Preserving thought, language, and resistance through books — with a deep focus on Pashto literature.
          </p>
        </motion.div>
      </section>

      {/* Image + Mission */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={aboutPic1}
              alt="Dust on Book"
              className="w-full h-80 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-[syne] text-gray-900">
              Our Mission
            </h2>

            <p className="text-gray-700 font-[ubuntu] leading-relaxed text-[16px]">
              Dust on Book is a space dedicated to readers who believe that books are instruments of knowledge,
              identity, and historical memory. Our mission is to make meaningful literature accessible —
              especially works written in <strong>Pashto</strong>.
            </p>

            <p className="text-gray-700 font-[ubuntu] text-[16px] leading-relaxed">
              Pashto literature carries centuries of poetry, political consciousness, philosophy,
              and resistance. We aim to preserve this intellectual tradition while introducing readers
              to works that challenge dominant narratives and encourage critical thinking.
            </p>

            <p className="text-gray-700 font-[ubuntu] text-[16px] leading-relaxed ">
              Beyond selling books, we curate ideas — ideas that question power, explore society,
              and reflect the lived realities of our people.
            </p>
          </motion.div>

        </div>
      </section>

      {/* Quote */}
      <section className="py-8 bg-[#BF092F]/5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4"
        >
          <div className="flex gap-4 items-start bg-white p-5 rounded-md shadow-sm border-l-4 border-[#BF092F]">
            <FaQuoteLeft className="text-[#BF092F] text-xl mt-1" />
            <p className="text-gray-700 italic text-lg">
              “A nation lives as long as its stories, language, and ideas live.”
            </p>
          </div>
        </motion.div>
      </section>

      {/* Story */}
      <section className="py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto px-4 space-y-5"
        >
          <h2 className="text-3xl font-[syne] text-gray-900 text-center">
            Our Story
          </h2>

          <p className="text-gray-700 font-[ubuntu] text-[16px]  leading-relaxed">
            Dust on Book was created for readers searching for depth in an age of surface-level content.
            We focus on books that document political movements, philosophical debates, and literary
            traditions from Pashtun regions and beyond.
          </p>

          <p className="text-gray-700 font-[ubuntu] text-[16px] leading-relaxed">
            Our collection includes Pashto poetry, revolutionary writings, political histories,
            and philosophical works that explore themes of justice, freedom, colonialism,
            and cultural survival. We also feature critical writings related to the
            Khudai Khidmatgar movement and the legacy of Bacha Khan.
          </p>

          <p className="text-gray-700 font-[ubuntu] text-[16px] leading-relaxed">
            We believe reading is an act of awareness. Each book is chosen not for popularity,
            but for the questions it raises and the conversations it begins.
          </p>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-[#BF092F]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-3">
            Discover Pashto Books That Matter
          </h2>
          <p className="text-white/90 text-lg mb-5">
            Literature rooted in language, history, and truth.
          </p>
          <button
            onClick={() => (window.location.href = "/books")}
            className="bg-white text-[#BF092F] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Browse Books
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
