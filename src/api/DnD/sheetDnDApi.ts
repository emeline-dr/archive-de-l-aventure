import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

export type Ability = {
    id: number;
    abilities_id: number;
    sheet_id: number;
    value: number;
    modifier: number;
    label: string;
    system_id: number;
};

export type Spell = {
    id: number;
    sheet_id: number;
    label: string;
    level: number;
    school: string | null;
    casting_time: string | null;
    range: string | null;
    components: string | null;
    duration: string | null;
    description: string | null;
    prepared: boolean;
    known: boolean;
    is_ritual: boolean;
};

export type Weapon = {
    id: number;
    sheet_id: number;
    label: string;
    damage: string;
    damage_type: string;
    properties: string;
    bonus: number;
    notes: string | null;
};

export type Item = {
    id: number;
    sheet_id: number;
    label: string;
    quantity: number;
    weight: number | null;
    description: string | null;
};

export type SpellSlot = {
    id: number;
    sheet_id: number;
    slots_1_total: number;
    slots_1_used: number;
    slots_2_total: number;
    slots_2_used: number;
    slots_3_total: number;
    slots_3_used: number;
    slots_4_total: number;
    slots_4_used: number;
    slots_5_total: number;
    slots_5_used: number;
    slots_6_total: number;
    slots_6_used: number;
    slots_7_total: number;
    slots_7_used: number;
    slots_8_total: number;
    slots_8_used: number;
    slots_9_total: number;
    slots_9_used: number;
};

export type SheetDnD = {
    id: number;
    sheet_id: number;
    class_id: number;
    subClass_id: number;
    species_id: number;
    origin_id: number;
    alignment: string;
    max_hp: number;
    hp: number;
    hit_dice: string;
    proficiency: number;
    ca: number;
    initiative: number;
    speed: number;
    swim_speed: number;
    climb_speed: number;
    fly_speed: number | null;
    inspiration: boolean | null;
    death_saves_success: number;
    death_saves_fail: number;
    weapon_prof: string;
    armor_prof: string;
    tools_prof: string;
    gold: number;
    silver: number;
    copper: number;
    electrum: number;
    platinum: number;
    dd_spell: number;
    spell_bonus_attack: number;
    apparence: string | null;
    histoire: string | null;
    caractere: string | null;
    allies: string | null;
    enemies: string | null;
    lvl: number;
    exp: number;
    abilities: Ability[];
    spells: Spell[];
    spell_slots: SpellSlot[];
    weapon: Weapon[];
    items: Item[];
    language: { label: string };
    classeDnD: { label: string };
    subClasseDnD: { label: string };
    speciesDnD: { label: string };
    origineDnD: { label: string };
};


export async function fetchSheetsDnDWithDetails(sheet_id: number): Promise<SheetDnD> {
    const response = await fetchWithAuth(`https://apidnd.up.railway.app/api/sheet/${sheet_id}`);

    if (!response.ok) {
        throw new Error('Erreur lors du chargement de la fiche DnD');
    }

    const data = await response.json();

    return data as SheetDnD;
}

export function useSheetsDnD(sheet_id: number) {
    return useQuery({
        queryKey: ['sheets-dnd-with-details', sheet_id],
        queryFn: () => fetchSheetsDnDWithDetails(sheet_id),
        enabled: !!sheet_id,
    });
}
