"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, AlertTriangle, CheckCircle2, CheckCircle, XCircle, ChevronRight, X } from "lucide-react";
import TopNav from "~/components/TopNav";
import Footer from "~/components/Footer";

const SAFETY_RECOMMENDATIONS = [
  "Verify sender identity before clicking links",
  "Visit official sites directly instead of via email links",
  "Avoid sharing sensitive info unless confirmed secure",
];

const EXAMPLES = [
  {
    title: 'Hotmail to Outlook Account Upgrade Scam',
    content: `Dear User,\nAll Hotmail customers have been upgraded to Outlook.com. Your Hotmail Account services has expired.\nDue to our new system upgrade to Outlook. In order for it to remain active follow the link Sign in Re-activate your account to Outlook. https://account.live.com\nThanks,\nThe Microsoft account`,
  },
  {
    title: 'Fake Purchase Receipt',
    content: `Hi,\nThank you for your purchase of Apple iPhone 15 Pro - RM4,299.00\nIf you did not authorize this transaction, please cancel immediately:\nhttps://amaz0n-support.com/cancel\nAmazon Payments Team`,
  },
  {
    title: 'Bank Account Suspension (Urgent Action Required)',
    content: `Dear Customer,\nWe have detected unusual login attempts on your account and have temporarily suspended access for your protection.\nPlease verify your identity immediately to restore access:\nhttps://maybank-secure-login-reset.com/login\nFailure to verify within 24 hours will result in permanent suspension.\nThank you,\nMaybank Security Team`,
  },
  {
    title: 'You Won a Prize!',
    content: `Hello,\nYou are today's lucky winner!\nTo claim your FREE Apple iPad, please confirm your email and shipping details here:\nhttps://free-apple-ipad-giveaway.com\nHurry! This offer expires in 2 hours.\nApple Promo Team`,
  },
  {
    title: 'HR Payroll Update Scam',
    content: `Hello,\nDue to a recent update in our payroll system, we need all employees to reconfirm their direct deposit information.\nPlease fill in the form to avoid salary disruption:\nhttps://company-secure.com/hr-update\nHR Department`,
  },
];

const TABS = ["Email Content", "Phishy Email Examples"];

