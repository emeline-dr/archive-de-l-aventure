import { useRef, useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';

import talkToIa from '../../assets/images/talktoia.webp'

const STORAGE_KEY = "ollama_chat_messages";

export function OllamaChatModal() {
  const [chatOpen, setChatOpen] = useState(false);

  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      console.log("Chargement des messages depuis localStorage:", JSON.parse(saved));
      setMessages(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

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
          prompt: `Réponds toujours en français. ${input}`,
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

  return (
    <>
      <button
        type="button"
        onClick={() => setChatOpen(true)}
        className="fixed bottom-[8px] right-[8px] size-[64px] z-50 bg-text hover:bg-background rounded-full shadow-sm shadow-text flex items-center justify-center cursor-pointer"
        aria-label="Ouvrir le chat IA"
      >
        <img src={talkToIa} alt="Icône pour parler à l'IA" className="object-cover rounded-full mix-blend-hard-light hover:mix-blend-difference" />
      </button>

      {chatOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end backdrop-blur-xs bg-text-75">
          <div ref={chatRef}
            className="bg-text text-background rounded-lg shadow-lg w-full max-w-md m-4 flex flex-col h-[70vh] border-1 border-accent">
            <div className="relative flex justify-between items-center p-[16px]">
              <div className="absolute top-0 left-0 w-full h-full z-1 bg-accent-25 rounded-t-lg"></div>
              <span className="font-uncial-antiqua text-2xl text-accent z-2">Chat avec l'IA</span>
              <button
                onClick={() => setChatOpen(false)}
                className="z-2 flex flex-wrap justify-center content-center text-2xl cursor-pointer bg-accent text-text rounded-full size-[32px] hover:bg-text hover:border-accent hover:border-[3px] hover:text-accent"
              >
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={msg.role === "user" ? "text-right" : "text-left"}
                >
                  <div
                    className={
                      "inline-block px-3 py-2 rounded max-w-[80%] whitespace-pre-wrap " +
                      (msg.role === "user"
                        ? "bg-background text-text"
                        : "bg-text text-background border-accent border-1")
                    }
                  >
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="prose prose-sm max-w-none">{children}</p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside">{children}</ul>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        em: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        code: ({ children }) => (
                          <code className="bg-accent text-text px-1 py-0.5 rounded text-sm">{children}</code>
                        ),
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className="text-blue-500 underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              <div ref={bottomRef} />
            </div>
            <form
              className="relative flex p-[8px] gap-[8px]"
              onSubmit={(e) => {
                e.preventDefault();
                if (!loading) sendMessage();
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full z-1 bg-accent-25 rounded-b-lg"></div>
              <textarea
                className="flex-1 bg-text text-background rounded-[3px] h-[55px] p-[8px] z-2 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrivez votre message..."
                disabled={loading}
              />
              <button
                type="submit"
                className={`btn btn-accent z-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                style={{ fontSize: '18px', padding: '16px' }}
                disabled={loading}
              >
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
