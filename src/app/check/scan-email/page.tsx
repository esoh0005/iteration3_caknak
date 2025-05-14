"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function ScanEmailPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<"safe" | "risky" | null>(null);
  const [showCrystal, setShowCrystal] = useState(false);


  interface CheckEmailResponse {
    breached: boolean;
  }

  const handleScan = async () => {
    if (!email) return;
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
      const data = (await response.json()) as CheckEmailResponse;

      if (data.breached) {
        setResult("risky");
      } else {
        setResult("safe");
      }
      setShowCrystal(true); 
    } catch (error) {
      console.error("Scan error:", error);
    } finally {
      setLoading(false);
    }
  };

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

      <div className="flex flex-col items-center justify-center flex-grow text-center p-6">

        {/* ===== Top ===== */}
        <h1 className="text-4xl text-[#5b4636] font-extrabold mb-4">
          Check Your Email Security
        </h1>
        <p className="text-[#5b4636] max-w-lg text-base md:text-lg mb-8">
          Enter your email to scan for hidden risks and data breaches.
        </p>

        {/* ===== Middle ===== */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          className="w-80 px-4 py-3 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 mb-4"
        />

        {/* security text */}
        <div className="mb-4 text-sm text-[#5b4636]">
          <p>
            Your data is <span className="text-xl text-yellow-700">secured</span> with encryption.
            <Link href="https://haveibeenpwned.com/Privacy" target="_blank">
              <span className="text-lg ml-1 underline text-yellow-700 hover:text-yellow-800">Learn More</span>
            </Link>
          </p>
          <p>Secure • Private • <span className="text-xl text-yellow-700">We don&apos;t store emails</span></p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
          onClick={handleScan}
          disabled={loading}
          className="px-8 py-3 rounded-xl font-bold text-xl text-[#5b4636] border-4 border-[#5b4636] bg-[url('/textures/parchment-texture.png')] bg-cover"
        >
          {loading ? "Scanning..." : "Scan"}
        </motion.button>

        {/* ===== Crystal Ball (Only controls showCrystal) ===== */}
        <AnimatePresence>
          {showCrystal && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.8 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 12 }}
              className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
            >
              <div className="relative">
                <Image
                  src="/main/crystal_orb.png"
                  alt="Crystal Orb"
                  width={300}
                  height={300}
                  className="opacity-90 drop-shadow-xl"
                />
                <motion.div
                  className={`absolute left-1/2 top-4/11 transform -translate-x-1/2 -translate-y-1/2 text-center ${
                    result === "safe" ? "text-green-700" : "text-red-700"
                  } font-bold`}
                  style={{
                    fontSize: "2.5rem",
                    textShadow: "0 0 8px white",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {result === "safe" ? "SAFE" : "RISKY"}
                </motion.div>

                {/* Close Crystal Ball Button */}
                <button
                  onClick={() => setShowCrystal(false)}
                  className="absolute top-12 right-12 text-[#5b4636] bg-white/70 rounded-full p-1 border-4 border-[#5b4636] hover:bg-yellow-100 shadow"
                  style={{ pointerEvents: "auto" }}
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== Bottom: Result Content ===== */}
        {result && (
          <motion.div
            key={result}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 w-full max-w-md p-6 rounded-lg border-4 border-[#5b4636] bg-[#f9f4e6] shadow-lg text-left"
          >
            {result === "safe" ? (
              <>
                <h2 className="text-xl font-bold text-green-700 mb-2">✅ Your email is safe!</h2>
                <ul className="list-disc ml-5 text-[#5b4636] space-y-1">
                  <li>Keep using strong, unique passwords</li>
                  <li>Enable two-factor authentication where possible</li>
                  <li>Stay cautious with suspicious emails</li>
                </ul>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-red-700 mb-2">⚠️ Risk detected! Protect your account!</h2>
                <ul className="list-disc ml-5 text-[#5b4636] space-y-1">
                  <li>Change your passwords immediately</li>
                  <li>Enable two-factor authentication</li>
                  <li>Monitor for suspicious activities</li>
                </ul>
              </>
            )}
          </motion.div>
        )}
      </div>

      <Footer />
    </main>
  );
}
