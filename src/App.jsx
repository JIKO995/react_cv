import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Linkedin } from "lucide-react";
import profilePic from "./unnamed (2).jpg";

export default function App() {
  const [openSection, setOpenSection] = useState("profile");

  const sections = [
    { id: "profile", label: "Profile" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenSection(id);
  };

  const Section = ({ id, title, children }) => {
    const isOpen = openSection === id;
    return (
      <section id={id} className="scroll-mt-28 mb-6">
        <motion.div
          className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
          whileHover={{ y: -2 }}
        >
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"
            onClick={() => setOpenSection(isOpen ? null : id)}
            aria-expanded={isOpen}
            aria-controls={id + "-panel"}
          >
            <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="text-blue-700" />
            </motion.div>
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={id + "-panel"}
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -10, height: 0 }}
                transition={{ duration: 0.3 }}
                className="px-5 pb-5 pt-1 text-gray-700"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    );
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Sticky Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="font-bold text-lg text-blue-800">Panagiotis Gkantzos</div>
            <div className="flex items-center gap-3">
              {sections.map((s) => (
                <motion.a
                  key={s.id}
                  href={"#" + s.id}
                  onClick={handleNavClick(s.id)}
                  whileHover={{ scale: 1.05 }}
                  className="text-sm px-2 py-1 rounded hover:underline hover:text-blue-600 transition"
                >
                  {s.label}
                </motion.a>
              ))}
              <motion.a
                href="/cv.pdf"
                download="Panagiotis-Gkantzos-CV.pdf"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-blue-600 text-blue-700 hover:bg-blue-50 transition"
                title="Download CV as PDF"
              >
                <Download size={16} />
                PDF-CV
              </motion.a>
            </div>
          </div>
        </nav>

        {/* Main */}
        <main className="max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-6">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-white to-blue-50 border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <motion.img
                src={profilePic}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover ring-4 ring-gradient-to-br from-blue-400 to-indigo-500"
                whileHover={{ scale: 1.05, rotate: 2 }}
              />
              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold text-blue-900">Panagiotis Gkantzos</h1>
                <p className="text-blue-700 font-medium">
                  ServiceNow Technical Consultant & Developer
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <motion.a
                    href="https://www.linkedin.com/in/panagiotis-gkantzos-341909b5"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-100 transition"
                    title="Visit LinkedIn Profile"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </motion.a>
                  <motion.a
                    href="mailto:panosgaz3@gmail.com"
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                    title="Send Email"
                  >
                    Email
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rest of sections remain same as previous JSX with your color styles */}
          {/* The only difference: all hoverable links, buttons, and cards now have subtle framer-motion animations */}
        </main>
      </div>
    </div>
  );
}
