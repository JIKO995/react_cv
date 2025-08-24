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
        {/* Sticky Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
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
          {/* Header Card */}
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
                  ServiceNow Technical Consultant & Developer
                </p>
                <a
                href="https://www.linkedin.com/in/panagiotis-gkantzos-341909b5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
                title="Visit LinkedIn Profile"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
                <a
                  href="mailto:panosgaz3@gmail.com"
                  className="mt-2 inline-block text-sm underline decoration-dotted underline-offset-4"
                >
                  
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

          <Section id="certifications" title="Certifications">
            <ul className="list-disc ml-6 space-y-1">
              <li className="flex items-center gap-2">
               ServiceNow Certified System Administrator 
               <a
                href="/CSA-certification.pdf"
                download="ServiceNow-CSA.pdf"
                className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded border border-gray-200 hover:bg-gray-100"
                title="Download CSA Certificate"
               >
              <Download size={14} />
              <strong>(CSA)</strong>
             </a>
            </li>
              <li>ServiceNow Certified Implementation Specialist – IT Service Management (ITSM)</li>
              <li>ServiceNow Certified Application Developer (CAD)</li>
              <li>ServiceNow Certified Implementation Specialist – Customer Service Management (CSM)</li>
              <li>ServiceNow Certified Implementation Specialist – Strategic Portfolio Management (SPM)</li>
            </ul>
          </Section>

          <Section id="education" title="Education">
            <div className="space-y-1">
              <p className="font-semibold">MSc in Computer Engineering & Informatics</p>
              <p className="text-sm text-gray-600">University of Patras | 2015 – 2021 | GPA: 6.62</p>
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
                <p className="text-sm text-gray-600 italic">
                  ServiceNow Consultant & Developer | Jul 2024 – Present
                </p>
                <ul className="list-disc ml-6 space-y-1 mt-2">
                  <li>Lead ServiceNow solution implementations for ITSM, CSM, and SPM needs.</li>
                  <li>Configuration and customization of ServiceNow modules.</li>
                  <li>Develop workflows, UI/UX components, and business rules.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Deloitte (DACC) | Patras, Greece (Hybrid)</p>
                <p className="text-sm text-gray-600 italic">
                  ServiceNow Business Analyst & Developer | Oct 2022 – Jul 2024
                </p>
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
              <div>
                <strong>ServiceNow:</strong> ITSM, CSM, SPM, Application Development, UI/UX Customization
              </div>
              <div>
                <strong>Programming:</strong> JavaScript, HTML5, CSS3, Python, SQL
              </div>
              <div>
                <strong>Tools:</strong> Git, Jenkins, VS Code, Eclipse
              </div>
              <div>
                <strong>Methodologies:</strong> Agile/Scrum, ITIL Framework
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
              <p className="text-sm text-gray-600">Athens / Patras, Greece</p>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}

