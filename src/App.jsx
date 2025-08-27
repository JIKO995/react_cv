import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ChevronDown, Linkedin, Github } from "lucide-react";
import { Helmet } from "react-helmet-async"; // ✅ Updated import
import profilePic from "./unnamed (2).jpg";
// import AIChat from "./AIChat";

export default function App() {
  const [openSection, setOpenSection] = useState("profile");
  const [activeSection, setActiveSection] = useState("profile");
  const knowledge = `
Name: Panagiotis Gkantzos
Role: ServiceNow Technical Consultant & Developer
Education: Integrated MSc in Computer Engineering & Informatics, University of Patras, GPA: 6.62
Skills: ServiceNow ITSM, CSM, SPM, Application Development, UI/UX Customization, JavaScript, HTML, CSS, Python, SQL, Git, Jenkins, VS Code, Eclipse, Agile/Scrum, ITIL
Experience:
- Performance Technologies S.A.: ServiceNow Consultant & Developer | Jul 2024 – Present | Athens, Greece (Remote)
- Deloitte (DACC): ServiceNow Business Analyst & Developer | Oct 2022 – Jul 2024 | Patras, Greece (Hybrid)
Certifications: CSA, CAD, ITSM, CSM, SPM
`;

  // ✅ Memoize sections for performance
  const sections = useMemo(() => [
    { id: "profile", label: "Profile" },
    { id: "certifications", label: "Certifications" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ], []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenSection(id);
  };

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
  }, [sections]);

  // ✅ Accessible Section Component
  const Section = ({ id, title, children }) => {
    const isOpen = openSection === id;
    return (
      <section id={id} className="scroll-mt-28 mb-6" aria-labelledby={`${id}-header`}>
        <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
          <button
            id={`${id}-header`}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white rounded-2xl hover:bg-blue-100 transition"
            onClick={() => setOpenSection(isOpen ? null : id)}
            aria-expanded={isOpen}
            aria-controls={`${id}-panel`}
          >
            <h3 className="text-lg font-semibold text-blue-800">{title}</h3>
            <ChevronDown
              className={"transition-transform " + (isOpen ? "rotate-180" : "rotate-0")}
            />
          </button>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                id={`${id}-panel`}
                role="region"
                aria-labelledby={`${id}-header`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
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
    <>
      {/* ✅ SEO Metadata using Helmet */}
      <Helmet>
        <title>Panagiotis Gkantzos | ServiceNow Consultant & Developer</title>
        <meta
          name="description"
          content="Portfolio of Panagiotis Gkantzos - ServiceNow Technical Consultant & Developer, showcasing skills, certifications, education, and experience."
        />
        <meta name="keywords" content="ServiceNow, Developer, Consultant, ITSM, CSM, SPM, Panagiotis Gkantzos" />
        <meta name="author" content="Panagiotis Gkantzos" />
      </Helmet>

      <div className="bg-gradient-to-b from-gray-100 via-white to-gray-100 min-h-screen text-gray-800">
        {/* Navbar */}
        <nav
          className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
          role="navigation"
          aria-label="Main Navigation"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
            <div className="font-bold text-lg text-blue-700">Panagiotis Gkantzos</div>
            <div className="flex items-center gap-3 relative">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={"#" + s.id}
                  onClick={handleNavClick(s.id)}
                  className={`text-sm px-2 py-1 rounded relative hover:underline transition ${
                    activeSection === s.id ? "text-blue-600 font-semibold" : "text-gray-700"
                  }`}
                >
                  {s.label}
                  {/* ✅ Animated Active Indicator */}
                  {activeSection === s.id && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-600 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
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

        <main className="max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-white to-blue-50 border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-lg transition-shadow duration-300"
          >
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
                    href="https://github.com/JIKO995"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                    title="Visit Github Profile"
                  >
                    <Github size={16} />
                    Github
                  </a>
                  <a
                    href="mailto:panosgaz3@gmail.com"
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition"
                    title="Send Email"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

       {/* Profile Section */}
<Section id="profile" title="Profile">
  <p className="leading-relaxed indent-8 mb-2">
    I am a Computer Engineer with a Master's degree and expertise in enterprise software development. As a ServiceNow Developer at{" "}
    <a
      href="https://www.performance.gr/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-800 underline"
    >
      Performance Technologies S.A.
    </a>
    , I design and implement solutions that streamline business processes and enhance IT service management efficiency.
  </p>
  <p className="leading-relaxed indent-8 mb-2">
    I excel at analyzing complex challenges and delivering innovative, scalable solutions while fostering collaboration and driving results. With a strong foundation in system architecture, software design, and programming, I ensure that every project achieves maximum impact.
  </p>
  <p className="leading-relaxed indent-8">
    Passionate about continuous learning and technological innovation, I stay at the forefront of industry trends and actively participate in professional events, leveraging my knowledge to drive excellence and innovation in every engagement.
  </p>
</Section>

          {/* Certifications Tree */}
<Section id="certifications" title="Certifications">
  <ul className="list-none ml-4 space-y-3 border-l border-gray-300 pl-4">
    {/* Root: System Administrator */}
    <li className="relative">
      <span className="font-semibold">System Administrator</span>
      <ul className="list-none ml-6 mt-2 space-y-2 border-l border-gray-200 pl-4">
        <li className="flex items-center gap-2">
          Certified System Administrator
          <motion.a
            whileHover={{ scale: 1.05, x: 3 }}
            href="/ServiceNow-CSA.pdf"
            download="ServiceNow-CSA.pdf"
            className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            title="Download CSA Certificate"
          >
            <Download size={14} />
            <strong>(CSA)</strong>
          </motion.a>
        </li>
      </ul>
    </li>

    {/* Branch 1: Developer */}
    <li className="relative">
      <span className="font-semibold">Developer</span>
      <ul className="list-none ml-6 mt-2 space-y-2 border-l border-gray-200 pl-4">
        <li className="flex items-center gap-2">
          Certified Application Developer
          <motion.a
            whileHover={{ scale: 1.05, x: 3 }}
            href="/ServiceNow-CAD.pdf"
            download="ServiceNow-CAD.pdf"
            className="inline-flex items-center gap-1 text-sm px-3 py-1 rounded-full border border-gray-300 hover:bg-gray-100 transition"
            title="Download CAD Certificate"
          >
            <Download size={14} />
            <strong>(CAD)</strong>
          </motion.a>
        </li>
      </ul>
    </li>

    {/* Branch 2: Implementation Specialist */}
    <li className="relative">
      <span className="font-semibold">Implementation Specialist</span>
      <ul className="list-none ml-6 mt-2 space-y-2 border-l border-gray-200 pl-4">
        {[
          { name: "IT Service Management", file: "ServiceNow-ITSM.pdf", short: "ITSM" },
          { name: "Customer Service Management", file: "ServiceNow-CSM.pdf", short: "CSM" },
          { name: "Strategic Portfolio Management", file: "ServiceNow-SPM.pdf", short: "SPM" },
        ].map((cert) => (
          <li key={cert.short} className="flex items-center gap-2">
            Certified – {cert.name}
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
    </li>
  </ul>
</Section>

          {/* Education */}
<Section id="education" title="Education">
  <div className="space-y-2">
    <p className="font-semibold text-blue-700">
      <a 
        href="https://www.ceid.upatras.gr/en/home/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:underline"
      >
        Integrated MSc in Computer Engineering & Informatics
      </a>
    </p>
    <p className="text-sm text-gray-600">
      <a 
        href="https://www.upatras.gr/en/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:underline"
      >
        University of Patras
      </a> 
      {" "} | 2015 – 2021 | GPA: 6.62
    </p>
    <ul className="list-disc ml-6 space-y-1">
      <li className="text-gray-700">Focused on system design, software architecture, and programming languages.</li>
      <li className="text-gray-700">Completed projects involving automation, cloud computing, and software development.</li>
    </ul>
  </div>
</Section>
          
          {/* Experience */}
<Section id="experience" title="Professional Experience">
  <div className="space-y-5">
    {/* Job 1 */}
    <div>
      <p className="font-semibold text-blue-700 flex items-center gap-2">
        <img
            src="/logos/performance-tech.png"
             alt="Performance Technologies Logo"
             className="w-5 h-5 object-contain"
         />
        <a 
          href="https://www.performance.gr/en/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline"
        >
          Performance Technologies S.A.
        </a>
        <span className="text-gray-700 font-normal">| Athens, Greece (Remote)</span>
      </p>
      <p className="text-sm text-gray-600 italic">
        ServiceNow Consultant & Developer | Jul 2024 – Present
      </p>
      <ul className="list-disc ml-6 space-y-1 text-gray-700">
        <li>Lead ServiceNow solution implementations for ITSM, CSM, and SPM needs.</li>
        <li>Configuration and customization of ServiceNow modules.</li>
        <li>Develop workflows, UI/UX components, and business rules.</li>
      </ul>
    </div>

    {/* Job 2 */}
    <div>
      <p className="font-semibold text-blue-700 flex items-center gap-2">
        {/* Icon/Logo Placeholder */}
        <img 
          src="/logos/deloitte.png"
          alt="Deloitte Logo" 
          className="w-5 h-5 object-contain"
        />
        <a 
          href="https://www.deloitte.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline"
        >
          Deloitte (DACC)
        </a>
        <span className="text-gray-700 font-normal">| Patras, Greece (Hybrid)</span>
      </p>
      <p className="text-sm text-gray-600 italic">
        ServiceNow Business Analyst & Developer | Oct 2022 – Jul 2024
      </p>
      <ul className="list-disc ml-6 space-y-1 text-gray-700">
        <li>Gathered requirements and translated them into technical specifications.</li>
        <li>Conducted workshops for ITSM solution optimization.</li>
        <li>Customized ServiceNow modules: Incident, Change, Service Catalog.</li>
      </ul>
    </div>
  </div>
</Section>
         {/* Skills */}
<Section id="skills" title="Technical Skills">
  <div className="space-y-2 text-gray-700">
    <div><strong>ServiceNow:</strong> ITSM, CSM, SPM, Application Development, UI/UX Customization</div>
    <div><strong>Programming & Scripting:</strong> JavaScript, Python, HTML5, CSS3, SQL</div>
    <div><strong>Tools & Platforms:</strong> Git, Jenkins, VS Code, Eclipse</div>
    <div><strong>Methodologies:</strong> Agile/Scrum, ITIL Framework, DevOps Practices</div>
  </div>
</Section>

          {/* Contact */}
          <Section id="contact" title="Contact">
            <div className="space-y-2 text-gray-700">
              <div>
                <strong>Email:</strong>{" "}
                <a href="mailto:panosgaz3@gmail.com" className="underline">panosgaz3@gmail.com</a>
              </div>
              <div>
                <strong>Phone:</strong>{" "}
                <span className="text-sm text-gray-600">+30 6985959766</span>
              </div>
            </div>
{/*           </Section>
          {/* --- AI Chat Component --- */}
{/* <AIChat knowledge={knowledge} />
        </main>
      </div> */} */}
    </>
  );
}
