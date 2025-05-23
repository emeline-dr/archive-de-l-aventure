import { useState } from "react";

import { DndFormComponent } from "../components/formComponent/DndFormComponent";
import { L5rFormComponent } from "../components/formComponent/L5RFormComponent";
import { CthulhuFormComponent } from "../components/formComponent/CoCFormComponent";

import { useSystems } from "../api/systemApi";

import { OllamaChatModal } from "../components/ollama/ollamaChatModal";

export function NewSheetPage() {
  const [chatOpen, setChatOpen] = useState(false);

  const systems = useSystems();

  const [selectedSystem, setSelectedSystem] = useState("");

  const renderComponent = () => {
    switch (selectedSystem) {
      case "Donjons et dragons":
        return <DndFormComponent />;
      case "La legende des 5 anneaux":
        return <L5rFormComponent />;
      case "Call of Cthulhu":
        return <CthulhuFormComponent />;
      default:
        return (
          <div className="w-full mt-[16px]">Veuillez choisir un univers.</div>
        );
    }
  };

  if (systems.isLoading) return <p>Chargement des systèmes...</p>;
  if (systems.error) return <p>Erreur : {systems.error.message}</p>;
  if (!systems.data) return null;

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div>
          <label className="block text-xl font-uncial-antiqua mb-[8px]">
            Univers
          </label>
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="p-[8px] bg-text rounded-lg text-accent"
          >
            <option>Choisir un univers</option>
            {systems.data.map((system) => (
              <option key={system.label} value={system.label}>
                {system.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl"
          style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}
          aria-label="Ouvrir le chat IA"
        >
          💬
        </button>

        <OllamaChatModal open={chatOpen} onClose={() => setChatOpen(false)} />

        {renderComponent()}
      </div>
    </>
  );
}
