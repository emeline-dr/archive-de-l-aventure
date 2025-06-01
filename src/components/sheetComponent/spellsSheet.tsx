import { useState, useEffect } from "react";

import type { Spell, SpellSlot } from "../../api/sheetApi";

type SpellsSheetProps = {
    spells: Spell[];
    spells_slots: SpellSlot[];
    dd_spell: number;
    spell_bonus_attack: number;
};

export default function SpellsSheet(props: SpellsSheetProps) {
    const [selectedSpellId, setSelectedSpellId] = useState<string | null>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (!target.closest(".spell-wrapper") && !target.closest(".popover")) {
                setSelectedSpellId(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const { spells, spells_slots, dd_spell, spell_bonus_attack } = props;

    if (!spells || !spells_slots) {
        return (
            <>
                <h3 className="block text-2xl font-uncial-antiqua mt-[40px] underline">Sorts</h3>
                <div className="w-full p-[8px] bg-primary rounded-[3px]">
                    <p className="italic">Pas de sort.</p>
                </div>
            </>
        );
    }

    const preparedSpellsCount = spells.filter((spell) => spell.prepared).length;

    const levelSpells: { [key: string]: Spell[] } = {};
    for (let i = 0; i <= 10; i++) {
        levelSpells[`level${i}Spells`] = spells.filter((spell) => spell.level === i);
    }

    const spellSlots: SpellSlot = spells_slots[0];

    const slots = Array.from({ length: 10 }, (_, i) => {
        const slotNumber = i + 1;
        const used = spellSlots[`slots_${slotNumber}_used` as keyof SpellSlot];
        const total = spellSlots[`slots_${slotNumber}_total` as keyof SpellSlot];

        return { used, total };
    });

    return (
        <>
            <h3 className="block text-2xl font-uncial-antiqua my-[40px] underline">Sorts</h3>
            <div className="w-full flex flex-wrap justify-center gap-[40px]">
                <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base w-[200px] h-[100px] bg-primary rounded-[3px]">
                    Sorts à préparer chaque jour
                    <span className="font-uncial-antiqua text-2xl">{preparedSpellsCount ? preparedSpellsCount : '/'}</span>
                </div>

                <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base w-[200px] h-[100px] bg-primary rounded-[3px]">
                    DD de sauvegarde d'un sort
                    <span className="font-uncial-antiqua text-2xl">{dd_spell}</span>
                </div>

                <div className="flex flex-wrap flex-col justify-start p-[8px] text-center text-base w-[200px] h-[100px] bg-primary rounded-[3px]">
                    Bonus d'attaque avec un sort
                    <span className="font-uncial-antiqua text-2xl">+{spell_bonus_attack}</span>
                </div>
            </div>

            <div className="flex-1 rounded-[3px] bg-primary p-[16px]">
                <h4 className="text-xl font-uncial-antiqua">Sorts Mineurs</h4><br />
                {levelSpells.level0Spells.length > 0 ? (
                    levelSpells.level0Spells.map((spell) => {
                        const isSelected = selectedSpellId === spell.id.toString();
                        return (
                            <div key={spell.id}
                                className={`w-fit relative spell-wrapper cursor-pointer 
                    ${isSelected ? "px-[8px] bg-text text-background rounded-sm" : ""}
                    hover:px-[8px] hover:bg-text hover:text-background hover:rounded-sm`}
                                onClick={() => setSelectedSpellId(spell.id.toString())}>
                                {spell.label}

                                {isSelected && (
                                    <div className="absolute popover bottom-full text-text left-1/2 -translate-x-1/2 mb-2 z-10 flex flex-col items-center">
                                        <div className="w-[350px] flex flex-row gap-y-[40px] p-[32px] bg-text shadow-lg rounded-[3px]">
                                            <span className="text-background w-full">
                                                <span className="font-uncial-antiqua text-lg pe-[8px]">École :</span> {spell.school} <br />
                                                <span className="font-uncial-antiqua text-lg pe-[8px]">Temps d'invocation :</span> {spell.casting_time} <br />
                                                <span className="font-uncial-antiqua text-lg pe-[8px]">Portée :</span> {spell.range || '/'} <br />
                                                <span className="font-uncial-antiqua text-lg pe-[8px]">Composant(s) :</span> {spell.components || '/'} <br />
                                                <span className="font-uncial-antiqua text-lg pe-[8px]">Durée :</span> {spell.duration || '/'} <br />
                                                <span className="font-uncial-antiqua text-lg pe-[8px]">Description :</span> {spell.description || '/'} <br />
                                                {spell.prepared === true ? (<p>Préparé.</p>) : (<p>Pas préparé.</p>)}
                                                {spell.known === true ? (<p>Connu.</p>) : (<p>Pas connu.</p>)}
                                                {spell.is_ritual === true ? (<p>Demande un rituel.</p>) : (<p>Ne demande pas de rituel.</p>)}
                                            </span>
                                        </div>
                                        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-text"></div>
                                    </div>
                                )}
                            </div>
                        )
                    })
                ) : (
                    <div>Aucun sort mineur disponible.</div>
                )}
            </div>

            {Array.from({ length: 9 }, (_, i) => {

                const levelNumber = i + 1;
                const levelKey = `level${levelNumber}Spells`;
                const levelSpellsList = levelSpells[levelKey];

                const slotUsed = slots[levelNumber - 1]?.used;
                const slotTotal = slots[levelNumber - 1]?.total;

                return levelSpellsList.length > 0 && (
                    <div key={levelNumber} className="flex-1 rounded-[3px] bg-primary p-[16px]">
                        <div className="flex flex-wrap justify-between w-full text-xl font-uncial-antiqua">
                            <h4>Sorts de niveau {levelNumber}</h4>
                            <span>
                                Emplacements {slotUsed} / {slotTotal}
                            </span>
                        </div><br />
                        {levelSpellsList.map((spell) => {
                            const isSelected = selectedSpellId === spell.id.toString();

                            return (
                                <div key={spell.id}
                                    className={`w-fit relative spell-wrapper cursor-pointer 
                    ${isSelected ? "px-[8px] bg-text text-background rounded-sm" : ""}
                    hover:px-[8px] hover:bg-text hover:text-background hover:rounded-sm`}
                                    onClick={() => setSelectedSpellId(spell.id.toString())}>
                                    <span>{spell.label}</span>

                                    {isSelected && (
                                        <div className="absolute popover bottom-full text-text left-1/2 -translate-x-1/2 mb-2 z-10 flex flex-col items-center">
                                            <div className="w-[450px] flex flex-row gap-y-[40px] p-[32px] bg-text shadow-lg rounded-[3px]">
                                                <span className="text-background w-full">
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">École :</span> {spell.school} <br />
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Temps d'invocation :</span> {spell.casting_time} <br />
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Portée :</span> {spell.range || '/'} <br />
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Composant(s) :</span> {spell.components || '/'} <br />
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Durée :</span> {spell.duration || '/'} <br />
                                                    <span className="font-uncial-antiqua text-lg pe-[8px]">Description :</span> {spell.description || '/'} <br />
                                                    {spell.prepared === true ? (<p>Préparé.</p>) : (<p>Pas préparé.</p>)}
                                                    {spell.known === true ? (<p>Connu.</p>) : (<p>Pas connu.</p>)}
                                                    {spell.is_ritual === true ? (<p>Demande un rituel.</p>) : (<p>Ne demande pas de rituel.</p>)}
                                                </span>
                                            </div>
                                            <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-text"></div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                );
            })}

        </>
    );
}
