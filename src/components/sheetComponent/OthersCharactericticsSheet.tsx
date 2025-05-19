import { useEffect, useRef, useState } from "react";

type OthersCharactericticsSheetProps = {
    proficiency: number;
    ca: number;
    initiative: number;
    speed: number;
    swim_speed: number;
    climb_speed: number;
    fly_speed: number;
    inspiration: boolean;
}

export default function OthersCharactericticsSheet(props: OthersCharactericticsSheetProps) {
    const [showPopover, setShowPopover] = useState(false);

    const buttonRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setShowPopover(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-wrap justify-between gap-[40px] my-[80px] rounded-[3px]">
            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px]">
                Bonus de maîtrise
                <span className="font-uncial-antiqua text-2xl">+{props.proficiency}</span>
            </div>
            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px]">
                <span className="z-1">AC</span>
                <i className="fa-solid fa-shield-halved absolute text-[83px] opacity-[0.4] mix-blend-difference"></i>
                <span className="font-uncial-antiqua text-2xl z-1">{props.ca}</span>
            </div>
            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px]">
                Initiative
                <span className="font-uncial-antiqua text-2xl">{props.initiative}</span>
            </div>
            <div ref={buttonRef} onClick={() => setShowPopover(prev => !prev)}
                className="relative flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px] cursor-pointer hover:outline-2 hover:outline-accent hover:bg-text hover:text-accent">
                Vitesse
                <span className="font-uncial-antiqua text-2xl">{props.speed}m</span>
                <span className="text-xs">Cliquez pour +</span>
                {showPopover && (
                    <div ref={popoverRef} className="absolute top-full text-text left-1/2 -translate-x-1/2 mt-2 z-10 flex flex-col items-center">

                        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[8px] border-l-transparent border-r-transparent border-b-text"></div>

                        <div className="flex flex-row gap-[40px] p-[32px] bg-text shadow-lg rounded-[3px]">
                            <div className="flex flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                                Nage
                                <span className="font-uncial-antiqua text-2xl">{props.swim_speed}m</span>
                            </div>

                            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                                Escalade
                                <span className="font-uncial-antiqua text-2xl">{props.climb_speed}m</span>
                            </div>

                            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                                Vol
                                <span className="font-uncial-antiqua text-2xl">{props.fly_speed ? props.fly_speed + 'm' : '/'}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base flex-1 size-[100px] bg-primary rounded-[3px]">
                Inspiration
                <span className="font-uncial-antiqua text-2xl">{props.inspiration}</span>
            </div>
        </div>
    )
}