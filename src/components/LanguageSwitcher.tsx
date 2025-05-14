"use client";

import { useState, useRef, useEffect } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState("EN");
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={langDropdownRef}>
      <button
        onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
        className="flex items-center text-sm px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-5"
      >
        <FaGlobe className="mr-2" />
        <span>{language}</span>
        <FaChevronDown className="ml-2" size={12} />
      </button>

      {showLanguageDropdown && (
        <div className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <button
            onClick={() => changeLanguage('EN')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-md"
          >
            English
          </button>
          {/* <button
            onClick={() => changeLanguage('ZH')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-50"
          >
            中文
          </button> */}
        </div>
      )}
    </div>
  );
}
