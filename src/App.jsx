import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Download, ChevronDown, Linkedin, Github } from "lucide-react";
import { Helmet } from "react-helmet-async";
import profilePic from "./unnamed (2).jpg";
import AIChat from "./AIChat";

export default function App() {
  const [openSection, setOpenSection] = useState("profile");
  const [activeSection, setActiveSection] = useState("profile");
  const navRefs = useRef({}); // store refs for navbar items
  const [openMenu, setOpenMenu] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });

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

  const sections = useMemo(
    () => [
      { id: "profile", label: "Profile" },
      { id: "certifications", label: "Certifications" },
      { id: "education", label: "Education" },
      { id: "experience", label: "Experience" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  // click handler for desktop links (prevents default, scrolls smoothly)
  const handleNavClick = (id) => (e) => {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpenSection(id);    // open accordion
    setActiveSection(id);  // highlight immediately
    setOpenMenu(false);    // close mobile menu if open
  };

  // wheel-based section navigation (section-by-section)
  useEffect(() => {
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;
      isScrolling = true;

      const currentIndex = sections.findIndex((s) => s.id === activeSection);

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        const nextId = sections[currentIndex + 1].id;
        document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(nextId);
        setOpenSection(nextId);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        const prevId = sections[currentIndex - 1].id;
        document.getElementById(prevId)?.scrollIntoView({ behavior: "smooth" });
        setActiveSection(prevId);
        setOpenSection(prevId);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 600); // match smooth scroll duration
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, sections]);

  // scroll-based active-section detection (fallback / keeps nav in sync while user scrolls)
  useEffect(() => {
    const handleScroll = () => {
      let current = sections[0].id;
      const offset = 120; // px from top to consider section active

      for (let section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top - offset <= 0) {
          current = section.id;
        } else {
          break;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // scroll progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // update underline position when activeSection changes
  useEffect(() => {
    const el = navRefs.current[activeSection];
    if (el) {
      setUnderlineStyle({ width: el.offsetWidth, left: el.offsetLeft });
    } else {
      setUnderlineStyle({ width: 0, left: 0 });
    }
  }, [activeSection]);

  // Section component with accordion + accessibility
  const Section = ({ id, title, children }) => {
    const isOpen = openSection === id;
    const toggle = () => {
      setOpenSection(isOpen ? null : id);
      setActiveSection(id); // ensure nav highlight updates even without scrolling
    };

    return (
      <motion.section
        id={id}
        className="scroll-mt-28 mb-6"
        aria-labelledby={`${id}-header`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
          <button
            id={`${id}-header`}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-gray-50 rounded-2xl hover:bg-indigo-50 transition"
            onClick={toggle}
            aria-expanded={isOpen}
            aria-controls={`${id}-panel`}
          >
            <h3 className="text-lg font-semibold text-indigo-800">{title}</h3>
            <ChevronDown className={"transition-transform " + (isOpen ? "rotate-180" : "rotate-0")} />
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
      </motion.section>
    );
  };

  return (
    <>
      <Helmet>
  <title>Panagiotis Gkantzos | ServiceNow Consultant & Developer</title>
  <meta
    name="description"
    content="Panagiotis Gkantzos - ServiceNow Technical Consultant & Developer. Showcasing skills, certifications, education, and experience in ITSM, CSM, SPM, and application development."
  />
  <meta
    name="keywords"
    content="ServiceNow, ITSM, CSM, SPM, Developer, Consultant, Panagiotis Gkantzos, Certifications, Education, Professional Experience, Technical Skills"
  />
  <meta name="author" content="Panagiotis Gkantzos" />
</Helmet>
      <div className="bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen text-gray-800">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50/90 backdrop-blur-md border-b border-gray-300 shadow-md">
          <div className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 relative">
            {/* Brand */}
            <div className="font-bold text-lg text-indigo-700">Panagiotis Gkantzos</div>

            {/* Links group: desktop + mobile */}
            <div className="flex items-center gap-3">
              {/* Desktop links */}
              <div className="hidden sm:flex items-center gap-3 relative">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={"#" + s.id}
                    ref={(el) => (navRefs.current[s.id] = el)}
                    onClick={handleNavClick(s.id)}
                    className={`text-sm px-2 py-1 relative transition ${
                      activeSection === s.id
                        ? "text-indigo-600 font-semibold"
                        : "text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 rounded transition-colors"
                    }`}
                  >
                    {s.label}
                  </a>
                ))}

                {/* underline for desktop */}
                <motion.div
                  className="absolute bottom-0 h-[2px] bg-indigo-600 rounded-full"
                  style={{
                    width: underlineStyle.width,
                    left: underlineStyle.left,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              </div>

              {/* Mobile menu */}
              <div className="sm:hidden relative">
                <button
                  onClick={() => setOpenMenu((prev) => !prev)}
                  aria-label="Toggle menu"
                  className="p-2 rounded-md border border-gray-300 bg-white"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <AnimatePresence>
                  {openMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 flex flex-col"
                    >
                      {sections.map((s) => (
                        <a
                          key={s.id}
                          href={"#" + s.id}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                            setOpenSection(s.id);
                            setActiveSection(s.id);
                            setOpenMenu(false);
                          }}
                          className={`px-4 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 ${
                            activeSection === s.id ? "font-semibold text-indigo-600" : ""
                          }`}
                        >
                          {s.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* CV button */}
            <a
              href="/cv.pdf"
              download="Panagiotis-Gkantzos-CV.pdf"
              className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-300 hover:bg-indigo-50 transition ml-3"
              title="Download CV as PDF"
            >
              <Download size={16} /> PDF-CV
            </a>
          </div>

          {/* Scroll progress (full width, fixed) */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 origin-left z-50"
            style={{ scaleX }}
          />
        </nav>

        {/* Main */}
        <main className="max-w-4xl mx-auto pt-28 pb-16 px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-gray-50 to-indigo-50 border border-gray-200 rounded-2xl shadow-sm p-6 mb-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img
                src={profilePic}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover ring-4 ring-indigo-500/20 hover:scale-105 hover:shadow-lg transition-transform duration-300"
              />
              <div className="flex-1 space-y-2">
                <h1 className="text-2xl font-bold text-gray-800">
                     Panagiotis Gkantzos
                     <span className="block text-indigo-600 font-medium text-base">ServiceNow Technical Consultant & Developer</span>
                     </h1>

                <div className="flex flex-wrap gap-2 mt-1">
                  <a
                    href="https://www.linkedin.com/in/panagiotis-gkantzos-341909b5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                    title="Visit LinkedIn Profile"
                  >
                    <Linkedin size={16} /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/JIKO995"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                    title="Visit Github Profile"
                  >
                    <Github size={16} /> Github
                  </a>
                  <a
                    href="mailto:panosgaz3@gmail.com"
                    className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                    title="Send Email"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* === SECTIONS === */}

          <Section id="profile" title="Profile">
            <p className="leading-relaxed indent-8 mb-2">
              I am a Computer Engineer with a Master's degree and expertise in enterprise software development. As a ServiceNow Developer at{" "}
              <a
                href="https://www.performance.gr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-800 underline"
              >
                Performance Technologies S.A.
              </a>
              , I design and implement solutions that streamline business processes and enhance IT service management efficiency.
            </p>
            <p className="leading-relaxed indent-8 mb-2">
              I excel at analyzing complex challenges and delivering innovative, scalable solutions while fostering collaboration and driving results. With a strong foundation in system architecture, software design, and programming, I ensure that every project achieves maximum impact.
            </p>
            <p className="leading-relaxed indent-8">Passionate about continuous learning and technological innovation, I stay at the forefront of industry trends and actively participate in professional events.</p>
          </Section>

          <Section id="certifications" title="Certifications">
            <ul className="list-none ml-4 space-y-3 border-l border-gray-300 pl-4">
              {/* System Administrator */}
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
                    >
                      <Download size={14} />
                      <strong>(CSA)</strong>
                    </motion.a>
                  </li>
                </ul>
              </li>

              {/* Developer */}
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
                    >
                      <Download size={14} />
                      <strong>(CAD)</strong>
                    </motion.a>
                  </li>
                </ul>
              </li>

              {/* Implementation Specialist */}
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

          <Section id="education" title="Education">
            <div className="space-y-2">
              <p className="font-semibold text-indigo-700">
                <a href="https://www.ceid.upatras.gr/en/home/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Integrated MSc in Computer Engineering & Informatics
                </a>
              </p>
              <p className="text-sm text-gray-600">
                <a href="https://www.upatras.gr/en/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  University of Patras
                </a>{" "}
                | 2015 – 2021 | GPA: 6.62
              </p>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li>Focused on system design, software architecture, and programming languages.</li>
                <li>Completed projects involving automation, cloud computing, and software development.</li>
              </ul>
            </div>
          </Section>

          <Section id="experience" title="Professional Experience">
            <div className="space-y-5">
              <div>
                <p className="font-semibold text-indigo-700 flex items-center gap-2">
                  <img src="/logos/performance-tech.png" alt="Performance Technologies Logo" className="w-5 h-5 object-contain" />
                  <a href="https://www.performance.gr/en/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Performance Technologies S.A.
                  </a>
                  <span className="text-gray-700 font-normal">| Athens, Greece (Remote)</span>
                </p>
                <p className="text-sm text-gray-600 italic">ServiceNow Consultant & Developer | Jul 2024 – Present</p>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  <li>Lead ServiceNow solution implementations for ITSM, CSM, and SPM needs.</li>
                  <li>Configuration and customization of ServiceNow modules.</li>
                  <li>Develop workflows, UI/UX components, and business rules.</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-indigo-700 flex items-center gap-2">
                  <img src="/logos/deloitte.png" alt="Deloitte Logo" className="w-5 h-5 object-contain" />
                  <a href="https://www.deloitte.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Deloitte (DACC)
                  </a>
                  <span className="text-gray-700 font-normal">| Patras, Greece (Hybrid)</span>
                </p>
                <p className="text-sm text-gray-600 italic">ServiceNow Business Analyst & Developer | Oct 2022 – Jul 2024</p>
                <ul className="list-disc ml-6 space-y-1 text-gray-700">
                  <li>Gathered requirements and translated them into technical specifications.</li>
                  <li>Conducted workshops for ITSM solution optimization.</li>
                  <li>Customized ServiceNow modules: Incident, Change, Service Catalog.</li>
                </ul>
              </div>
            </div>
          </Section>

          <Section id="skills" title="Technical Skills">
            <div className="space-y-2 text-gray-700">
              <div><strong>ServiceNow:</strong> ITSM, CSM, SPM, Application Development, UI/UX Customization</div>
              <div><strong>Programming & Scripting:</strong> JavaScript, Python, HTML5, CSS3, SQL</div>
              <div><strong>Tools & Platforms:</strong> Git, Jenkins, VS Code, Eclipse</div>
              <div><strong>Methodologies:</strong> Agile/Scrum, ITIL Framework, DevOps Practices</div>
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="space-y-2 text-gray-700">
              <div><strong>Email:</strong> <a href="mailto:panosgaz3@gmail.com" className="underline">panosgaz3@gmail.com</a></div>
              <div><strong>Phone:</strong> <span className="text-sm text-gray-600">+30 6985959766</span></div>
            </div>
          </Section>

          {/* Optional AI Chat (commented out) */}
          {/* <AIChat knowledge={knowledge} /> */}
        </main>
      </div>
    </>
  );
}




