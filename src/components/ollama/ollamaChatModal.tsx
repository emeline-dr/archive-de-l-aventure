import React, { useRef, useState } from "react";

export function OllamaChatModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", text: input }]);
    setLoading(true);
    try {
      const res = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "phi3:mini",
          prompt: input,
          stream: false,
        }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "ai", text: data.response.trim() },
      ]);
      setInput("");
    } catch {
      setMessages((msgs) => [
        ...msgs,
        { role: "ai", text: "Erreur lors de la génération." },
      ]);
    }
    setLoading(false);
    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-end">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md m-4 flex flex-col h-[70vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-bold">Chat avec l'IA</span>
          <button onClick={onClose} className="text-2xl font-bold">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={msg.role === "user" ? "text-right" : "text-left"}
            >
              <span
                className={
                  "inline-block px-3 py-2 rounded " +
                  (msg.role === "user"
                    ? "bg-blue-100 text-blue-900"
                    : "bg-gray-100 text-gray-800")
                }
              >
                {msg.text}
              </span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <form
          className="flex border-t p-2 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!loading) sendMessage();
          }}
        >
          <input
            className="flex-1 border rounded p-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
