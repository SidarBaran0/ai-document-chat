import { useState, useRef, useEffect } from "react";

export default function App() {

  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "user",
      text: "What is the content of this document?"
    },
    {
      role: "ai",
      text: "The document appears to describe a summer internship application. The author highlights their background in machine learning, software development, and problem solving, and expresses interest in gaining practical experience in AI-related projects."
    }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const uploadFile = async () => {

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:5258/documents/upload", {
      method: "POST",
      body: formData
    });

    alert("PDF uploaded");
  };

  const askQuestion = async () => {

    if (!question) return;

    const userMessage = { role: "user", text: question };

    setMessages(prev => [...prev, userMessage]);

    setQuestion("");

    try {

      const res = await fetch("http://localhost:5258/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const data = await res.json();

      const aiMessage = { role: "ai", text: data.answer };

      setMessages(prev => [...prev, aiMessage]);

    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Backend not reachable" }]);
    }

  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>

      <h1 style={styles.title}>AI Document Chat</h1>

      <div style={styles.uploadBox}>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button onClick={uploadFile}>Upload PDF</button>
      </div>

      <div style={styles.chatBox}>

        {messages.map((m, i) => (
          <div key={i} style={m.role === "user" ? styles.user : styles.ai}>
            <b>{m.role === "user" ? "You" : "AI"}:</b> {m.text}
          </div>
        ))}

        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputRow}>

        <input
          style={styles.input}
          placeholder="Ask about your document..."
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />

        <button style={styles.send} onClick={askQuestion}>
          Send
        </button>

      </div>
      </div>
    </div>
  );
}

const styles = {

  page: {
    fontFamily: "Arial, sans-serif",
    background: "linear-gradient(135deg, #1f4e79, #3a7bd5)",
    color: "white",
    height: "100vh",
    width: "100vw", 
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },


  container: {
    width: "600px",
    background: "rgba(0,0,0,0.25)",
    backdropFilter: "blur(10px)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.4)"
  },

  title: {
    fontSize: "36px",
    marginBottom: "20px"
  },

  uploadBox: {
    marginBottom: "20px"
  },

  chatBox: {
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "12px",
    padding: "20px",
    height: "300px",
    overflowY: "auto",
    marginBottom: "20px",
    background: "rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column"
  },

  user: {
    background: "#4CAF50",
    color: "white",
    padding: "10px 14px",
    borderRadius: "12px",
    marginBottom: "10px",
    alignSelf: "flex-end",
    maxWidth: "80%"
  },
  
  ai: {
    background: "rgba(0,0,0,0.4)",
    padding: "10px 14px",
    borderRadius: "12px",
    marginBottom: "10px",
    maxWidth: "80%"
  },

  inputRow: {
    display: "flex",
    gap: "10px"
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(0,0,0,0.6)",
    color: "white"
  },

  send: {
    padding: "12px 22px",
    borderRadius: "8px",
    background: "#4CAF50",
    border: "none",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

};