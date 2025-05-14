"use client";

import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import Link from "next/link";
import { FaEnvelopeOpenText, FaUserFriends, FaGift, FaSearch, FaShieldAlt, FaQuestionCircle } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function PhishingPreventionPage() {
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
                        <img src="/main/guardian_book.png" alt="Cyber Heroes" className="w-15 h-20 inline-block" /> Phishing Prevention for Super Cyber Heroes!
                    </h1>
                    <div className="text-[#5b4636] text-center text-lg">
                        Join us on a cyber adventure to learn how to protect yourself from digital tricksters called &quot;phishers&quot;!
                    </div>
                </div>

                {/* What is Phishing Box */}
                <div className="bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg max-w-xl w-full text-[#5b4636]">
                    <h2 className="text-3xl font-bold text-center gap-2">
                        🎣 &nbsp; What is Phishing?
                    </h2>
                    <p className="mt-2 pb-2">
                        Phishing is a sneaky trick where scammers pretend to be trusted sources to steal your information.
                    </p>
                    <p className="mt-2">
                        It&apos;s like when someone pretends to be your friend to get you to share a secret - but online!
                    </p>
                    <div className="flex flex-col gap-2 text-lg font-bold pt-5">Phishers might try to get your:</div>
                    <ul className="list-disc ml-6 mt-2 space-y-1">
                        <li>Passwords</li>
                        <li>Usernames</li>
                        <li>Phone numbers</li>
                        <li>Home address</li>
                        <li>Social media login information</li>
                    </ul>
                    <Link
                        href="/check/phishing-detection"
                        className="mt-4 inline-block bg-[#5b4636] text-white font-bold rounded-xl px-4 py-2 border-4 border-cyan-800 hover:scale-105 transition"
                    >
                        <FaMagnifyingGlass className="inline-block" /> &nbsp; Click here to Detect Phishing
                    </Link>
                </div>

                {/* Suspicious examples */}
                <div className="flex flex-col items-center bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg max-w-5xl w-full text-[#5b4636]">
                    <h2 className="text-3xl font-bold text-center gap-2 pb-6">
                        🚨 Watch Out For These Phishing Tricks!
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                        {/* Email */}
                        <div className="bg-orange-50 border-4 border-orange-500 rounded-2xl p-4 text-[#5b4636]">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                                <FaEnvelopeOpenText className="text-orange-600" /> Suspicious Email
                            </h3>
                            <div className="bg-white border border-orange-400 rounded-lg p-3 shadow-inner text-sm space-y-1">
                                <p><span className="font-semibold">Subject:</span> <span className="font-bold">YOU WON $1,000,000!!!</span></p>
                                <p><span className="font-semibold">From:</span> <span className="text-red-600">[email protected]</span></p>
                                <p>Click here to claim your prize now!</p>
                            </div>
                            <p className="text-sm pt-4">Watch out for emails with bad spelling, strange addresses, or prizes that seem too good to be true!</p>
                        </div>

                        {/* Friend Request */}
                        <div className="bg-orange-50 border-4 border-orange-500 rounded-2xl p-4 text-[#5b4636">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                                <FaUserFriends className="text-orange-600" /> Fake Friend Request
                            </h3>
                            <div className="bg-white border border-orange-400 rounded-lg p-3 shadow-inner text-sm space-y-1">
                                <p><span className="font-semibold">Sophie_Gamer293</span></p>
                                <p className="text-gray-500 text-xs">No mutual friends</p>
                                <button className="mt-1 px-3 py-1 bg-blue-400 text-white text-sm rounded hover:scale-105 transition">Accept Request</button>
                            </div>
                            <p className="text-sm pt-4">Be careful of friend requests from people you don&apos;t know – they might want to steal your information!</p>
                        </div>

                        {/* Game Offer */}
                        <div className="bg-orange-50 border-4 border-orange-500 rounded-2xl p-4 text-[#5b4636]">
                            <h3 className="font-bold text-lg flex items-center gap-2 mb-2">
                                <FaGift className="text-orange-600" /> Gaming Website Pop-ups
                            </h3>
                            <div className="bg-white border border-orange-400 rounded-lg p-3 shadow-inner text-sm space-y-1">
                                <p className="font-bold text-center">CONGRATULATIONS!</p>
                                <p>You won 500 free game coins!</p>
                                <p>Enter your account details to claim:</p>
                                <button className="mt-1 px-3 py-1 bg-red-500 text-white text-sm rounded hover:scale-105 transition">Claim Now!</button>
                            </div>
                            <p className="text-sm pt-2">Pop-ups offering free game currency or prizes often try to steal your account information!</p>
                        </div>
                    </div>
                </div>

                {/* Flip Cards */}
                <div className="flex flex-col items-center justify-center flex-grow px-4 py-8 space-y-8">
                    <h1 className="text-4xl font-bold text-[#5b4636] text-center">
                        🦸‍♂️ Phishing Prevention for Super Cyber Heroes!
                    </h1>
                    <p className="text-center text-[#5b4636] max-w-xl">
                        Learn how to spot scams and protect your digital kingdom.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
                        {/* Flip Card 1 */}
                        <Link href="/phishing-prevention/spot-fake" passHref>
                            <div className="group perspective">
                                <div className="relative w-72 h-72 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                                    {/* Front */}
                                    <div className="absolute inset-0 bg-red-100 rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden shadow-lg">
                                        <FaSearch className="text-red-600 text-6xl mb-4" />
                                        <h2 className="text-2xl font-bold text-red-700">Spot the Fake</h2>
                                        <p className="text-red-700 text-center">Hover over me to learn!</p>
                                    </div>
                                    {/* Back */}
                                    <div className="absolute inset-0 bg-red-50 rounded-2xl p-4 rotate-y-180 backface-hidden shadow-lg">
                                        <h2 className="text-xl font-bold text-red-700 mb-2">How to Spot Fake Content:</h2>
                                        <ul className="text-red-800 space-y-1 text-sm">
                                            <li>✅ Check the website address for typos</li>
                                            <li>✅ Look for grammar & spelling errors</li>
                                            <li>✅ Be cautious of urgency or fear</li>
                                            <li>✅ Check for 🔒 icon in address bar</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Flip Card 2 */}
                        <Link href="/phishing-prevention/safe-habits" passHref>
                            <div className="group perspective">
                                <div className="relative w-72 h-72 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                                    {/* Front */}
                                    <div className="absolute inset-0 bg-green-100 rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden shadow-lg">
                                        <FaShieldAlt className="text-green-600 text-6xl mb-4" />
                                        <h2 className="text-2xl font-bold text-green-700">Safe Online Habits</h2>
                                        <p className="text-green-700 text-center">Hover over me to learn!</p>
                                    </div>
                                    {/* Back */}
                                    <div className="absolute inset-0 bg-green-50 rounded-2xl p-4 rotate-y-180 backface-hidden shadow-lg">
                                        <h2 className="text-xl font-bold text-green-700 mb-2">Safe Online Habits:</h2>
                                        <ul className="text-green-800 space-y-1 text-sm">
                                            <li>✅ Use different passwords</li>
                                            <li>✅ Don’t share personal info</li>
                                            <li>✅ Log out on shared computers</li>
                                            <li>✅ Keep devices updated</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        {/* Flip Card 3 */}
                        <Link href="/phishing-prevention/what-to-do" passHref>
                            <div className="group perspective">
                                <div className="relative w-72 h-72 transition-transform duration-500 transform-style-preserve-3d group-hover:rotate-y-180">
                                    {/* Front */}
                                    <div className="absolute inset-0 bg-blue-100 rounded-2xl p-6 flex flex-col items-center justify-center backface-hidden shadow-lg">
                                        <FaQuestionCircle className="text-blue-600 text-6xl mb-4" />
                                        <h2 className="text-2xl font-bold text-blue-700">What to Do If…</h2>
                                        <p className="text-blue-700 text-center">Hover over me to learn!</p>
                                    </div>
                                    {/* Back */}
                                    <div className="absolute inset-0 bg-blue-50 rounded-2xl p-4 rotate-y-180 backface-hidden shadow-lg">
                                        <h2 className="text-xl font-bold text-blue-700 mb-2">If You Find a Phishing Attempt:</h2>
                                        <ul className="text-blue-800 space-y-1 text-sm">
                                            <li>✅ Don’t click links or download</li>
                                            <li>✅ Tell an adult right away</li>
                                            <li>✅ Mark email as spam</li>
                                            <li>✅ Change your password</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
