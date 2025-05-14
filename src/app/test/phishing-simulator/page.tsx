'use client';

import React from 'react';
import PhishingSimulator from '~/app/_components/phishing-sim';
import { motion } from 'framer-motion';
import TopNav from '~/components/TopNav';
import Footer from '~/components/Footer';


// data for the tipu cards
const tipuData = [
  {
    letter: 'T',
    malay: 'Tidak akan rugi',
  },
  {
    letter: 'I',
    malay: 'Indah khabar dari rupa',
  },
  {
    letter: 'P',
    malay: 'Peluang hanya sekali',

  },
  {
    letter: 'U',
    malay: 'Untung besar',

  },
];

export default function DecodeDangerPage() {

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/textures/parchment-texture.png')",
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'var(--font-sniglet)',
      }}
    >
      <TopNav />
      
      {/* main content */}
      <section className="p-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
            className="bg-[#fefce8] border border-[#5b4636] px-8 py-6 mt-8 rounded-xl shadow-md max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-4xl text-[#5b4636] font-extrabold mb-4 text-center">
              🎓 Scholarship grants are{' '}
              <a
                href="https://www.investopedia.com/financial-edge/1012/common-scams-targeted-at-teens.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#D6AD69] transition-colors"
              >
                top 5
              </a>{' '}
              most common targeted at teens
            </h2>

            <p className="text-md md:text-lg text-[#5b4636] text-center">
              Try our <strong>Phishing Simulator 🎣</strong> 🎣 to know if you can evade it!
            </p>
          </motion.div>
          
          {/* simulator and side panels layout */}
          <div className="mt-12 flex flex-col md:flex-row gap-16 justify-center items-stretch">
            {/* left panel with steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#8F6854] border-2 border-[#DDA175] p-5 rounded-xl shadow-md md:w-64 flex flex-col"
            >
              <h3 className="text-xl text-[#ffffff] font-bold mb-4 text-center">Steps to use</h3>
              <ol className="text-[#FEEAD3] text-left space-y-3 flex-grow">
                <li className="flex items-start">
                  <span className="font-bold mr-2">1.</span> 
                  <span>Start a conversation with the fake scholarship officer</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">2.</span> 
                  <span>They&apos;ll ask for your personal details</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">3.</span> 
                  <span>Decide how much information to share</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-2">4.</span>
                  <span>After 3 messages, you&apos;ll get feedback on how well you did</span>
                </li>
              </ol>
              <div className="mt-4 text-center">
                <span className="text-sm italic text-[#FEEAD3]">Remember: Be cautious with your information!</span>
              </div>
            </motion.div>
            
            {/* center panel with simulator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-[420px]"
            >
              <PhishingSimulator />
            </motion.div>
            
            {/* right panel with tipu cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-[#8F6854] border-2 border-[#DDA175] p-5 rounded-xl shadow-md md:w-64 flex flex-col"
            >
              <h3 className="text-xl text-[#ffffff] font-bold mb-4 text-center">Warning Signs</h3>
              
              {/* flip cards container */}
              <div className="flex flex-col items-center space-y-8">
                {tipuData.map((item) => (
                  <div 
                    key={item.letter}
                    className="flip-card w-24 h-24"
                  >
                    <div className="flip-card-inner">
                      {/* front of card */}
                      <div className="flip-card-front bg-[#e9a95f] rounded-xl flex items-center justify-center">
                        <span className="text-white text-5xl font-bold">{item.letter}</span>
                      </div>
                      
                      {/* back of card */}
                      <div className="flip-card-back bg-[#f0b574] rounded-xl flex flex-col items-center justify-center p-3">
                        <p className="text-[#5b4636] font-semibold text-sm leading-tight">{item.malay}</p>
   
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-center text-[#FEEAD3] text-sm italic mt-2">
                  <p>Hover over each letter to see details</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* info box at the bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 max-w-3xl mx-auto bg-[rgba(254,252,232,0.9)] border border-[#5b4636] p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl text-[#5b4636] font-bold mb-2">Stay Safe from Phishing Scams</h3>
            <p className="text-[#5b4636] mb-4">
              Remember, legitimate organizations will never pressure you to share personal information through casual messages. Always verify the sender through official channels before sharing any personal details.
            </p>
 
          </motion.div>
        </div>
      </section>
      
      {/* styles for the flip cards */}
      <style jsx>{`
        .flip-card {
          perspective: 1000px;
          cursor: pointer;
        }
        
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div className="flex-grow" />
      <Footer />
    </main>
  );
}