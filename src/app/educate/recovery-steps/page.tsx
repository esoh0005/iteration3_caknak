"use client";

import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import { FaCheckCircle, FaTimesCircle, FaUniversity, FaCreditCard, FaWallet, FaShoppingCart, FaUserSecret, FaExclamationCircle } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";


export default function RecoverySteps() {
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

            <div className="flex flex-col items-center justify-center flex-grow px-4 py-8 space-y-8">
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-[#5b4636] mb-2">
                    Protect Your Digital Identity
                </h1>
                <p className="text-lg text-[#5b4636] mb-8 max-w-xl mx-auto">
                    Follow these magical steps to secure your account!
                </p>

                {/* Step 1 */}
                <div className="w-full max-w-2xl bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#fde68a] text-[#5b4636] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">1</div>
                        <h2 className="text-2xl font-bold text-[#5b4636]">Change Passwords for Affected Accounts</h2>
                    </div>
                    <ul className="list-disc ml-6 text-[#5b4636]">
                        <li>Change important accounts like banking and email</li>
                        <li>Use strong passwords (12+ characters with letters, numbers, symbols)</li>
                        <li>Avoid reusing passwords across accounts</li>
                    </ul>
                    <div className="space-y-4 max-w-2xl mx-auto">
                        <h2 className="flex flex-col space-y-2 text-xl font-extrabold text-[#5b4636] pt-2">Strong and Weak Password Examples:</h2>

                        {/* Strong Example */}
                        <div className="flex items-center gap-3 border-4 border-green-700 bg-green-100 rounded-2xl px-4 py-3 shadow text-[#5b4636]">
                            <FaCheckCircle className="text-green-700 text-2xl" />
                            <span className="font-semibold text-green-800">Strong Example:</span>
                            <span className="font-bold">T4k$0m3†1j!2@Z3NM</span>
                        </div>

                        {/* Weak Example 1 */}
                        <div className="flex items-center gap-3 border-4 border-red-700 bg-red-100 rounded-2xl px-4 py-3 shadow text-[#5b4636]">
                            <FaTimesCircle className="text-red-700 text-2xl" />
                            <span className="font-semibold text-red-800">Weak Example:</span>
                            <span className="font-bold">password123</span>
                        </div>

                        {/* Weak Example 2 */}
                        <div className="flex items-center gap-3 border-4 border-red-700 bg-red-100 rounded-2xl px-4 py-3 shadow text-[#5b4636]">
                            <FaTimesCircle className="text-red-700 text-2xl" />
                            <span className="font-semibold text-red-800">Weak Example:</span>
                            <span className="font-bold">myname1990</span>
                        </div>
                    </div>
                    {/* <Link href="/check/password-checker" className="flex justify-center">
                        <button className="bg-[#fef5e7] text-[#5b4636] text-lg font-bold rounded-2xl px-6 py-3 border-4 border-[#5b4636] shadow hover:scale-105 transition">
                            Click Here to Verify Your Password
                        </button>
                    </Link>
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
                            fontSize: "24px",
                        }}
                        className="px-6 py-3 rounded-xl shadow-md font-semibold text-lg border-4 border-[#5b4636]"
                        onClick={() => (window.location.href = "/home")}
                    >
                        Click Here to Verify Your Password
                    </motion.button> */}
                </div>

                {/* Step 2 */}
                <div className="w-full max-w-2xl bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#fde68a] text-[#5b4636] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">2</div>
                        <h2 className="text-2xl font-bold text-[#5b4636]">Enable Two-Factor Authentication (2FA)</h2>
                    </div>
                    <ul className="list-disc ml-6 text-[#5b4636]">
                        <li>Enable 2FA for important accounts</li>
                        <li>Use authenticator apps over SMS for better security</li>
                        <li>Recommended apps: Google Authenticator, Authy</li>
                    </ul>
                    <div className="flex flex-col space-y-2 text-lg font-bold text-[#5b4636] pt-2"> 2FA Setup Examples of Common Services:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                        {/* Maybank2u */}
                        <button className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border-4 border-yellow-300 bg-yellow-100 text-yellow-800 font-semibold shadow">
                            <FaUniversity className="text-2xl" />
                            Maybank2u
                        </button>

                        {/* CIMB Clicks */}
                        <button className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border-4 border-pink-300 bg-pink-100 text-pink-800 font-semibold shadow">
                            <FaCreditCard className="text-2xl" />
                            CIMB Clicks
                        </button>

                        {/* Touch 'n Go eWallet */}
                        <button className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border-4 border-blue-300 bg-blue-100 text-blue-800 font-semibold shadow">
                            <FaWallet className="text-2xl" />
                            Touch &apos;n Go eWallet
                        </button>

                        {/* Online Shopping */}
                        <button className="flex items-center gap-2 w-full px-4 py-3 rounded-xl border-4 border-orange-300 bg-orange-100 text-orange-800 font-semibold shadow">
                            <FaShoppingCart className="text-2xl" />
                            Online Shopping
                        </button>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="w-full max-w-2xl bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#fde68a] text-[#5b4636] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">3</div>
                        <h2 className="text-2xl font-bold text-[#5b4636]">Check Account Activity</h2>
                    </div>
                    <ul className="list-disc ml-6 text-[#5b4636]">
                        <li>Review login history</li>
                        <li>Look for unknown devices or locations</li>
                        <li>Check for suspicious transactions</li>
                    </ul>

                    {/* Detective Tips Box */}
                    <div className="bg-cyan-50 border-4 border-cyan-700 rounded-xl p-4 shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <FaUserSecret className="text-2xl text-cyan-700" />
                            <p className="font-semibold text-cyan-700">Detective Tips!</p>
                        </div>
                        <p className="text-cyan-800 text-lg pt-2 pb-4">Check your account for these signs of trouble:</p>
                        <ul className="list-disc ml-6 text-cyan-800 space-y-1">
                            <li>Logins from places you’ve never been</li>
                            <li>Weird activity times</li>
                            <li>Unknown purchases or downloads</li>
                            <li>Messages you didn’t send</li>
                        </ul>
                    </div>
                </div>

                {/* Step 4 */}
                <div className="w-full max-w-2xl bg-[#f9f4e6] border-4 border-[#5b4636] rounded-2xl p-6 shadow-lg space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#fde68a] text-[#5b4636] rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl">4</div>
                        <h2 className="text-2xl font-bold text-[#5b4636]">Stay Vigilant</h2>
                    </div>
                    <ul className="list-disc ml-6 text-[#5b4636]">
                        <li>Be alert to phishing attempts</li>
                        <li>Regularly review account settings</li>
                        <li>Consider using a password manager</li>
                    </ul>

                    {/* Phishing Alert Box */}
                    <div className="bg-rose-50 border-4 border-rose-700 rounded-xl p-4 shadow-lg">
                        <div className="flex items-center gap-2 mb-2">
                            <FaExclamationCircle className="text-2xl text-rose-700" />
                            <p className="font-semibold text-rose-700">Phishing Alert!</p>
                        </div>
                        <p className="text-rose-800 text-lg pt-2 pb-4">Be aware of these common tactics used by attackers:</p>
                        <ul className="list-disc ml-6 text-rose-800 space-y-1">
                            <li>Emails pretending your account has issues</li>
                            <li>Messages asking for passwords</li>
                            <li>Weird links</li>
                            <li>Too-good-to-be-true offers</li>
                        </ul>
                    </div>
                    {/* <Link href="/educate/phishing-prevention" className="flex justify-center">
                        <button className="bg-[#5b4636] text-[#fef5e7] text-lg font-bold rounded-2xl px-6 py-3 border-4 border-yellow-400 shadow hover:scale-105 transition">
                            Learn More About Phishing Prevention
                        </button>
                    </Link> */}
                </div>
            </div>

            <Footer />
        </main>
    );
}
