import { useState } from "react";

import { DndFormComponent } from "../components/DndFormComponent";
import { L5rFormComponent } from "../components/L5RFormComponent";
import { CthulhuFormComponent } from "../components/CoCFormComponent";

export function NewSheetPage() {
    const systems = [
        'Dungeons & Dragons',
        'Le Livre des cinq anneaux',
        'Call of Cthulhu'
    ]

    const [selectedSystem, setSelectedSystem] = useState("");

    const renderComponent = () => {
        switch (selectedSystem) {
            case 'Dungeons & Dragons':
                return <DndFormComponent />;
            case 'Le Livre des cinq anneaux':
                return <L5rFormComponent />;
            case 'Call of Cthulhu':
                return <CthulhuFormComponent />;
            default:
                return <div className="w-full mt-[16px]">Veuillez choisir un univers.</div>;
        }
    };

    return (
        <div className="flex flex-wrap justify-between">
            <div>
                <label className="block text-xl font-uncial-antiqua mb-[8px]">Univers</label>
                <select
                    value={selectedSystem}
                    onChange={(e) => setSelectedSystem(e.target.value)}
                    className="p-[8px] bg-primary rounded-lg border border-secondary"
                >
                    <option>Choisir un univers</option>
                    {systems.map(system => (
                        <option key={system} value={system}>{system}</option>
                    ))}
                </select>
            </div>

            {renderComponent()}
        </div>
    )
}