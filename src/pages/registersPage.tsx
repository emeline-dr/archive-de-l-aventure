import { useState } from 'react';

import Sidebar from '../components/sidebar';
import SheetSnippet from '../components/sheetSnippet';

import avatarOne from '../assets/images/icons-avatar-1.jpg';
import avatarTwo from '../assets/images/icons-avatar-3.jpg';
import avatarThree from '../assets/images/icons-avatar-2.jpg';
import avatarFour from '../assets/images/icons-avatar-4.jpg';
import avatarFive from '../assets/images/icons-avatar-5.jpg';
import avatarSix from '../assets/images/icons-avatar-6.jpg';
import avatarSeven from '../assets/images/icons-avatar-7.jpg';
import avatarEight from '../assets/images/icons-avatar-8.jpg';
import avatarNine from '../assets/images/icons-avatar-9.jpg';
import avatarTen from '../assets/images/icons-avatar-10.jpg';

import DnD from "../assets/images/bg-dnd.png";
import CoC from "../assets/images/bg-cthulhu.jpg";
import L5R from "../assets/images/bg-lcinqa.webp";

export function RegistersPage() {
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
        {
            authorId: 4,
            myId: 1,
            authorName: 'Cupcake',
            isLiked: false,
            name: "Violet Warwick",
            img: avatarFour,
            info: "Barbare",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "8",
        },
        {
            authorId: 5,
            myId: 1,
            authorName: 'Travis Willingham',
            isLiked: false,
            name: "Fjord",
            img: avatarFive,
            info: "Occultiste (Lame Maudite)",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "1",
        },
        {
            authorId: 6,
            myId: 1,
            authorName: 'Marisha Ray',
            isLiked: true,
            name: "Laudna",
            img: avatarSix,
            info: "Ensorceleur (Magie des Ombres)",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "11",
        },
        {
            authorId: 7,
            myId: 1,
            authorName: 'Ashariel',
            isLiked: false,
            name: "Emmrich Volkarin",
            img: avatarSeven,
            info: "Magicien (École de nécromancie)",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "4",
        },
        {
            authorId: 8,
            myId: 1,
            authorName: "Lae'zel",
            isLiked: true,
            name: "Shadowheart",
            img: avatarEight,
            info: "Clerc (Lumière)",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "01",
        },
        {
            authorId: 9,
            myId: 1,
            authorName: 'Byleth',
            isLiked: false,
            name: "Edelgard von Hresvelg",
            img: avatarNine,
            info: "Paladin",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "1",
        },
        {
            authorId: 10,
            myId: 1,
            authorName: "Taliesin Jaffe",
            isLiked: true,
            name: "Percival de Rolo",
            img: avatarTen,
            info: "Occultiste (Fiélon)",
            system: 'Dungeons & Dragons',
            systemImg: DnD,
            lvl: "01",
        },
    ];

    const [selectedSystem, setSelectedSystem] = useState("all");

    const filteredSheets = selectedSystem === "all"
        ? sheets
        : sheets.filter(sheet => sheet.system === selectedSystem);

    const uniqueSystems = Array.from(new Set(sheets.map(s => s.system)));

    return (
        <div className='flex flex-wrap h-full'>
            <Sidebar></Sidebar>
            <div className='flex-1 mx-[16px] sm:mx-[80px] my-[40px]'>
                <div className="flex flex-wrap justify-between">
                    <h2 className='text-[32px] font-uncial-antiqua tracking-[10%] underline my-[40px]'>Les registres</h2>

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