export default function PhishingDetection() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hoveredExample, setHoveredExample] = useState<number | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const [activeTab, setActiveTab] = useState("Email Content");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/phishing-detection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("API failed");
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError("Something went wrong");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Risk score bar color (red to green)
  const getRiskBarColor = (score: number) => {
    if (score < 40) return "bg-gradient-to-r from-red-400 via-yellow-300 to-green-400";
    if (score < 70) return "bg-gradient-to-r from-yellow-400 to-green-400";
    return "bg-gradient-to-r from-yellow-400 to-red-500";
  };

  // Main result icon and message
  const getResultIcon = (score: number) => {
    if (score < 40) return <CheckCircle className="w-10 h-10 text-green-600 mx-auto" />;
    if (score < 70) return <AlertTriangle className="w-10 h-10 text-yellow-600 mx-auto" />;
    return <XCircle className="w-10 h-10 text-red-600 mx-auto" />;
  };
  const getResultTitle = (score: number) => {
    if (score < 40) return "Low risk detected, but exercise caution";
    if (score < 70) return "Moderate risk detected";
    return "High risk: Likely phishing email";
  };
  const getResultDesc = (score: number) => {
    if (score < 40) return "Some potential risks found, but not conclusive for phishing.";
    if (score < 70) return "Several risk factors found. Be cautious and verify before acting.";
    return "This email is likely a phishing attempt. Do not click links or provide information.";
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

      {!result ? (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
          <h1 className="text-4xl text-[#5b4636] font-extrabold mb-4">
            Phishing Email Detection
          </h1>
          <p className="text-[#5b4636] max-w-lg mb-6">
            Analyse emails to detect potential phishing attempts and protect yourself from scams.
          </p>
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-[#f9f4e6] border-4 border-[#5b4636] rounded-lg shadow-lg p-6 flex flex-col h-full min-h-[600px] justify-between">
              {/* Centered Tab buttons */}
              <div className="flex justify-center mb-4">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    className={`px-4 py-2 font-bold rounded-t-lg border-b-2 transition-all duration-200 ${activeTab === tab ? 'border-[#e2b96f] bg-white/90 text-[#5b4636]' : 'border-transparent bg-transparent text-[#b6a07a] hover:bg-yellow-50'}`}
                    onClick={() => setActiveTab(tab)}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {/* Tab content */}
              {activeTab === "Email Content" ? (
                <textarea
                  id="email"
                  rows={16}
                  className="w-full flex-1 h-full px-4 py-3 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
                  placeholder="Paste the email content here..."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              ) : (
                <div className="flex flex-col gap-4 flex-1">
                  <h3 className="text-xl font-bold text-[#5b4636] mb-2">Select a Phishy Email Example</h3>
                  {EXAMPLES.map((example, idx) => (
                    <div
                      key={idx}
                      className="relative bg-white/80 border-2 border-[#e2b96f] rounded-lg shadow transition text-[#5b4636]"
                      style={{ minHeight: '56px' }}
                      onMouseEnter={() => setHoveredExample(idx)}
                      onMouseLeave={() => setHoveredExample(null)}
                    >
                      <button
                        type="button"
                        className="w-full text-left p-4 focus:outline-none"
                        onClick={() => { setEmail(example.content); setActiveTab('Email Content'); }}
                        tabIndex={0}
                      >
                        <span className="font-semibold">{example.title}</span>
                        {hoveredExample === idx && (
                          <div className="mt-2 whitespace-pre-line text-sm bg-white/90 border-t border-[#e2b96f] pt-2">
                            {example.content}
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {/* Analyse Email button always at the bottom */}
              {activeTab === "Email Content" && (
                <motion.button
                  whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-8 py-3 mt-4 rounded-xl font-bold text-xl text-[#5b4636] border-4 border-[#5b4636] bg-[url('/textures/parchment-texture.png')] bg-cover disabled:opacity-60"
                  onClick={handleSubmit}
                >
                  {isLoading ? "Analyse..." : "Analyse Email"}
                </motion.button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
          <div className={`w-full max-w-8xl px-2 md:px-25 ${result ? '' : 'max-w-10xl mx-auto'}`}>
            {result ? (
              <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 text-left min-h-[600px]">
                {/* Left: Detached input card with centered tabs */}
                <form
                  onSubmit={handleSubmit}
                  className="md:w-1/2 bg-[#f9f4e6] border-4 border-[#5b4636] rounded-lg shadow-lg p-6 mb-0 flex flex-col h-full min-h-[600px] justify-between"
                  style={{ height: '100%' }}
                >
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-center mb-4">
                      {TABS.map(tab => (
                        <button
                          key={tab}
                          className={`px-4 py-2 font-bold rounded-t-lg border-b-2 transition-all duration-200 ${activeTab === tab ? 'border-[#e2b96f] bg-white/90 text-[#5b4636]' : 'border-transparent bg-transparent text-[#b6a07a] hover:bg-yellow-50'}`}
                          onClick={() => setActiveTab(tab)}
                          type="button"
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                    {activeTab === "Email Content" ? (
                      <>
                        {/* No label above textarea */}
                        {isEditing ? (
                          <>
                            <textarea
                              id="email"
                              rows={16}
                              className="w-full flex-1 h-full px-4 py-3 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
                              placeholder="Paste the email content here..."
                              value={email}
                              onChange={e => setEmail(e.target.value)}
                              required
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                type="button"
                                className="px-4 py-2 rounded-lg bg-yellow-400 text-[#5b4636] font-bold border-2 border-[#5b4636] hover:bg-yellow-300"
                                onClick={() => setIsEditing(false)}
                              >
                                Done
                              </button>
                            </div>
                          </>
                        ) : (
                          <div className="relative flex flex-col flex-1 h-full">
                            <div className="whitespace-pre-wrap bg-white/60 border border-[#e2b96f] rounded-lg p-4 text-[#5b4636] text-sm flex-1 h-full">
                              {(() => {
                                const terms: string[] = [];
                                (result && result.risk_factors ? result.risk_factors : []).forEach((factor: string) => {
                                  const parts = factor.split(": ");
                                  if (parts.length > 1 && typeof parts[1] === 'string') {
                                    parts[1].split(",").forEach((t) => {
                                      const trimmed = t.trim();
                                      if (trimmed) terms.push(trimmed);
                                    });
                                  }
                                });
                                terms.sort((a, b) => b.length - a.length);
                                let highlighted = email;
                                terms.forEach((term) => {
                                  if (!term) return;
                                  const safeTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                  const regex = new RegExp(`(${safeTerm})`, 'gi');
                                  highlighted = highlighted.replace(regex, '<span class="text-gray-500 font-semibold bg-yellow-100">$1</span>');
                                });
                                return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
                              })()}
                            </div>
                            <button
                              type="button"
                              className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-yellow-400 text-[#5b4636] font-bold border-2 border-[#5b4636] hover:bg-yellow-300"
                              onClick={() => setIsEditing(true)}
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex flex-col gap-4 flex-1">
                        <h3 className="text-xl font-bold text-[#5b4636] mb-2">Select a Phishy Email Example</h3>
                        {EXAMPLES.map((example, idx) => (
                          <div
                            key={idx}
                            className="relative bg-white/80 border-2 border-[#e2b96f] rounded-lg shadow transition text-[#5b4636]"
                            style={{ minHeight: '56px' }}
                            onMouseEnter={() => setHoveredExample(idx)}
                            onMouseLeave={() => setHoveredExample(null)}
                          >
                            <button
                              type="button"
                              className="w-full text-left p-4 focus:outline-none"
                              onClick={() => { setEmail(example.content); setActiveTab('Email Content'); }}
                              tabIndex={0}
                            >
                              <span className="font-semibold">{example.title}</span>
                              {hoveredExample === idx && (
                                <div className="mt-2 whitespace-pre-line text-sm bg-white/90 border-t border-[#e2b96f] pt-2">
                                  {example.content}
                                </div>
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {!isEditing && activeTab === "Email Content" && (
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-8 py-3 mt-4 rounded-xl font-bold text-xl text-[#5b4636] border-4 border-[#5b4636] bg-[url('/textures/parchment-texture.png')] bg-cover disabled:opacity-60"
                    >
                      {isLoading ? "Analyse..." : "Analyse Email"}
                    </motion.button>
                  )}
                </form>
                {/* Right: Output card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:w-[100%] bg-[#f9f4e6] border-4 border-[#5b4636] rounded-lg shadow-lg p-8 flex flex-col h-full min-h-[600px] justify-between"
                  style={{ height: '100%' }}
                >
                  <div className="flex flex-col items-center mb-2">
                    {getResultIcon(result.risk_score)}
                    <h2 className="text-2xl font-bold text-[#222] mt-2 text-center">
                      {getResultTitle(result.risk_score)}
                    </h2>
                    <p className="text-[#5b4636] text-center mt-1">
                      {getResultDesc(result.risk_score)}
                    </p>
                  </div>

                  {/* Risk Score Bar */}
                  <div className="bg-white/80 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-semibold text-[#5b4636]">Risk Score</span>
                      <span className="text-2xl font-bold text-[#5b4636]">{result.risk_score}/100</span>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.risk_score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${getRiskBarColor(result.risk_score)}`}
                      />
                    </div>
                  </div>

                  {/* Potential Risk Factors & Safety Recommendations side by side */}
                  <div className="mb-6 flex flex-col md:flex-row gap-4">
                    {/* Potential Risk Factors */}
                    <div className="md:w-1/2 w-full">
                      <h3 className="text-xl font-bold text-[#5b4636] mb-3">Potential Risk Factors</h3>
                      {result.risk_factors && result.risk_factors.length > 0 ? (
                        <div className="space-y-2">
                          {result.risk_factors.map((factor: string, idx: number) => {
                            const [description, terms] = factor.split(': ');
                            return (
                              <div key={idx} className="bg-white/80 border-2 border-[#e2b96f] rounded-lg px-3 py-2 text-sm">
                                <span className="font-semibold text-[#5b4636]">{description}:</span>
                                <br />
                                <span className="text-gray-500">{terms}</span>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="bg-white/80 border-2 border-[#e2b96f] rounded-lg px-3 py-2 text-[#5b4636] text-sm">
                          No major risk factors detected.
                        </div>
                      )}
                    </div>
                    {/* Safety Recommendations */}
                    <div className="md:w-1/2 w-full">
                      <h3 className="text-xl font-bold text-[#5b4636] mb-3">Safety Recommendations</h3>
                      <ul className="space-y-2">
                        {SAFETY_RECOMMENDATIONS.map((rec, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[#5b4636] text-sm">
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Awareness Section */}
                  <div className="mb-0.1">
                    <h3 className="text-xl font-bold text-[#5b4636] mb-3">Enhance Your Awareness</h3>
                    <div className="bg-white/80 border-2 border-[#b6b6b6] rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="font-semibold text-[#5b4636] mb-1">Phishing Defense Basics</div>
                        <div className="text-[#5b4636] text-sm">Improve your protective knowledge with our comprehensive resources</div>
                      </div>
                      <button className="mt-3 md:mt-0 px-5 py-2 bg-[#a58a64] text-white rounded-lg font-semibold hover:bg-[#8c7350] transition">
                        Phishing Prevention Guide
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-x-8 gap-y-8 text-left min-h-[600px] relative">
                {/* Left: Input card */}
                <div className="relative md:w-1/2 flex flex-col h-full min-h-[600px]">
                  <form
                    onSubmit={handleSubmit}
                    className="bg-[#f9f4e6] border-4 border-[#5b4636] rounded-lg shadow-lg p-6 flex flex-col h-full min-h-[600px] justify-between"
                    style={{ height: '100%' }}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-2xl font-bold text-[#5b4636] mb-2"
                      >
                        Email Content
                      </label>
                      <textarea
                        id="email"
                        rows={16}
                        className="w-full h-64 px-4 py-3 rounded-lg border-4 border-[#5b4636] text-[#5b4636] bg-white/80 shadow-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-base"
                        placeholder="Paste the email content here..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05, y: -3, boxShadow: "0 0 20px #fde68a" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full px-8 py-3 rounded-xl font-bold text-xl text-[#5b4636] border-4 border-[#5b4636] bg-[url('/textures/parchment-texture.png')] bg-cover"
                    >
                      {isLoading ? "Analyse..." : "Analyse Email"}
                    </motion.button>
                  </form>
                </div>
              </div>
            )}

            {error && <p className="text-red-600 font-semibold mt-4">{error}</p>}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
} 