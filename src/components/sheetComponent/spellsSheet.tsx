import type { Spell, SpellSlot } from "../../api/sheetApi";

type SpellsSheetProps = {
    spells: Spell[];
    spells_slots: SpellSlot[];
    dd_spell: number;
    spell_bonus_attack: number;
};

export default function SpellsSheet(props: SpellsSheetProps) {
    const { spells, spells_slots, dd_spell, spell_bonus_attack } = props;

    if (!spells || !spells_slots || spells.length === 0) return <p>Aucun sort et/ou emplacement de sort.</p>;

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
                    levelSpells.level0Spells.map((spell) => (
                        <div key={spell.id}>
                            {spell.label}
                        </div>
                    ))
                ) : (
                    <div>Aucun sort mineur disponible.</div>
                )}
            </div>

            {Array.from({ length: 10 }, (_, i) => {
                const levelNumber = i + 1;
                const levelKey = `level${levelNumber}Spells`;
                const levelSpellsList = levelSpells[levelKey];

                const slotUsed = slots[levelNumber - 1]?.used - slots[levelNumber - 1]?.total;
                const slotTotal = slots[levelNumber - 1]?.total;

                console.log(`slots_${levelNumber}_used: ${slotUsed}, slots_${levelNumber}_total: ${slotTotal}`);

                return levelSpellsList.length > 0 && (
                    <div key={levelNumber} className="flex-1 rounded-[3px] bg-primary p-[16px]">
                        <div className="flex flex-wrap justify-between w-full text-xl font-uncial-antiqua">
                            <h4>Sorts de niveau {levelNumber}</h4>
                            <span>
                                Emplacements {slotUsed} / {slotTotal}
                            </span>
                        </div><br />
                        {levelSpellsList.map((spell) => (
                            <div key={spell.id}>
                                {spell.label}
                            </div>
                        ))}
                    </div>
                );
            })}

        </>
    );
}
