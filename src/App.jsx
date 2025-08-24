import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Linkedin } from "lucide-react";
import profilePic from "./unnamed (2).jpg";

export default function App() {
  const [openSection, setOpenSection] = useState("profile");
  const [activeSection, setActiveSection] = useState("profile");

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

  // Observe which section is currently in view for active navbar highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const Section = ({ id, title, children }) => {
    const isOpen = openSection === id;
    return (
      <section id={id} className="scroll-mt-28 mb-6">
        <div className="bg-gradient-to-r from-white to-blue-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white rounded-2xl hover:bg-blue-50 transition"
            onClick={() => setOpenSection(isOpen ? null : id)}
            aria-expanded={isOpen}
            aria-controls={id + "-panel"}
          >
            <h3 className="text-lg font-semibold text-blue-700">{title}</h3>
            <ChevronDown
              className={"transition-transform " + (isOpen ? "rotate-180" : "rotate-0")}
            />
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={id + "-panel"}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="px-5 pb-5 pt-1 text-gray-700"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="font-bold text-lg text-blue-700">Panagiotis Gkantzos</div>
          <div className="flex items-center gap-3">
            {sections.map((s) => (
              <a
                key={s.id}
                href={"#" + s.id}
                onClick={handleNavClick(s.id)}
                className={`text-sm px-2 py-1 rounded hover:underline transition ${
                  activeSection === s.id ? "text-blue-600 font-semibold" : "text-gray-700"
                }`}
              >
                {s.label}
              </a>
            ))}
            <a
              href="/cv.pdf"
              download="Panagiotis-Gkantzos-CV.pdf"
              className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition"
              title="Download CV as PDF"
            >
              <Download size={16} />
              PDF-CV
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-white to-blue-50 border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-500/20 hover:scale-105 hover:shadow-lg transition-transform duration-300"
            />
            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold text-gray-800">Panagiotis Gkantzos</h1>
              <p className="text-blue-600 font-medium">
                ServiceNow Technical Consultant & Developer
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                <a
                  href="https://www.linkedin.com/in/panagiotis-gkantzos-341909b5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                  title="Visit LinkedIn Profile"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="mailto:panosgaz3@gmail.com"
                  className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100 transition"
                  title="Send Email"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <Section id="profile" title="Profile">
          <p className="leading-relaxed indent-8 mb-2">
            I am a highly motivated and results-driven Computer Engineer with a Master's degree, specializing in cutting-edge technology and software development. Currently, I am proud to be part of the consulting team at{" "}
            <a
              href="https://www.performance.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Performance Technologies S.A.
            </a>
            , where I excel as a skilled ServiceNow Developer.
          </p>
          <p className="leading-relaxed indent-8 mb-2">
            My passion for technology and innovation has driven my academic and professional journey. My educational background in Computer Engineering has equipped me with a comprehensive understanding of software design, system architecture, and programming languages.
          </p>
          <p className="leading-relaxed indent-8 mb-2">
            As a ServiceNow Developer, I thrive in crafting robust solutions that streamline business processes and enhance overall efficiency. My expertise allows me to leverage the full potential of the ServiceNow platform, ensuring seamless integration and optimal performance for our clients' IT service management needs.
          </p>
          <p className="leading-relaxed indent-8 mb-2">
            I approach every project with a combination of analytical thinking, creativity, and attention to detail. My ability to analyze complex problems and develop innovative solutions has enabled me to deliver exceptional results for clients and make a significant impact within my team at{" "}
            <a
              href="https://www.performance.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Performance Technologies S.A.
            </a>
          </p>
          <p className="leading-relaxed indent-8 mb-2">
            Beyond my technical skills, I am also a collaborative team player, valuing open communication and actively contributing to a positive work environment. My adaptability and eagerness to learn make me quick to grasp new technologies and methodologies, fostering continuous improvement in my work and fostering a growth mindset.
          </p>
          <p className="leading-relaxed indent-8">
            Outside of my professional life, I enjoy staying up-to-date with industry trends and participating in tech-related events and workshops. I am always seeking opportunities to expand my knowledge and network with like-minded professionals, as I firmly believe that sharing knowledge and experiences are crucial to fostering innovation in the tech community.
          </p>
        </Section>

        {/* Certifications Section */}
        <Section id="certifications" title="Certifications">
          <ul className="list-disc ml-6 space-y-2">
            {[
              { name: "ServiceNow Certified System Administrator", file: "ServiceNow-CSA.pdf", short: "CSA" },
              { name: "ServiceNow Certified Implementation Specialist – IT Service Management", file: "ServiceNow-ITSM.pdf", short: "ITSM" },
              { name: "ServiceNow Certified Application Developer", file: "ServiceNow-CAD.pdf", short: "CAD" },
              { name: "ServiceNow Certified Implementation Specialist – Customer Service Management", file: "ServiceNow-CSM.pdf", short: "CSM" },
              { name: "ServiceNow Certified Implementation Specialist – Strategic Portfolio Management", file: "ServiceNow-SPM.pdf", short: "SPM" },
            ].map((cert) => (
              <li key={cert.short} className="flex items-center gap-2">
                {cert.name}{" "}
                <motion.a
                  whileHover={{ scale: 1.05, x: 3 }}
                  href={`/${cert.file}`}
                  download={cert.file}
                  className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
                  title={`Download ${cert.short} Certificate`}
                >
                  <Download size={14} />
                  <strong>({cert.short})</strong>
                </motion.a>
              </li>
            ))}
          </ul>
        </Section>

        {/* Education, Experience, Skills, Contact Sections remain unchanged but can adopt same subtle gradient style */}
        {/* ...same structure as before with gradient background and hover shadows */}
      </main>
    </div>
  );
}


