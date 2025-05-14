"use client";

import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import { motion } from "framer-motion";
import { FaGamepad, FaShieldAlt, FaTrophy, FaUserFriends } from "react-icons/fa";
import Link from "next/link";

export default function PhishingGamePage() {
    return (
        <main
            className="min-h-screen flex flex-col"
            style={{
                backgroundImage: "url('/textures/parchment-texture.png')",
                backgroundRepeat: "repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                fontFamily: "var(--font-sniglet)",
            }}
        >
            <TopNav />

            <div className="flex flex-col items-center px-4 py-8 space-y-10 flex-grow">
                {/* Title */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-[#5b4636] flex items-center justify-center gap-2">
                        <img src="/main/guardian_book.png" alt="Cyber Heroes" className="w-15 h-20 inline-block" /> Phishing Game - Test Your Skills!
                    </h1>
                    <div className="text-[#5b4636] text-center text-lg">
                        Put your phishing detection skills to the test in this interactive game!
                    </div>
                </div>

                {/* Game Introduction Box */}
                <div className="bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg max-w-xl w-full text-[#5b4636]">
                    <h2 className="text-3xl font-bold text-center gap-2">
                        🎮 &nbsp; How to Play
                    </h2>
                    <p className="mt-4">
                        In this game, you'll be presented with various scenarios and messages. Your mission is to identify which ones are legitimate and which ones are phishing attempts.
                    </p>
                    <div className="flex flex-col gap-2 text-lg font-bold pt-5">Game Features:</div>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Multiple difficulty levels</li>
                        <li>Real-world scenarios</li>
                        <li>Instant feedback</li>
                        <li>Score tracking</li>
                        <li>Tips and explanations</li>
                    </ul>
                </div>

                {/* Game Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                    {/* Level 1 Card */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-50 border-4 border-green-500 rounded-2xl p-6 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaGamepad className="text-3xl text-green-600" />
                            <h3 className="text-2xl font-bold text-green-700">Level 1: Flappy Bird Challenge</h3>
                        </div>
                        <p className="text-green-800 mb-4">
                            Test your reflexes and awareness in this fun Flappy Bird game! Each pipe you pass represents avoiding a phishing attempt.
                        </p>
                        <Link href="/educate/phishing-game/level1">
                            <button className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition">
                                Start Flappy Bird Challenge
                            </button>
                        </Link>
                    </motion.div>

                    {/* Level 2 Card */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-blue-50 border-4 border-blue-500 rounded-2xl p-6 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaShieldAlt className="text-3xl text-blue-600" />
                            <h3 className="text-2xl font-bold text-blue-700">Level 2: Intermediate</h3>
                        </div>
                        <p className="text-blue-800 mb-4">
                            Challenge yourself with more complex scenarios and sophisticated phishing attempts.
                        </p>
                        <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                            Start Level 2
                        </button>
                    </motion.div>

                    {/* Level 3 Card */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-purple-50 border-4 border-purple-500 rounded-2xl p-6 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaUserFriends className="text-3xl text-purple-600" />
                            <h3 className="text-2xl font-bold text-purple-700">Level 3: Advanced</h3>
                        </div>
                        <p className="text-purple-800 mb-4">
                            Master the art of detection with real-world scenarios and advanced techniques.
                        </p>
                        <button className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition">
                            Start Level 3
                        </button>
                    </motion.div>

                    {/* Leaderboard Card */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="bg-yellow-50 border-4 border-yellow-500 rounded-2xl p-6 shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaTrophy className="text-3xl text-yellow-600" />
                            <h3 className="text-2xl font-bold text-yellow-700">Leaderboard</h3>
                        </div>
                        <p className="text-yellow-800 mb-4">
                            Check out the top players and see how you rank among other cyber heroes!
                        </p>
                        <button className="w-full bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 transition">
                            View Leaderboard
                        </button>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
} 