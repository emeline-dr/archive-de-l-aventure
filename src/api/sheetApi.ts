import { useQuery } from "@tanstack/react-query";

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
    weight: string | null;
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

export type Feat = {
    id: number;
    sheet_id: number;
    label: string;
    description: string;
    level_acquired: number;
}

export type SavingThrows = {
    id: number;
    sheet_id: number;
    value: number;
    proficient: boolean;
    abilities_id: number;
    label: string;
}

export type SkillSheet = {
    id: number;
    skill_id: number;
    sheet_id: number;
    value: number;
    label: string;
    categories: string;
    proficient: boolean;
}

export type FellowInvestigators = {
    sheet_id: number;
    player: string;
    character: string;
    id: number;
}

export type Languages = {
    id: number;
    language_id: number;
    sheet_id: number;
    label: string;
}

export type Sheet = {
    id: number;
    user_id: number;
    system_id: number;
    lastname?: string;
    firstname: string;
    avatar_src: string;
    shared: boolean;
    lvl: number;

    details: {
        sheet_id: number;
        id: number;

        classe_id?: number;
        sub_classe_id?: number;
        species_id?: number;
        origin_id?: number;
        alignment?: string;
        max_hp?: number;
        hp?: number;
        hit_dice?: string;
        proficiency?: number;
        ca?: number;
        initiative?: number;
        speed?: number;
        swim_speed?: number;
        climb_speed?: number;
        fly_speed?: number | null;
        inspiration?: boolean | null;
        death_saves_success?: number;
        death_saves_fail?: number;
        weapon_prof?: string;
        armor_prof?: string;
        tools_prof?: string;
        gold?: number;
        silver?: number;
        copper?: number;
        electrum?: number;
        platinum?: number;
        dd_spell?: number;
        spell_bonus_attack?: number;
        apparence?: string;
        histoire?: string;
        caractere?: string;
        allies?: string;
        enemies?: string;
        exp?: number;
        sub_species_id?: number | null;

        clan_id?: number;
        family_id?: number;
        school_id?: number;
        school_rank?: number;
        roles?: string;
        ninjo?: string;
        giri?: string;
        distinctions?: string;
        adversities?: string;
        passions?: string;
        anxieties?: string;
        personality_habits_quirks?: string;
        exp_total?: number;
        exp_saved?: number;
        expo_spent?: number;
        endurance?: number;
        endurance_fatigue?: number;
        composure?: number;
        composure_strife?: number;
        focus?: number;
        vigilance?: number;
        void_points_max?: number;
        void_points_current?: number;
        koku?: number;
        zeni?: number;
        bu?: number;
        notes?: string;
        adv?: string;
        disadv?: string;
        conditions?: string;
        school_abilities?: string;
        techniques_new_actions?: string;
        techniques_new_flower?: string;

        occupation?: string;
        age?: number;
        gender?: string;
        residence?: string;
        birthplace?: string;
        hit_point?: number;
        dying?: boolean;
        unconsious?: boolean;
        major_wounds?: number;
        temp_insane?: number;
        indef_insane?: number;
        sanity?: number;
        luck?: number;
        magic_points?: number;
        damage_bonus?: number;
        build?: number;
        dodge?: number;
        personal_desc?: string;
        traits?: string;
        believes?: string;
        meaningful_location?: string;
        treasured_possession?: string;
        injurie_scar?: string;
        phobia_mania?: string;
        tomes_spell_artifacts?: string;
        encounters?: string;
        assets?: string;
        spending_lvl?: number;
        cash?: number;
    };

    clanL5R?: {
        label: string;
    };

    familyL5R?: {
        label: string;
    };

    schoolL5R?: {
        label: string;
    };

    classeDnD?: { label: string };
    subClasseDnD?: { label: string };
    speciesDnD?: { label: string };
    subSpeciesDnD?: { label: string };
    origineDnD?: { label: string };
};

export type SheetResponse = {
    sheet: Sheet;
    abilities: Ability[];
    spells: Spell[];
    weapon: Weapon[];
    item: Item[];
    spells_slot: SpellSlot[];
    feat: Feat[];
    details: Sheet["details"];
    saving_throw: SavingThrows[];
    skill: SkillSheet[];
    fellowInvestigators?: FellowInvestigators[];
    language?: Languages[];
    classeDnD?: { label: string };
    subClasseDnD?: { label: string };
    speciesDnD?: { label: string };
    subSpeciesDnD?: { label: string };
    origineDnD?: { label: string };
    clanL5R?: { label: string };
    familyL5R?: { label: string };
    schoolL5R?: { label: string };
};

export async function fetchSheets(sheet_id: number): Promise<SheetResponse> {
    const response = await fetch(`https://apidnd.up.railway.app/api/sheet/${sheet_id}`);

    if (!response.ok) {
        throw new Error('Erreur lors du chargement de la fiche DnD');
    }

    const data = await response.json();

    return data as SheetResponse;
}

export function useSheets(sheet_id: number) {
    return useQuery({
        queryKey: ['sheets-per-user', sheet_id],
        queryFn: () => fetchSheets(sheet_id),
        enabled: !!sheet_id,
    });
}

export async function updateShared(sheet: Sheet, sheet_id: number): Promise<Sheet> {
    const response = await fetch(`https://apidnd.up.railway.app/api/sheet/${sheet_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sheet }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de 'shared'");
    }

    const data = await response.json();
    return data as Sheet;
}