import { useQuery } from "@tanstack/react-query";

type Entity = {
    id: number;
    label: string;
};

type Skill = {
    id: number;
    label: string;
};

type SkillSheet = {
    id: number;
    skill_id: number;
    sheet_id: number;
    value: number;
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
    apparence: string;
    histoire: string;
    caractere: string;
    allies: string;
    ennemies: string;
    lvl: number;
    exp: number;

    class: Entity;
    species: Entity;
    subClass: Entity;
    originDetails: Entity;
};

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Échec de chargement depuis ${url}`);
    return res.json();
}

export async function fetchSheetsDnDWithDetails(): Promise<(SheetDnD & { skills: (SkillSheet & { label: string })[] })[]> {
    const [sheets, classes, species, subClasses, origins, skillsSheet, skills] = await Promise.all([
        fetchJSON<SheetDnD[]>('https://apidnd.up.railway.app/api/sheetDnDDetails'),
        fetchJSON<Entity[]>('https://apidnd.up.railway.app/api/classeDnD'),
        fetchJSON<Entity[]>('https://apidnd.up.railway.app/api/speciesDnD'),
        fetchJSON<Entity[]>('https://apidnd.up.railway.app/api/subClasseDnD'),
        fetchJSON<Entity[]>('https://apidnd.up.railway.app/api/origineDnD'),
        fetchJSON<SkillSheet[]>('https://apidnd.up.railway.app/api/skillSheet'),
        fetchJSON<Skill[]>('https://apidnd.up.railway.app/api/skill'),
    ]);

    const classMap = Object.fromEntries(classes.map(c => [c.id, c]));
    const speciesMap = Object.fromEntries(species.map(s => [s.id, s]));
    const subClassMap = Object.fromEntries(subClasses.map(sc => [sc.id, sc]));
    const originMap = Object.fromEntries(origins.map(o => [o.id, o]));
    const skillMap = Object.fromEntries(skills.map(s => [s.id, s.label]));

    return sheets.map(sheet => {
        const classEntity = classMap[sheet.class_id];
        const speciesEntity = speciesMap[sheet.species_id];
        const subClassEntity = subClassMap[sheet.subClass_id];
        const originEntity = originMap[sheet.origin_id];

        if (!classEntity || !speciesEntity || !subClassEntity || !originEntity) {
            throw new Error(`Entité introuvable pour la feuille avec sheet_id ${sheet.sheet_id}`);
        }

        const sheetSkills = skillsSheet
            .filter(ab => ab.sheet_id === sheet.id)
            .map(ab => ({
                ...ab,
                label: skillMap[ab.skill_id] || "Inconnu",
            }));

        return {
            ...sheet,
            class: classEntity,
            species: speciesEntity,
            subClass: subClassEntity,
            origin: originEntity,
            skills: sheetSkills,
        };
    });
}


export function useSheetsDnD() {
    return useQuery({
        queryKey: ['sheets-dnd-with-details'],
        queryFn: fetchSheetsDnDWithDetails,
    });
}
