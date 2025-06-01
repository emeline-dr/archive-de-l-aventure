import { useQuery } from "@tanstack/react-query";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

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

export type SheetCoC = {
    id: number;
    sheet_id: number;
    occupation: string;
    age: number;
    gender: string;
    residence: string;
    birthplace: string;
    hit_point: number;
    dying: boolean;
    unconscious: boolean;
    major_wounds: number;
    temp_insane: number;
    indef_insane: number;
    sanity: number;
    luck: number;
    magic_points: number;
    damage_bonus: number;
    build: number;
    dodge: number;
    personal_desc: string;
    traits: string;
    believes: string;
    meaningful_location: string;
    treasured_possession: string;
    injuries_scar: string;
    phobia_mania: string;
    tomes_spell_artifacts: string;
    encounters: string;
    assets: string;
    spending_lvl: number;
    cash: number;
    notes: string;
};

async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetchWithAuth(url);
    if (!res.ok) throw new Error(`Échec de chargement depuis ${url}`);
    return res.json();
}

export async function fetchSheetsCoC(): Promise<(SheetCoC & { skills: (SkillSheet & { label: string })[] })[]> {
    const [sheets, skillsSheet, skills] = await Promise.all([
        fetchJSON<SheetCoC[]>('https://apidnd.up.railway.app/api/sheetCthulhuDetails'),
        fetchJSON<SkillSheet[]>('https://apidnd.up.railway.app/api/skillSheet'),
        fetchJSON<Skill[]>('https://apidnd.up.railway.app/api/skill'),
    ]);

    const skillMap = Object.fromEntries(skills.map(s => [s.id, s.label]));

    return sheets.map(sheet => {
        const sheetSkills = skillsSheet
            .filter(ab => ab.sheet_id === sheet.id)
            .map(ab => ({
                ...ab,
                label: skillMap[ab.skill_id] || "Inconnu",
            }));

        return {
            ...sheet,
            skills: sheetSkills,
        };
    });
}

export function useSheetsCoC() {
    return useQuery({
        queryKey: ['sheets-coc'],
        queryFn: fetchSheetsCoC,
    });
}