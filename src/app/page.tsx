"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "~/components/LanguageSwitcher";

const items = [
  {
    id: "magic_feather",
    label: "Magic Feather",
    message: "TEST your instincts — every answer brings you closer to the truth.",
    img: "/main/magic_feather2.png",
    position: "left",
    top: "64%",
    text_position: "65%",
  },
  {
    id: "guardian_book",
    label: "Guardian Book",
    message: "EDUCATE your mind — the book holds secrets to protect your world.",
    img: "/main/guardian_book.png",
    position: "right",
    top: "73%",
    text_position: "77%",
  },
  {
    id: "crystal_orb",
    label: "Crystal Orb",
    message: "CHECK what’s hidden — the orb reveals dangers beneath the surface.",
    img: "/main/crystal_orb.png",
    position: "left",
    top: "81%",
    text_position: "85%",
  },
];

export default function MainPage() {
  const [openedItems, setOpenedItems] = useState<string[]>([]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [enteringCastle, setEnteringCastle] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [showLangSelector, setShowLangSelector] = useState(false);

  useEffect(() => {
    setShowLangSelector(true);
  }, []);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    if (!openedItems.includes(id)) {
      setOpenedItems([...openedItems, id]);
    }
  };

  const handleCloseDialog = () => {
    setActiveItem(null);
  };

  const handleEnterCastle = () => {
    setEnteringCastle(true);
    setTimeout(() => {
      window.location.href = "/home";
    }, 2000);
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('/main/forest-background.png')` }}
    >
      <motion.div
        className="absolute inset-0 bg-black"
        animate={{ opacity: 0.7 - openedItems.length * 0.15 }}
      />

      {/* Top-right language switcher */}
      <div className="absolute right-20 top-3 -mr-16">
        <LanguageSwitcher />
      </div>

      {/* Bottom-right skip button */}
      <motion.button
        whileHover={{
          boxShadow: "0 0 20px 10px rgba(255, 255, 150, 0.6)",
          textShadow: "0px 0px 8px #f5e050",
          y: -5,
          scale: 1.05,
          rotate: [0, 2, -2, 2, 0],
        }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        style={{
          backgroundImage: "url('/textures/parchment-texture.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#5b4636",
          fontFamily: "'Great', cursive",
          fontSize: "24px",
        }}
        className="absolute bottom-10 right-10 z-50 px-6 py-3 rounded-xl shadow-md font-semibold text-lg border-4 border-[#5b4636]"
        onClick={() => (window.location.href = "/home")}
      >
        Skip
      </motion.button>

      {/* Forest Title */}
      {!enteringCastle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/15 left-2/7 -translate-x-1/2 text-center z-20"
        >
          <h1 className="text-5xl font-bold text-yellow-100 drop-shadow-lg" style={{ fontFamily: "var(--font-sniglet)" }}>
            The Enchanted Forest Beckons
          </h1>
          <p className="text-lg text-yellow-200 mt-2 max-w-md mx-auto" style={{ fontFamily: "var(--font-sniglet)" }}>
            Gather the tools of wisdom: CHECK, EDUCATE, and TEST before the castle doors unlock.
          </p>
        </motion.div>
      )}


      {/* Item icons */}
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute left-1/2 -translate-x-1/2 cursor-pointer z-10`}
          style={{ top: item.top, left: item.position === "left" ? "45%" : "53%" }}
          whileHover={{ scale: 1.1 }}
          animate={{
            filter: openedItems.includes(item.id)
              ? "drop-shadow(0 0 8px #fff)"
              : "drop-shadow(0 0 6px #ffd700)",
          }}
          onClick={() => handleItemClick(item.id)}
        >
          <Image
            src={item.img}
            alt={item.label}
            width={100}
            height={100}
          />
        </motion.div>
      ))}

      {/* Castle appears after all items clicked */}
      {openedItems.length === items.length && !enteringCastle && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-20 cursor-pointer"
          style={{ top: "22%", left: "47%" }}
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={handleEnterCastle}
        >
          <Image
            src="/main/castle.png"
            alt="Castle"
            width={250}
            height={250}
            className="drop-shadow-xl"
          />
          {/* Click Button on Castle */}
          <motion.button
            whileHover={{
              boxShadow: "0 0 20px 10px rgba(255, 255, 150, 0.6)",
              textShadow: "0px 0px 8px #f5e050",
              y: -5,
              scale: 1.05,
              rotate: [0, 2, -2, 2, 0],
            }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            style={{
              backgroundImage: "url('/textures/parchment-texture.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#5b4636",
              fontFamily: "'Great', cursive",
              fontSize: "24px",
            }}
            className="absolute top-3/4 left-2/5 -translate-x-1/2 -translate-y-1/2 z-30 px-4 py-2 rounded-lg shadow-md font-semibold border-4 border-[#5b4636]"
            onClick={handleEnterCastle}
          >
            Click
          </motion.button>
        </motion.div>
      )}

      {/* Dialog box */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key="dialog"
            className={`absolute z-30 ${items.find((i) => i.id === activeItem)?.position === "left"
              ? "left-2/7"
              : "left-5/7"
              } -translate-x-1/2`}
            style={{
              top: items.find((i) => i.id === activeItem)?.text_position,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="relative bg-yellow-100 border-4 border-yellow-700 text-black px-6 py-4 rounded-lg shadow-lg max-w-xs">
              {/* Pointer triangle */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-transparent ${items.find((i) => i.id === activeItem)?.position === "left"
                  ? "-right-4 border-l-8 border-l-yellow-700"
                  : "-left-4 border-r-8 border-r-yellow-700"
                  }`}
              ></div>
              <div className="text-md font-medium" style={{ fontFamily: "var(--font-sniglet)" }}>
                {items.find((i) => i.id === activeItem)?.message}
              </div>
              <button
                className="absolute top-1 right-2 text-xl text-yellow-800"
                onClick={handleCloseDialog}
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {enteringCastle && (
          <motion.div
            style={{
              backgroundImage: "url('/textures/parchment-texture.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="absolute inset-0 z-40 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Magic Circle */}
            <motion.img
              src="/textures/rune-circle.png"
              alt="Magic Circle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5, rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute w-800 h-800 object-contain opacity-30"
              style={{
                filter: "drop-shadow(0 0 10px #fde68a)",
              }}
            />

            {/* Middle breathing text */}
            <motion.div
              initial={{ opacity: 0.7, textShadow: "0px 0px 6px #facc15" }}
              animate={{
                opacity: [0.7, 1, 0.7],
                textShadow: [
                  "0px 0px 12px #fde68a",
                  "0px 0px 6px #facc15",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="text-yellow-700 text-4xl font-bold border-2 border-yellow-700 rounded-lg 
              p-4 bg-white/70 backdrop-blur-md shadow-lg relative z-10" 
              style={{ fontFamily: "var(--font-sniglet)" }}
            >
              As the gates creak open, a new chapter unfolds…
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
