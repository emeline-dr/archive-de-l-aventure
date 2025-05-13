import { useState } from 'react';

import Sidebar from '../components/sidebar';
import SheetSnippet from '../components/sheetSnippet';

import avatarOne from '../assets/images/icons-avatar-1.jpg';
import avatarTwo from '../assets/images/icons-avatar-3.jpg';
import avatarThree from '../assets/images/icons-avatar-2.jpg';

import DnD from "../assets/images/bg-dnd.png";
import CoC from "../assets/images/bg-cthulhu.jpg";
import L5R from "../assets/images/bg-lcinqa.webp";

export function MyCharactersComponent() {
    const sheets = [
        {
            authorId: 1,
            myId: 1,
            authorName: 'Ryune',
            isLiked: false,
            name: "Arlahne",
            img: avatarOne,
            info: "Occultiste (Fiélon)",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "01",
        },
        {
            authorId: 1,
            myId: 1,
            authorName: 'Ryune',
            isLiked: false,
            name: "Naoe Fujiwara",
            img: avatarTwo,
            info: "Licorne",
            system: 'Le Livre des cinq anneaux',
            systemImg: L5R,
            lvl: "04",
        },
        {
            authorId: 1,
            myId: 1,
            authorName: 'Ryune',
            isLiked: false,
            name: "Elaine Ann Cormier",
            img: avatarThree,
            info: "Détective privé",
            system: 'Call of Cthulhu',
            systemImg: CoC,
            lvl: "05",
        },
    ];

    const [selectedSystem, setSelectedSystem] = useState("all");

    const filteredSheets = selectedSystem === "all"
        ? sheets
        : sheets.filter(sheet => sheet.system === selectedSystem);

    const uniqueSystems = Array.from(new Set(sheets.map(s => s.system)));

    return (
        <div className='flex flex-wrap h-[200vh]'>
            <Sidebar></Sidebar>
            <div className='flex-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className="flex justify-end gap-4">
                    <button className="btn btn-text">Créer un nouvel aventurier</button>
                </div>
                <div className="flex flex-wrap justify-between">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Mes aventuriers</h2>

                    <div className='h-fit self-center'>
                        <select
                            value={selectedSystem}
                            onChange={(e) => setSelectedSystem(e.target.value)}
                            className="p-[8px] bg-primary rounded-lg border border-secondary"
                        >
                            <option value="all">Tous les jeux</option>
                            {uniqueSystems.map(system => (
                                <option key={system} value={system}>{system}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between gap-y-4'>
                    {filteredSheets.map(sheet => (
                        <SheetSnippet
                            key={sheet.name}
                            authorId={sheet.authorId}
                            myId={sheet.myId}
                            authorName={sheet.authorName}
                            isLiked={sheet.isLiked}
                            name={sheet.name}
                            img={sheet.img}
                            info={sheet.info}
                            system={sheet.systemImg}
                            lvl={sheet.lvl}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}