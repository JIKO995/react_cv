import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Download, ChevronDown } from "lucide-react";

export default function App() {
  const [dark, setDark] = useState(false);
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
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm">
          <button
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-gray-50/70 dark:bg-gray-900/40 rounded-2xl"
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
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        {/* Sticky Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800">
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
              <button
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setDark((d) => !d)}
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Print / Save as PDF"
              >
                <Download size={16} />
                PDF
              </button>
            </div>
          </div>
        </nav>

        {/* Main */}
        <main className="max-w-4xl mx-auto pt-28 pb-16 px-4">
          {/* Header Card */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop"
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover ring-4 ring-blue-500/20 hover:scale-105 transition-transform"
              />
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Panagiotis Gkantzos</h1>
                <p className="text-blue-600 dark:text-blue-400">ServiceNow Consultant & Developer</p>
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
            <p className="leading-relaxed">
              Highly motivated and results-driven Computer Engineer with a Master’s degree in Computer Engineering & Informatics. Specializing in ServiceNow development, IT service management, and business process automation.
            </p>
          </Section>

          <Section id="certifications" title="Certifications">
            <ul className="list-disc ml-6 space-y-1">
              <li>ServiceNow Certified System Administrator (CSA)</li>
              <li>ServiceNow Certified Implementation Specialist – IT Service Management (ITSM)</li>
              <li>ServiceNow Certified Application Developer (CAD)</li>
              <li>ServiceNow Certified Implementation Specialist – Customer Service Management (CSM)</li>
              <li>ServiceNow Certified Implementation Specialist – Strategic Portfolio Management (SPM)</li>
            </ul>
          </Section>

          <Section id="education" title="Education">
            <div className="space-y-1">
              <p className="font-semibold">MSc in Computer Engineering & Informatics</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">University of Patras | 2015 – 2021 | GPA: 6.62</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Focused on system design, software architecture, and programming languages.</li>
                <li>Completed projects involving automation, cloud computing, and software development.</li>
              </ul>
            </div>
          </Section>

          <Section id="experience" title="Professional Experience">
            <div className="space-y-5">
              <div>
                <p className="font-semibold">Performance Technologies S.A. | Athens, Greece (Remote)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">ServiceNow Consultant & Developer | Jul 2024 – Present</p>
                <ul className="list-disc ml-6 space-y-1 mt-2">
                  <li>Lead ServiceNow solution implementations for ITSM, CSM, and SPM needs.</li>
                  <li>Configuration and customization of ServiceNow modules.</li>
                  <li>Develop workflows, UI/UX components, and business rules.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Deloitte (DACC) | Patras, Greece (On-site)</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">ServiceNow Business Analyst & Developer | Oct 2022 – Jul 2024</p>
                <ul className="list-disc ml-6 space-y-1 mt-2">
                  <li>Gathered requirements and translated them into technical specifications.</li>
                  <li>Conducted workshops for ITSM solution optimization.</li>
                  <li>Customized ServiceNow modules: Incident, Change, Service Catalog.</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="skills" title="Technical Skills">
            <div className="space-y-2">
              <div><strong>ServiceNow:</strong> ITSM, CSM, SPM, Application Development, UI/UX Customization</div>
              <div><strong>Programming:</strong> JavaScript, HTML5, CSS3, Python, SQL</div>
              <div><strong>Tools:</strong> Git, Jenkins, VS Code, Eclipse</div>
              <div><strong>Methodologies:</strong> Agile/Scrum, ITIL Framework</div>
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="space-y-2">
              <div><strong>Email:</strong> <a href="mailto:panosgaz3@gmail.com" className="underline">panosgaz3@gmail.com</a></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Athens / Patras, Greece</p>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

