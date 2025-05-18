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

export type SheetL5R = {
    id: number;
    sheet_id: number;
    clan_id: number;
    family_id: number;
    school_id: number;
    school_rank: number;
    roles: string;
    ninjo: string;
    giri: string;
    distinctions: string;
    adversities: string;
    passions: string;
    anxieties: string;
    personality_habits_quirks: string;
    exp_total: number;
    exp_saved: number;
    expo_spent: number;
    endurance: number;
    endurance_fatigue: number;
    composure: number;
    composure_strife: number;
    focus: number;
    vigilance: number;
    void_points_max: number;
    void_points_current: number;
    koku: number;
    zeni: number;
    bu: number;
    notes: string;
    adv: string;
    disadv: string;
    conditions: string;
    school_abilities: string;
    Techniques_new_actions: string;
    techniques_new_flower: string;

    clan: Entity;
    family: Entity;
    school: Entity;
};

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Échec de chargement depuis ${url}`);
    return res.json();
}

export async function fetchSheetsL5R(): Promise<(SheetL5R & { skills: (SkillSheet & { label: string })[] })[]> {
    const [sheets, clans, families, schools, skillsSheet, skills] = await Promise.all([
        fetchJSON<SheetL5R[]>('https://apidnd.up.railway.app/api/sheetL5RDetails'),
        fetchJSON<Entity[]>('https://apidnd.up.railway.app/api/clanL5R'),
        fetchJSON<Entity[]>('https://apidnd.up.railway.app/api/familyL5R'),
        fetchJSON<Entity[]>('https://apidnd.up.railway.app/api/schoolL5R'),
        fetchJSON<SkillSheet[]>('https://apidnd.up.railway.app/api/skillSheet'),
        fetchJSON<Skill[]>('https://apidnd.up.railway.app/api/skill'),
    ]);

    const clansMap = Object.fromEntries(clans.map(c => [c.id, c]));
    const familiesMap = Object.fromEntries(families.map(f => [f.id, f]));
    const schoolsMap = Object.fromEntries(schools.map(sc => [sc.id, sc]));
    const skillMap = Object.fromEntries(skills.map(s => [s.id, s.label]));

    return sheets.map(sheet => {
        const clanEntity = clansMap[sheet.clan_id];
        const familyEntity = familiesMap[sheet.family_id];
        const schoolEntity = schoolsMap[sheet.school_id];

        if (!clanEntity || !familyEntity || !schoolEntity) {
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
            clan: clanEntity,
            family: familyEntity,
            school: schoolEntity,
            skills: sheetSkills,
        };
    });
}

export function useSheetsL5R() {
    return useQuery({
        queryKey: ['sheets-l5r'],
        queryFn: fetchSheetsL5R,
    });
}