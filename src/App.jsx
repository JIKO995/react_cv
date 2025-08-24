import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Linkedin } from "lucide-react";
import profilePic from "./unnamed (2).jpg";

// Helper component for ServiceNow with green "o"
const ServiceNow = () => (
  <>
    ServiceN<span className="text-green-500 font-semibold">o</span>w
  </>
);

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
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-gray-50 rounded-2xl"
            onClick={() => setOpenSection(isOpen ? null : id)}
            aria-expanded={isOpen}
            aria-controls={id + "-panel"}
          >
            <h3 className="text-lg font-semibold">{title}</h3>
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
                className="px-5 pb-5 pt-1"
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
    <div>
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-3">
            <div className="font-bold">Panagiotis Gkantzos</div>
            <div className="flex items-center gap-3">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={"#" + s.id}
                  onClick={handleNavClick(s.id)}
                  className="text-sm px-2 py-1 rounded hover:underline"
                >
                  {s.label}
                </a>
              ))}
              <a
                href="/cv.pdf"
                download="Panagiotis-Gkantzos-CV.pdf"
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-100"
                title="Download CV as PDF"
              >
                <Download size={16} />
                PDF-CV
              </a>
            </div>
          </div>
        </nav>

        {/* Main */}
        <main className="max-w-4xl mx-auto pt-28 pb-16 px-4">
          {/* Header */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={profilePic}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-500/20 hover:scale-105 transition-transform"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Panagiotis Gkantzos</h1>
                <p className="text-blue-600">
                  <ServiceNow /> Technical Consultant & Developer
                </p>
                <a
                  href="https://www.linkedin.com/in/panagiotis-gkantzos-341909b5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 mt-2"
                  title="Visit LinkedIn Profile"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="mailto:panosgaz3@gmail.com"
                  className="mt-2 inline-block text-sm underline decoration-dotted underline-offset-4"
                >
                  panosgaz3@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Sections */}
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
              , where I excel as a skilled <ServiceNow /> Developer.
            </p>
            <p className="leading-relaxed indent-8 mb-2">
              My passion for technology and innovation has driven my academic and professional journey. My educational background in Computer Engineering has equipped me with a comprehensive understanding of software design, system architecture, and programming languages.
            </p>
            <p className="leading-relaxed indent-8 mb-2">
              As a <ServiceNow /> Developer, I thrive in crafting robust solutions that streamline business processes and enhance overall efficiency. My expertise allows me to leverage the full potential of the <ServiceNow /> platform.
            </p>
          </Section>

          <Section id="certifications" title="Certifications">
            <ul className="list-disc ml-6 space-y-2">
              {[
                { name: "System Administrator", abbr: "CSA", file: "/ServiceNow-CSA.pdf" },
                { name: "Implementation Specialist – IT Service Management", abbr: "ITSM", file: "/ServiceNow-ITSM.pdf" },
                { name: "Application Developer", abbr: "CAD", file: "/ServiceNow-CAD.pdf" },
                { name: "Implementation Specialist – Customer Service Management", abbr: "CSM", file: "/ServiceNow-CSM.pdf" },
                { name: "Implementation Specialist – Strategic Portfolio Management", abbr: "SPM", file: "/ServiceNow-SPM.pdf" },
              ].map((cert) => (
                <li key={cert.abbr} className="flex items-center gap-2">
                  <span>
                    <ServiceNow /> Certified {cert.name}{" "}
                  </span>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={cert.file}
                    download={cert.file.split("/")[1]}
                    className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded border border-gray-200 hover:bg-gray-100"
                  >
                    <Download size={14} />
                    <strong>({cert.abbr})</strong>
                  </motion.a>
                </li>
              ))}
            </ul>
          </Section>
          
          {/* Remaining sections */}
          <Section id="education" title="Education">
            <div className="space-y-1">
              <p className="font-semibold">MSc in Computer Engineering & Informatics</p>
              <p className="text-sm text-gray-600">University of Patras | 2015 – 2021 | GPA: 6.62</p>
            </div>
          </Section>

          <Section id="experience" title="Professional Experience">
            <div className="space-y-5">
              <div>
                <p className="font-semibold">Performance Technologies S.A. | Athens, Greece (Remote)</p>
                <p className="text-sm text-gray-600 italic">ServiceNow Consultant & Developer | Jul 2024 – Present</p>
              </div>
            </div>
          </Section>

          <Section id="skills" title="Technical Skills">
            <div className="space-y-2">
              <div>
                <strong><ServiceNow />:</strong> ITSM, CSM, SPM, Application Development, UI/UX Customization
              </div>
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="space-y-2">
              <div>
                <strong>Email:</strong>{" "}
                <a href="mailto:panosgaz3@gmail.com" className="underline">
                  panosgaz3@gmail.com
                </a>
              </div>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
