import React, { useState } from "react";

export function OllamaDemo() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "phi3:mini", // or another model available in your Ollama instance
          prompt,
          stream: false,
        }),
      });
      const data = await res.json();
      setResponse(data.response);
    } catch (err) {
      setResponse("Error: " + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Ollama</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Posez une question !"
        rows={4}
        cols={40}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Loading..." : "Générer"}
      </button>
      <div>
        <strong>Réponse:</strong>
        <pre>{response}</pre>
      </div>
    </div>
  );
}
