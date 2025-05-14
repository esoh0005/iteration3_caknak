"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "~/components/LanguageSwitcher";
import { usePathname } from 'next/navigation';


export default function TopNav() {
  const [hoveredNavItem, setHoveredNavItem] = useState<string | null>(null);
  const menuItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [menuPositions, setMenuPositions] = useState<Record<string, number>>({});
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();


  const navItems = [
    {
      label: 'HOME',
      href: '/home',
      submenu: [
        { label: 'Home', href: '/home', description: 'Welcome to caKnak' }
      ]
    },
    {
      label: 'CHECK',
      href: '/check',
      submenu: [
        { label: 'Scan Email', href: '/check/scan-email', description: 'Verify if your email has been breached' },
        { label: 'Phishing Detection', href: '/check/phishing-detection', description: 'Tools to identify phishing attempts' },
        { label: 'Password Checker', href: '/check/password-checker', description: 'Check the strength of your password' }
      ]
    },
    {
      label: 'EDUCATE',
      href: '/educate',
      submenu: [
        { label: 'Decode Danger', href: '/educate/decode-danger', description: 'Explore real threats through data and story' },
        { label: 'Recovery Steps', href: '/educate/recovery-steps', description: 'Step - by - step on info leak response, account security & loss prevention' },
        { label: 'Phishing Prevention', href: '/educate/phishing-prevention', description: 'Learn phishing trap ID, anti - fraud skills, secure personal info' },
        { label: 'Phishing Game', href: '/educate/phishing-game', description: 'Test your phishing detection skills in an interactive game' }
      ]
    },
    {
      label: 'TEST',
      href: '/test',
      submenu: [
        { label: 'Phishing Simulator', href: '/test/phishing-simulator', description: 'Immerse yourself' },
        { label: 'Security Quiz', href: '/test/security-quiz', description: 'Test your security knowledge' }
      ]
    },
  ];

  useEffect(() => {
    const positions: Record<string, number> = {};
    Object.entries(menuItemRefs.current ?? {}).forEach(([key, el]) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        positions[key] = rect.left;
      }
    });
    setMenuPositions(positions);
  }, [hoveredNavItem]);

  const handleMenuItemEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setHoveredNavItem(label);
  };

  const handleMenuItemLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      const dropdown = document.getElementById(`dropdown-${hoveredNavItem}`);
      if (!dropdown?.matches(":hover")) {
        setHoveredNavItem(null);
      }
    }, 300);
  };

  const isActive = (label: string) => {
    if (label === 'CHECK') return pathname.startsWith('/check');
    if (label === 'EDUCATE') return pathname.startsWith('/educate');
    if (label === 'TEST') return pathname.startsWith('/test');
    return pathname.startsWith('/home');
  };

  return (
    <main>
      <header className="pt-8 relative">
        <div className="absolute right-8 top-4">
          <LanguageSwitcher />
        </div>

        <Link href="/home" className="text-center">
          <h1 className="text-6xl text-[#5b4636]" style={{ fontFamily: "'Great', cursive" }}>caKnak</h1>
        </Link>

        <div className="mb-4"/>

        <div className="container mx-auto px-6 border-b border-[#5b4636]">
          <nav className="flex justify-center space-x-24 relative">
            {navItems.map((item, index) => (
              <div
                key={index}
                className={`relative ${isActive(item.label) ? 'border-b-4 border-yellow-700' : ''}`}
                ref={(el) => {
                  menuItemRefs.current[item.label] = el;
                }}
                onMouseEnter={() => handleMenuItemEnter(item.label)}
                onMouseLeave={handleMenuItemLeave}
              >
                  <span
                    className={`text-lg ${
                      isActive(item.label) ? 'text-yellow-700' : 'text-[#5b4636]'
                    } hover:text-yellow-700 cursor-default`}
                    style={{ fontFamily: "var(--font-sniglet)" }}
                  >
                    {item.label}
                  </span>
              </div>
            ))}
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {hoveredNavItem && (
          <motion.div
            id={`dropdown-${hoveredNavItem}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute z-50 bg-[#fff7e6] shadow-lg rounded-lg px-4 py-4"
            style={{
              top: "16.5%",
              left: `${menuPositions[hoveredNavItem] ?? 0}px`,
              transform: "translateX(-50%)",
              marginTop: "0.5rem",
              minWidth: "240px",
            }}
            onMouseEnter={() => setHoveredNavItem(hoveredNavItem)}
            onMouseLeave={() => setHoveredNavItem(null)}
          >
            {navItems.find((item) => item.label === hoveredNavItem)?.submenu?.map((subItem, idx) => (
              <Link
                key={idx}
                href={subItem.href}
                className="block px-3 py-2 rounded-md hover:bg-[#f3e9d2]"
                style={{ color: "#5b4636", fontFamily: "var(--font-sniglet)" }}
              >
                <h3 className="font-semibold">{subItem.label}</h3>
                <p className="text-sm text-gray-600">{subItem.description}</p>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
