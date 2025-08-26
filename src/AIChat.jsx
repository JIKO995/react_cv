import React, { useState, useRef, useEffect } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Static knowledge base extracted from your App.jsx
  const knowledge = `
Name: Panagiotis Gkantzos
Role: ServiceNow Technical Consultant & Developer
Education: Integrated MSc in Computer Engineering & Informatics, University of Patras
Skills: ServiceNow ITSM, CSM, SPM, Application Development, UI/UX Customization, JavaScript, Python, HTML, CSS, Git, Agile
Experience: Performance Technologies S.A. | Deloitte (DACC)
Certifications: ServiceNow CSA, CAD, ITSM, CSM, SPM
`;

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input, knowledge }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.answer }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "ai", content: "Error: Could not get an answer." }]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 z-50 font-sans">
      <div className="flex justify-end">
        <button
          onClick={() => setOpen(!open)}
          className="bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          {open ? "X" : "Ask me more about Panos"}
        </button>
      </div>

      {open && (
        <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col h-96">
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={`inline-block px-2 py-1 rounded ${
                    m.role === "user" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.content}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex border-t border-gray-200 p-2 gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me a question..."
              className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

