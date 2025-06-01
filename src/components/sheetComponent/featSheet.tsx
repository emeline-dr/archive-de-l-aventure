import { useState, useEffect } from "react";

import type { Feat } from "../../api/sheetApi"

type FeatSheetProps = {
    feats: Feat[];
}

export default function FeatSheet(props: FeatSheetProps) {
    const [selectedFeatId, setSelectedFeatId] = useState<string | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (!target.closest(".feat-wrapper") && !target.closest(".popover")) {
                setSelectedFeatId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { feats } = props;

    if (!feats || feats.length === 0) return <p>Aucun trait, ni capacité.</p>

    return (<div className="flex-1">
        <h3 className="block text-2xl font-uncial-antiqua my-[40px] underline">Capacités et traits</h3>
        <div className="w-full flex rounded-[3px] bg-primary p-[16px]">
            {feats.map((feat, index) => {
                const isFirst = index === 0;
                const isLast = index === feats.length - 1;

                let paddingClass = "";
                if (isFirst) paddingClass = "mr-[16px]";
                else if (isLast) paddingClass = "ml-[16px]";

                const isSelected = selectedFeatId === feat.id.toString();

                return (
                    <div
                        key={feat.id}
                        className={`relative feat-wrapper ${paddingClass} cursor-pointer 
                                ${isSelected ? "px-[8px] bg-text text-background rounded-sm" : ""}
                                hover:px-[8px] hover:bg-text hover:text-background hover:rounded-sm`}
                        onClick={() => setSelectedFeatId(feat.id.toString())}
                    >
                        <span>{feat.label}</span>

                        {isSelected && (
                            <div className="absolute popover bottom-full text-text left-1/2 -translate-x-1/2 mb-2 z-10 flex flex-col items-center">
                                <div className="w-[350px] flex flex-row gap-y-[40px] p-[32px] bg-text shadow-lg rounded-[3px]">
                                    <span className="text-background w-full">
                                        <span className="font-uncial-antiqua text-lg pe-[8px]">Acquis au lvl :</span> {feat.level_acquired}<br />
                                        <span className="font-uncial-antiqua text-lg pe-[8px]">Description :</span> {feat.description ? feat.description : '/'}
                                    </span>
                                </div>

                                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-text"></div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    </div>
    )
}