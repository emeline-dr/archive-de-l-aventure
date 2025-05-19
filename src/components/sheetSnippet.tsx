import { useState } from "react";
import { Link } from "@tanstack/react-router";

import bgL5R from '../assets/images/bg-lcinqa.webp';
import bgDnD from '../assets/images/bg-dnd.png';
import bgCoC from '../assets/images/bg-cthulhu.jpg';

type SheetSnippetProps = {
    id: number;
    authorId: number;
    authorName: string;
    myId: number;
    img: string;
    name: string;
    lvl: number;
    system: number;
    isLiked: boolean;
};

function SheetSnippet(props: SheetSnippetProps) {
    const [favorite, setFavorite] = useState(props.isLiked);

    let bgSystem = '';

    switch (props.system) {
        case 1:
            bgSystem = bgL5R
            break;
        case 2:
            bgSystem = bgDnD
            break;
        case 3:
            bgSystem = bgCoC
            break;
    }

    return (
        <div className="relative flex flex-wrap justify-start w-full lg:w-[49%] h-[135px] py-[27px] px-[16px] bg-primary rounded-[5px]">
            <img src={`/src/assets/images${props.img}`} alt={`Avatar de ${props.name}`} className="size-[80px] object-cover outline-3 outline-secondary rounded-sm" />
            <div className="flex flex-wrap flex-col justify-center ms-[8px]">
                <span className="w-[150px] md:w-full lg:w-[100px] xl:w-full font-uncial-antiqua text-2xl truncate">
                    <Link
                        key={props.id}
                        to={`/myCharacters/${props.id}`}
                    >
                        {props.name}
                    </Link>
                </span>
                <span className="w-[150px] md:w-full lg:w-[100px] xl:w-full truncate"></span>
                {props.authorId != props.myId &&
                    <span className="w-[150px] md:w-full lg:w-[100px] xl:w-full truncate">Appartient à : {props.authorName}</span>
                }
            </div>
            {props.authorId != props.myId &&
                <button onClick={() => setFavorite(!favorite)} className="absolute top-[8px] end-[143px] cursor-pointer text-[24px]">
                    {favorite === false && <i className="fa-regular fa-heart"></i>}
                    {favorite === true && <i className="fa-solid fa-heart"></i>}
                </button>
            }
            <div className="absolute top-0 end-0 w-[127px] h-[135px]">
                <img src={bgSystem} alt="" className="absolute top-0 start-0 w-full h-full object-cover rounded-r-[5px] opacity-[.55]" />
                <div className="absolute top-0 start-0 bg-accent h-full w-full rounded-r-[5px] mix-blend-hue"></div>
            </div>
            <div className="absolute top-[20px] end-[16px] size-[95px] flex flex-wrap justify-center content-center rounded-full border-2 border-text font-uncial-antiqua text-4xl">
                {props.lvl}
            </div>
        </div>
    );
}

export default SheetSnippet;