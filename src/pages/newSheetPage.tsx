import { useState } from "react";

import { DndFormComponent } from "../components/formComponent/DndFormComponent";
import { L5rFormComponent } from "../components/formComponent/L5RFormComponent";
import { CthulhuFormComponent } from "../components/formComponent/CoCFormComponent";

import { useSystems } from "../api/systemApi";

export function NewSheetPage() {
    const systems = useSystems();

    const [selectedSystem, setSelectedSystem] = useState("");

    const renderComponent = () => {
        switch (selectedSystem) {
            case 'Donjons et dragons':
                return <DndFormComponent />;
            case 'La legende des 5 anneaux':
                return <L5rFormComponent />;
            case 'Call of Cthulhu':
                return <CthulhuFormComponent />;
            default:
                return <div className="w-full mt-[16px]">Veuillez choisir un univers.</div>;
        }
    };

    if (systems.isLoading) return <p>Chargement des systèmes...</p>;
    if (systems.error) return <p>Erreur : {systems.error.message}</p>;
    if (!systems.data) return null;

    return (
        <div className="flex flex-wrap justify-between">
            <div>
                <label className="block text-xl font-uncial-antiqua mb-[8px]">Univers</label>
                <select
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                    className="p-[8px] bg-text rounded-lg text-accent"
                >
                    <option>Choisir un univers</option>
                    {systems.data.map(system => (
                        <option key={system.label} value={system.label}>{system.label}</option>
                    ))}
                </select>
            </div>

            {renderComponent()}
        </div>
    )
}