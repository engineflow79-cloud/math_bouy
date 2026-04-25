# 🧠 StudyGenie AI – Full Gen Z SA Study App (Upgraded)

Below is your FULL upgraded version with:
- 🤖 Real AI (Groq API)
- 📸 Camera note capture
- 🔍 OCR (image → text)
- 🎓 Grades 1–12 (South Africa)
- 📚 SA school subjects
- 🧠 Quiz + summary + explain modes
- 📱 Ready for GitHub + deployment

---

# ⚠️ IMPORTANT SECURITY NOTE
Never hardcode API keys in your code.
Use `.env` file instead.

---

# 📦 INSTALL DEPENDENCIES
Run this in your project:
```bash
npm install tesseract.js
```

---

# 🔐 .env FILE (CREATE THIS)
```
REACT_APP_GROQ_API_KEY=YOUR_KEY_HERE
```
---

# 💻 FULL APP CODE (React)

```javascript
import { useState, useRef } from "react";
import Tesseract from "tesseract.js";

export default function App() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("Your AI results will appear here...");
  const [grade, setGrade] = useState(10);
  const [subject, setSubject] = useState("Mathematics");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const subjects = [
    "Mathematics",
    "English",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "History",
    "Life Orientation",
    "Accounting",
    "Business Studies",
    "Economics"
  ];

  // =========================
  // 🌍 REAL AI (GROQ API)
  // =========================
  const AI_CALL = async (prompt) => {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly Gen Z South African tutor. Explain simply, use examples, and make learning fun."
          },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  };

  // =========================
  // 📸 CAMERA START
  // =========================
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
    videoRef.current.play();
  };

  // =========================
  // 📸 OCR (IMAGE → TEXT)
  // =========================
  const captureImage = async () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(video, 0, 0, 300, 200);

    const imageData = canvas.toDataURL("image/png");

    setOutput("📸 Reading notes...");

    const result = await Tesseract.recognize(imageData, "eng");

    setText(result.data.text);
    setOutput("✅ Notes extracted! Now click AI buttons.");
  };

  // =========================
  // 🧠 AI FEATURES
  // =========================

  const summarize = async () => {
    const res = await AI_CALL(
      `Summarize for Grade ${grade} ${subject}: ${text}`
    );
    setOutput(res);
  };

  const quiz = async () => {
    const res = await AI_CALL(
      `Create 5 quiz questions for Grade ${grade} ${subject}: ${text}`
    );
    setOutput(res);
  };

  const explain = async () => {
    const res = await AI_CALL(
      `Explain this like a Gen Z tutor for Grade ${grade} ${subject}: ${text}`
    );
    setOutput(res);
  };

  // =========================
  // 🎨 UI
  // =========================
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white p-5">
      <h1 className="text-3xl font-bold text-center">
        🧠 StudyGenie AI (SA Ultimate)
      </h1>

      {/* Grade + Subject */}
      <div className="flex gap-2 justify-center mt-4">
        <select
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="text-black p-2 rounded"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i}>Grade {i + 1}</option>
          ))}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="text-black p-2 rounded"
        >
          {subjects.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Input */}
      <textarea
        className="w-full mt-4 p-3 text-black rounded"
        rows="6"
        placeholder="Paste notes or use camera..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex gap-2 justify-center mt-3 flex-wrap">
        <button onClick={summarize} className="bg-green-500 px-3 py-2 rounded">
          Summarize
        </button>
        <button onClick={quiz} className="bg-blue-500 px-3 py-2 rounded">
          Quiz Me
        </button>
        <button onClick={explain} className="bg-purple-500 px-3 py-2 rounded">
          Explain
        </button>
      </div>

      {/* CAMERA */}
      <div className="mt-6 text-center">
        <video ref={videoRef} className="w-64 mx-auto rounded" />
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex gap-2 justify-center mt-2">
          <button onClick={startCamera} className="bg-yellow-500 px-3 py-2 rounded">
            Start Camera
          </button>
          <button onClick={captureImage} className="bg-red-500 px-3 py-2 rounded">
            Scan Notes
          </button>
        </div>
      </div>

      {/* OUTPUT */}
      <div className="mt-5 bg-black/40 p-4 rounded whitespace-pre-wrap">
        {output}
      </div>
    </div>
  );
}
```

---

# 🚀 WHAT YOU NOW HAVE
✔ Real AI tutor
✔ Camera note scanner
✔ OCR text extraction
✔ SA school system
✔ Gen Z explanation style
✔ Quiz generator

---

# 🔥 NEXT LEVEL UPGRADES (tell me if you want)
- 📱 Make it installable as a phone app (PWA)
- 🏆 Add XP + streak system
- 📊 Track marks per subject
- 🔐 Login system (Firebase)
- 🌐 Deploy it FREE (Netlify/Vercel)

Just say:
👉 **“deploy it”** or **“add login system”**
