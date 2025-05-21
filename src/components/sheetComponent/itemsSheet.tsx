import { useState, useEffect } from "react";
import type { Item } from "../../api/sheetApi";

type ItemsSheetProps = {
    system_id: number;
    copper?: number;
    silver?: number;
    electrum?: number;
    gold?: number;
    platinum?: number;
    spending_lvl?: number;
    cash?: number;
    items: Item[];
};

export default function ItemsSheet(props: ItemsSheetProps) {
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (!target.closest(".item-wrapper") && !target.closest(".popover")) {
                setSelectedItemId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { items = [] } = props;

    const totalWeight = items.reduce((sum, item) => sum + (item.weight || 0), 0);

    return (
        <>
            <h3 className="block text-2xl font-uncial-antiqua mt-[40px] underline">Inventaire</h3>
            <div className="w-full flex flex-wrap justify-center gap-[40px]">
                {props.system_id === 3 &&
                    <>
                        <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                            Dépenses courantes
                            <span className="font-uncial-antiqua text-2xl">{props.spending_lvl}</span>
                        </div>

                        <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                            Espèces
                            <span className="font-uncial-antiqua text-2xl">{props.cash}</span>
                        </div>
                    </>
                }
                {props.system_id === 2 &&
                    <>
                        <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                            Pièce(s) de cuivre
                            <span className="font-uncial-antiqua text-2xl">{props.copper}</span>
                        </div>

                        <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                            Pièce(s) d'argent
                            <span className="font-uncial-antiqua text-2xl">{props.silver}</span>
                        </div>

                        <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                            Pièce(s) d'electrum
                            <span className="font-uncial-antiqua text-2xl">{props.electrum}</span>
                        </div>

                        <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                            Pièce(s) d'or
                            <span className="font-uncial-antiqua text-2xl">{props.gold}</span>
                        </div>

                        <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base size-[100px] bg-primary rounded-[3px]">
                            Pièce(s) de platine
                            <span className="font-uncial-antiqua text-2xl">{props.platinum}</span>
                        </div>
                    </>
                }
            </div>
            <div className="w-full rounded-[3px] bg-primary p-[16px]">
                <div className="w-full mb-[32px] flex flex-wrap gap-[16px] justify-center">
                    {items && items.length > 0 ? (
                        items.map((item) => {
                            const isSelected = selectedItemId === item.id.toString();

                            return (
                                <div
                                    key={item.id}
                                    className={`relative item-wrapper cursor-pointer 
                    ${isSelected ? "px-[8px] bg-text text-background rounded-sm" : ""}
                    hover:px-[8px] hover:bg-text hover:text-background hover:rounded-sm`}
                                    onClick={() => setSelectedItemId(item.id.toString())}
                                >
                                    <span>{item.label}</span>

                                    {isSelected && (
                                        <div className="absolute popover bottom-full text-text left-1/2 -translate-x-1/2 mb-2 z-10 flex flex-col items-center">
                                            <div className="w-[250px] flex flex-row gap-y-[40px] p-[32px] bg-text shadow-lg rounded-[3px]">
                                                <span className="text-background w-full">
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Quantité :</span> {item.quantity} <br />
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Description :</span> {item.description || '/'} <br />
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Poids :</span> {item.weight || 0} kg
                                                </span>
                                            </div>
                                            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-text"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    ) : (
                        <span className="text-center text-base font-uncial-antiqua">Aucun objet dans l'inventaire.</span>
                    )}
                </div>


                <span className="font-uncial-antiqua text-xl pe-[8px]">Poids de l'inventaire</span> {totalWeight ?? 0} kg
            </div>
        </>
    );
}
