import { useForm } from "@tanstack/react-form"
import { useState } from "react"

import type { Sheet } from "../../api/sheetApi"

import { useSheets } from "../../api/sheetApi"
import { useSkillCoCFiltered } from "../../api/CoC/skillCoCApi"

export default function UpdateSheetCoC(props: { sheetId: number }) {
    const { data, isLoading } = useSheets(props.sheetId)

    const [, setSkillsCount] = useState(1);
    const [, setWeaponCount] = useState(1);
    const [, setItemsCount] = useState(1);
    const [, setFellowInvestigators] = useState(1);

    const form = useForm({
        defaultValues: {
            avatar: data?.sheet.avatar_src ?? '',
            firstName: data?.sheet.firstname ?? '',
            lastName: data?.sheet.lastname ?? '',
            gender: data?.details.gender ?? '',
            age: data?.details.age ?? 1,
            lvl: data?.sheet.lvl ?? 1,
            residence: data?.details.residence ?? '',
            birthPlace: data?.details.birthplace ?? '',
            occupation: data?.details.occupation ?? '',
            hit_point: data?.details.hit_point ?? 0,
            dying: data?.details.dying ?? false,
            unconscious: data?.details.unconsious ?? false,
            major_wounds: data?.details.major_wounds ?? 0,
            temp_insane: data?.details.temp_insane ?? 0,
            indef_insane: data?.details.indef_insane ?? 0,
            sanity: data?.details.sanity ?? 99,
            luck: data?.details.luck ?? 99,
            magic_points: data?.details.magic_points ?? 0,
            damage_bonus: data?.details.damage_bonus ?? 0,
            build: data?.details.build ?? 0,
            dodge: data?.details.dodge ?? 0,
            spending_lvl: data?.details.spending_lvl ?? 0,
            cash: data?.details.cash ?? 0,
            items: (data?.items ?? []).map((item) => ({
                id: item.id,
                sheet_id: item.sheet_id,
                label: item.label,
                quantity: item.quantity,
                weight: item.weight,
                description: item.description,
            })),
            notes: data?.details.notes ?? '',
            abilities: (data?.abilities ?? []).map((ability) => ({
                id: ability.id,
                abilities_id: ability.abilities_id,
                sheet_id: ability.sheet_id,
                value: ability.value,
                modifier: ability.modifier,
                label: ability.label,
            })),
            skills: (data?.skills ?? []).map((skill) => ({
                id: skill.id,
                skill_id: skill.skill_id,
                sheet_id: data?.sheet.id ?? 1,
                label: skill.label,
                value: skill.value,
                proficient: skill.proficient,
            })),
            weapons: (data?.weapons ?? []).map((weapon) => ({
                id: weapon.id,
                sheet_id: weapon.sheet_id,
                label: weapon.label,
                damage_type: weapon.damage_type,
                damage: weapon.damage,
                notes: weapon.notes
            })),
            personalDesc: data?.details.personal_desc ?? '',
            traits: data?.details.traits ?? '',
            believes: data?.details.believes ?? '',
            meaningfulLocation: data?.details.meaningful_location ?? '',
            treasuredPossession: data?.details.treasured_possession ?? '',
            injuriesScar: data?.details.injurie_scar ?? '',
            phobiaMania: data?.details.phobia_mania ?? '',
            tomeSpellsArtifacts: data?.details.tomes_spell_artifacts ?? '',
            encounters: data?.details.encounters ?? '',
            assets: data?.details.assets ?? '',
            fellowInvestigators: (data?.fellowInvestigators ?? []).map((investigator) => ({
                sheet_id: investigator.sheet_id,
                player: investigator.player,
                character: investigator.character,
                id: investigator.id,
            })),
        },
        onSubmit: async ({ value }) => {
            if (!data) return;

            const existingAbilities = data.abilities ?? [];
            const validAbilities = (value.abilities ?? []).filter(
                (ability) => ability && !isNaN(ability.value)
            )

            const abilitiesToPatch = validAbilities.filter(ability =>
                existingAbilities.some(existing => existing.id === ability.id)
            )

            const existingItems = data.items ?? [];
            const validItems = (value.items ?? []).filter(
                (item) => item.label.trim() !== ''
            )

            const itemsToPatch = validItems.filter(item =>
                existingItems.some(existing => existing.id === item.id)
            )

            const itemsToPost = validItems.filter(item =>
                !existingItems.some(existing => existing.id === item.id) &&
                !existingItems.some(existing =>
                    existing.sheet_id === data.sheet.id && existing.label === item.label
                )
            )

            const existingSkills = data.skills ?? [];
            const validSkills = (value.skills ?? []).filter(
                (skill) => skill.label.trim() !== '' && !isNaN(skill.value)
            );

            const skillsToPatch = validSkills.filter(skill =>
                existingSkills.some(existing => existing.id === skill.id)
            );

            const skillsToPost = validSkills.filter(skill =>
                !existingSkills.some(existing => existing.id === skill.id) &&
                !existingSkills.some(existing =>
                    existing.skill_id === skill.skill_id && existing.sheet_id === data.sheet.id
                )
            );

            const existingWeapons = data.weapons ?? [];
            const validWeapons = (value.weapons ?? []).filter(
                (weapon) => weapon.label.trim() !== '' && weapon.damage?.trim() !== ''
            );


            const weaponsToPatch = validWeapons.filter(weapon =>
                existingWeapons.some(existing => existing.id === weapon.id)
            )

            const weaponsToPost = validWeapons.filter(weapon =>
                !existingWeapons.some(existing => existing.id === weapon.id) &&
                !existingWeapons.some(
                    existing => existing.sheet_id === data.sheet.id && existing.label === weapon.label
                )
            );

            const payload: {
                sheet: {
                    id: number;
                    system_id: number;
                    firstname: string;
                    lastname: string;
                    avatar_src: string;
                    lvl: number;
                };
                details?: Sheet["details"];
                abilities?: Array<{
                    id: number;
                    abilities_id: number;
                    sheet_id: number;
                    value: number;
                    modifier: number;
                    label: string;
                    system_id: number;
                }>;
                items?: Array<{
                    id: number;
                    sheet_id: number;
                    label: string;
                    quantity: number;
                    weight: string | null;
                    description: string | null;
                }>;
                skill?: Array<{
                    id: number;
                    skill_id: number;
                    sheet_id: number;
                    label: string;
                    value: number;
                    proficient: boolean;
                    categories: string;
                }>;
                weapon?: Array<{ id: number; label: string; type: string; damage: string; notes: string }>;
                fellowInvestigators?: Array<{
                    sheet_id: number;
                    character: string;
                    player: string;
                    id: number;
                }>;
            } = {
                sheet: {
                    id: data.sheet.id,
                    system_id: data.sheet.system_id,
                    firstname: value.firstName,
                    lastname: value.lastName,
                    avatar_src: value.avatar,
                    lvl: value.lvl,
                },
                fellowInvestigators: (form.state.values.fellowInvestigators ?? []).map((investigator) => ({
                    sheet_id: investigator.sheet_id,
                    character: investigator.character,
                    player: investigator.player,
                    id: investigator.id,
                })),
            };

            payload.details = {
                id: data.details.id,
                sheet_id: data.details.sheet_id,
                occupation: value.occupation,
                age: value.age,
                gender: value.gender,
                residence: value.residence,
                birthplace: value.birthPlace,
                hit_point: value.hit_point,
                dying: value.dying,
                unconsious: value.unconscious,
                major_wounds: value.major_wounds,
                temp_insane: value.temp_insane,
                indef_insane: value.indef_insane,
                sanity: value.sanity,
                luck: value.luck,
                magic_points: value.magic_points,
                damage_bonus: value.damage_bonus,
                build: value.build,
                dodge: value.dodge,
                personal_desc: value.personalDesc,
                traits: value.traits,
                believes: value.believes,
                meaningful_location: value.meaningfulLocation,
                treasured_possession: value.treasuredPossession,
                injurie_scar: value.injuriesScar,
                phobia_mania: value.phobiaMania,
                tomes_spell_artifacts: value.tomeSpellsArtifacts,
                encounters: value.encounters,
                assets: value.assets,
                spending_lvl: value.spending_lvl,
                cash: value.cash,
                notes: value.notes,
            };

            try {
                // PATCH sans les skills vides
                const patchRes = await fetch(`https://apidnd.up.railway.app/api/sheet/${data.sheet.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!patchRes.ok) throw new Error('Erreur lors du PATCH');

                console.log('PATCH réussi : fiche mise à jour');

                // PATCH des caractéristique existantes
                if (abilitiesToPatch.length > 0) {
                    for (const ability of abilitiesToPatch) {
                        const bodyContent = {
                            id: ability.id,
                            abilities_id: ability.abilities_id,
                            sheet_id: data.sheet.id,
                            value: ability.value,
                            modifier: ability.modifier,
                            label: ability.label,
                        };

                        const patchAbilitiesRes = await fetch(`https://apidnd.up.railway.app/api/abilitiesSheet/${ability.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(bodyContent),
                        });

                        if (!patchAbilitiesRes.ok) throw new Error(`Erreur lors du PATCH de la caractéristique avec id ${ability.id}`);
                    }

                    console.log('PATCH des caractéristiques effectué');
                }

                // PATCH des items existants
                if (itemsToPatch.length > 0) {
                    for (const item of itemsToPatch) {
                        const bodyContent = {
                            id: item.id,
                            sheet_id: data.sheet.id,
                            label: item.label,
                            quantity: item.quantity,
                            weight: item.weight,
                            description: item.description,
                        };

                        const patchItemRes = await fetch(`https://apidnd.up.railway.app/api/inventoryItem/${item.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(bodyContent),
                        });

                        if (!patchItemRes.ok) throw new Error(`Erreur lors du PATCH de l'item avec id ${item.id}`);
                    }

                    console.log('PATCH des items effectué');
                }

                // POST si l'item est nouveau
                if (itemsToPost.length > 0) {
                    const url = `https://apidnd.up.railway.app/api/inventoryItem/multiple`;

                    const bodyContent = itemsToPost.map(item => ({
                        sheet_id: data.sheet.id,
                        label: item.label,
                        quantity: item.quantity,
                        weight: item.weight,
                        description: item.description,
                    }));

                    const postItemsRes = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bodyContent),
                    });

                    if (!postItemsRes.ok) throw new Error('Erreur lors du POST des items');

                    console.log('POST des items effectué');
                }

                // PATCH des compétences existantes
                if (skillsToPatch.length > 0) {
                    for (const skill of skillsToPatch) {
                        const bodyContent = {
                            id: skill.id,
                            skill_id: skill.skill_id,
                            sheet_id: data.sheet.id,
                            value: skill.value,
                            proficient: skill.proficient,
                        };

                        const patchRes = await fetch(`https://apidnd.up.railway.app/api/skillSheet/${skill.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(bodyContent),
                        });

                        if (!patchRes.ok) throw new Error(`Erreur lors du PATCH de la compétence avec id ${skill.id}`);
                    }

                    console.log('PATCH des compétences effectué');
                }

                // POST si la compétence est nouvelle
                if (skillsToPost.length > 0) {
                    const url = `https://apidnd.up.railway.app/api/skillSheet/multiple`;

                    const bodyContent = skillsToPost.map(skill => ({
                        skill_id: skill.skill_id,
                        sheet_id: data.sheet.id,
                        value: skill.value,
                        proficient: skill.proficient,
                    }));

                    const postRes = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bodyContent),
                    });

                    if (!postRes.ok) throw new Error('Erreur lors du POST des compétences');

                    console.log('POST des compétences effectué');
                }

                // PATCH des armes existantes
                if (weaponsToPatch.length > 0) {
                    for (const weapon of weaponsToPatch) {
                        const bodyContent = {
                            id: weapon.id,
                            sheet_id: data.sheet.id,
                            label: weapon.label,
                            damage_type: weapon.damage_type,
                            damage: weapon.damage,
                            notes: weapon.notes,
                        };

                        const patchRes = await fetch(`https://apidnd.up.railway.app/api/weaponSheet/${weapon.id}`, {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(bodyContent),
                        });

                        if (!patchRes.ok) throw new Error(`Erreur lors du PATCH de l'arme avec id ${weapon.id}`);
                    }

                    console.log('PATCH des armes effectué');
                }

                // POST si l'arme est nouvelle
                if (weaponsToPost.length > 0) {
                    const url = `https://apidnd.up.railway.app/api/weaponSheet/multiple`;

                    const bodyContent = weaponsToPost.map(weapon => ({
                        sheet_id: data.sheet.id,
                        label: weapon.label,
                        damage: weapon.damage,
                        damage_type: weapon.damage_type,
                        notes: weapon.notes,
                    }))

                    const postWeaponsRes = await fetch(url, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(bodyContent),
                    })

                    if (!postWeaponsRes.ok) throw new Error('Erreur lors du POST des armes');

                    console.log('POST des armes effectué')
                }

                window.location.href = `/myCharacters/${data.sheet.id}`;
            } catch (err) {
                console.error('Erreur API :', err);
            }
        },
    })

    const skillsCoC = useSkillCoCFiltered();

    if (
        !data || isLoading
        || !skillsCoC.data || skillsCoC.isLoading
    ) return <p>Chargement...</p>

    return (
        <form
            className="relative w-full flex flex-wrap justify-between"
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-y-[40px]">
                {/* Avatar */}
                <form.Field name="avatar">
                    {(field) => (
                        <div>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Avatar
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez l'url de votre avatar"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Level */}
                <form.Field name="lvl">
                    {(field) => (
                        <div className="w-[240px]">
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Niveau
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 1}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre nvieau"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-x-[16px] gap-y-[40px]">
                {/* Choix du prénom */}
                <form.Field name="firstName">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Prénom
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre prénom"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du nom de famille */}
                <form.Field name="lastName">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Nom de famille
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre nom de famille"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de l'âge*/}
                <form.Field name="age">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Âge
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 1}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre âge"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du genre */}
                <form.Field name="gender">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Genre
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre genre"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
                {/* Choix du lieu de résidence */}
                <form.Field name="residence">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Résidence
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre lieu de résidence"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du lieu de naissance */}
                <form.Field name="birthPlace">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Lieu de naissance
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre lieu de naissance"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de l'emploi */}
                <form.Field name="occupation">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Profession
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre profession"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Abilities */}
            <div className='w-full flex flex-wrap justify-between my-[80px] gap-[16px]'>
                <label className="block w-full text-xl font-uncial-antiqua mb-[8px] underline">
                    Caractéristiques
                </label>

                {form.state.values.abilities.map((_, index) => (
                    <div key={index} className="w-[240px]">
                        {/* Sélection de la capacité */}
                        <form.Field name={`abilities[${index}].label`}>
                            {(field) => (
                                <label className="font-uncial-antiqua text-lg">{field.state.value}</label>
                            )}
                        </form.Field>

                        {/* Valeur */}
                        <form.Field name={`abilities[${index}].value`}>
                            {(field) => (
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    value={field.state.value ?? ''}
                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                    className="w-full p-[8px] mt-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Valeur"
                                />
                            )}
                        </form.Field>

                        {/* Modificateur */}
                        <form.Field name={`abilities[${index}].modifier`}>
                            {(field) => (
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    value={field.state.value ?? ''}
                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                    className="w-full p-[8px] mt-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Modificateur"
                                />
                            )}
                        </form.Field>
                    </div>
                ))}
            </div>

            <div className="w-full gap-[16px] flex flex-wrap justify-between my-[40px] gap-y-[40px]">
                {/* Choix des dommages */}
                <form.Field name="hit_point">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Dommages
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre prénom"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix si mourant ou pas */}
                <form.Field name="dying">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block w-full text-center text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Êtes-vous mourant ?
                            </label>
                            <input
                                type="checkbox"
                                name={field.name}
                                id={field.name}
                                checked={field.state.value ?? false}
                                onChange={(e) => field.handleChange(e.target.checked ? true : false)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix si inconscient ou pas */}
                <form.Field name="unconscious">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block  w-full text-center text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Êtes-vous inconscient ?
                            </label>
                            <input
                                type="checkbox"
                                name={field.name}
                                id={field.name}
                                checked={field.state.value ?? false}
                                onChange={(e) => field.handleChange(e.target.checked ? true : false)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des blessures majeures */}
                <form.Field name="major_wounds">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Blessures majeures
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre genre"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full gap-[16px] flex flex-wrap justify-between my-[40px] gap-y-[40px]">
                {/* Choix de la folie */}
                <form.Field name="temp_insane">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Folie temporaire
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre folie temporaire"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de la folie persistante */}
                <form.Field name="indef_insane">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Folie persistante
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre folie persistante"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de la santé mentale */}
                <form.Field name="sanity">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Santé mentale
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre santé mentale"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de la chance */}
                <form.Field name="luck">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Chance
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre chance"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full gap-[16px] flex flex-wrap justify-between my-[40px] gap-y-[40px]">
                {/* Choix des points magiques */}
                <form.Field name="magic_points">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Points magiques
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre folie temporaire"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des dégâts bonus */}
                <form.Field name="damage_bonus">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Bonus de dégâts
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre folie persistante"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de la carrure */}
                <form.Field name="build">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Carrure
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre carrure"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de l'esquive */}
                <form.Field name="dodge">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Esquive
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre esquive"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Armes */}
            <div className="w-full my-[40px]">
                <label className="block text-xl font-uncial-antiqua mb-[8px]">Armes</label>

                <div className="w-full flex flex-col gap-4">
                    {form.state.values.weapons.map((_, index) => (
                        <div key={index} className="flex flex-wrap gap-[8px]">
                            {/* ID */}
                            <form.Field name={`weapons[${index}].id`}>
                                {(field) => (
                                    <input
                                        type="text"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ''}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        className="size-[40px] text-center text-xl bg-primary rounded-lg border border-secondary cursor-not-allowed"
                                        disabled
                                    />
                                )}
                            </form.Field>

                            <div className="flex flex-wrap flex-1 gap-[8px]">
                                {/* Nom */}
                                <form.Field name={`weapons[${index}].label`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Nom de l'arme ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Types de dommage */}
                                <form.Field name={`weapons[${index}].damage_type`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Type de dégâts de l'arme ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Dégâts */}
                                <form.Field name={`weapons[${index}].damage`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Dégâts de l'arme ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Notes */}
                                <form.Field name={`weapons[${index}].notes`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Notes de l'arme ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Supprimer une arme */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedWeapons = [...form.state.values.weapons]
                                        updatedWeapons.splice(index, 1)
                                        form.setFieldValue('weapons', updatedWeapons)
                                        setWeaponCount((c) => c - 1)
                                    }}
                                    className="size-[40px] text-background bg-red-600 hover:bg-background hover:text-red-600 hover:outline-2 hover:outline-red-600 p-2 rounded text-lg cursor-pointer"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Ajouter une nouvelle arme */}
                    <button
                        type="button"
                        onClick={() => {
                            const current = form.state.values.weapons ?? []
                            const maxId = current.reduce((max, weapon) => Math.max(max, weapon.id ?? 0), 0);
                            form.setFieldValue('weapons', [
                                ...current,
                                {
                                    id: maxId + 1,
                                    sheet_id: data?.sheet.id,
                                    label: '',
                                    damage_type: '',
                                    damage: '',
                                    notes: '',
                                },
                            ])
                            setWeaponCount((w) => w + 1)
                        }}
                        className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-2xl"></i>
                    </button>
                </div>
            </div>

            {/* Compétences */}
            <div className="w-full my-[40px]">
                <label className="block text-xl font-uncial-antiqua mb-[8px]">
                    Compétences de l'aventurier
                </label>

                <div className="w-full flex flex-col gap-4">
                    {form.state.values.skills.map((_, index) => (
                        <div key={index} className="flex flex-wrap gap-[8px]">
                            {/* Nom */}
                            <form.Field name={`skills[${index}].label`}>
                                {(field) => (
                                    <select
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ''}
                                        onChange={(e) => {
                                            const selectedLabel = e.target.value;
                                            const selectedSkill = skillsCoC.data.find(skill => skill.label === selectedLabel);

                                            field.handleChange(selectedLabel);

                                            if (selectedSkill) {
                                                const updatedSkills = [...form.state.values.skills];
                                                updatedSkills[index] = {
                                                    ...updatedSkills[index],
                                                    label: selectedLabel,
                                                    skill_id: selectedSkill.id,
                                                };
                                                form.setFieldValue('skills', updatedSkills);
                                            }
                                        }}
                                        className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                    >
                                        <option value="">Sélectionner une compétence</option>
                                        {skillsCoC.data.map((skill) => (
                                            <option key={skill.id} value={skill.label}>
                                                {skill.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </form.Field>

                            <form.Field name={`skills[${index}].proficient`}>
                                {(field) => (
                                    <label className="flex items-center text-lg gap-[8px] mx-[16px]">
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            id={field.name}
                                            checked={field.state.value ?? false}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                            className="hidden"
                                        />
                                        <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                            {field.state.value && (
                                                <i className="fa-solid fa-check text-accent"></i>
                                            )}
                                        </span>
                                        Maîtrise ?
                                    </label>
                                )}
                            </form.Field>

                            {/* Valeur */}
                            <form.Field name={`skills[${index}].value`}>
                                {(field) => (
                                    <input
                                        type="number"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ''}
                                        onChange={(e) => field.handleChange(Number(e.target.value))}
                                        className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                        placeholder={`Points de la compétence ${index + 1}`}
                                    />
                                )}
                            </form.Field>

                            {/* Supprimer une compétence */}
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedSkills = [...form.state.values.skills]
                                    updatedSkills.splice(index, 1)
                                    form.setFieldValue('skills', updatedSkills)
                                    setSkillsCount((c) => c - 1)
                                }}
                                className="size-[40px] text-background bg-red-600 hover:bg-background hover:text-red-600 hover:outline-2 hover:outline-red-600 p-2 rounded text-lg cursor-pointer"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => {
                            const current = form.state.values.skills ?? [];
                            const maxId = current.reduce((max, skill) => Math.max(max, skill.id ?? 0), 0);

                            form.setFieldValue('skills', [
                                ...current,
                                {
                                    id: maxId + 1,
                                    skill_id: 0,
                                    label: '',
                                    value: 0,
                                    proficient: false,
                                    sheet_id: 1,
                                }
                            ]);

                            setSkillsCount((s) => s + 1)
                        }}
                        className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-2xl"></i>
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
                {/* Description */}
                <form.Field name="personalDesc">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Description
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Décrivez votre personnage"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Description des traits */}
                <form.Field name="traits">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Traits de caractère
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Décrivez les traits de caractère de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
                {/* Idéologie et croyances */}
                <form.Field name="believes">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Idéologie et croyances
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Décrivez l'idéologie et les croyances de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Lieux importants */}
                <form.Field name="meaningfulLocation">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Lieux importants
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Listez les lieux importants à votre personnage"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
                {/* Biens Précieux */}
                <form.Field name="treasuredPossession">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Biens précieux
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Listez les biens précieux de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Cicatrices et blessures */}
                <form.Field name="injuriesScar">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Cicatrices et blessures
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Décrivez les cicatrices et blessures de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
                {/* Phobie et manies */}
                <form.Field name="phobiaMania">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Phobies et manies
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Listez les phobies et manies de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Ouvrages, sorts et artefacts */}
                <form.Field name="tomeSpellsArtifacts">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Ouvrages occultes, sorts et artefacts
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Listez les ouvrages occultes, sorts et artefacts de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
                {/* Rencontres importantes */}
                <form.Field name="encounters">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Rencontres importantes
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Listez les rencontres importantes de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Possessions */}
                <form.Field name="assets">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Possessions
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Listez les bien précieux de votre personnage"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
                {/* Niveau de dépense */}
                <form.Field name="spending_lvl">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Niveau de dépense
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos niveaux de dépense"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Revenus */}
                <form.Field name="cash">
                    {(field) => (
                        <div className="flex-1">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Revenus
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos revenus"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Items */}
            <div className="w-full my-[40px]">
                <label className="block text-xl font-uncial-antiqua mb-[8px]">Objets de l'inventaire</label>

                <div className="w-full flex flex-col gap-4">
                    {form.state.values.items.map((_, index) => (
                        <div key={index} className="flex flex-wrap gap-[8px]">
                            <div className="flex flex-wrap flex-1 gap-[8px]">
                                {/* ID */}
                                <form.Field name={`items[${index}].id`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            className="size-[40px] text-center text-xl bg-primary rounded-lg border border-secondary cursor-not-allowed"
                                            disabled
                                        />
                                    )}
                                </form.Field>

                                {/* Nom */}
                                <form.Field name={`items[${index}].label`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Nom de l'item ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Quantité */}
                                <form.Field name={`items[${index}].quantity`}>
                                    {(field) => (
                                        <input
                                            type="number"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? 1}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Quantité de l'item ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Poids */}
                                <form.Field name={`items[${index}].weight`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? 0}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Poids de l'item ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Description */}
                                <form.Field name={`items[${index}].description`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? 0}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Description de l'item ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Supprimer un item */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedItems = [...form.state.values.items]
                                        updatedItems.splice(index, 1)
                                        form.setFieldValue('items', updatedItems)
                                        setItemsCount((i) => i - 1)
                                    }}
                                    className="size-[40px] text-background bg-red-600 hover:bg-background hover:text-red-600 hover:outline-2 hover:outline-red-600 p-2 rounded text-lg cursor-pointer"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Ajouter un nouvel item */}
                    <button
                        type="button"
                        onClick={() => {
                            const current = form.state.values.items ?? []
                            const maxId = current.reduce((max, item) => Math.max(max, item.id ?? 0), 0);
                            form.setFieldValue('items', [
                                ...current,
                                {
                                    id: maxId + 1,
                                    sheet_id: data?.sheet.id,
                                    label: '',
                                    quantity: 1,
                                    weight: '',
                                    description: '',
                                },
                            ])
                            setItemsCount((i) => i + 1)
                        }}
                        className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-2xl"></i>
                    </button>
                </div>
            </div>

            {/* Amis investigateurs */}
            <div className="w-full my-[40px]">
                <label className="block text-xl font-uncial-antiqua mb-[8px]">
                    Amis investigateurs
                </label>

                <div className="w-full flex flex-col gap-4">
                    {form.state.values.fellowInvestigators?.map((_, index) => (
                        <div key={index} className="flex flex-wrap gap-[8px]">
                            {/* Nom */}
                            <form.Field name={`fellowInvestigators[${index}].character`}>
                                {(field) => (
                                    <input
                                        type="text"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ""}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                        placeholder={`Nom du personnage ${index + 1}`}
                                    />
                                )}
                            </form.Field>

                            {/* Joueur */}
                            <form.Field name={`fellowInvestigators[${index}].player`}>
                                {(field) => (
                                    <input
                                        type="text"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ""}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                        placeholder={`Joueur du personnage ${index + 1}`}
                                    />
                                )}
                            </form.Field>

                            {/* Supprimer un ami investigateur */}
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedFellowInvestigators = [
                                        ...form.state.values.fellowInvestigators,
                                    ];
                                    updatedFellowInvestigators.splice(index, 1);
                                    form.setFieldValue("fellowInvestigators", updatedFellowInvestigators);
                                    setFellowInvestigators((c) => c - 1);
                                }}
                                className="size-[40px] text-background bg-red-600 hover:bg-background hover:text-red-600 hover:outline-2 hover:outline-red-600 p-2 rounded text-lg cursor-pointer"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}

                    {/* Ajouter un ami investigateur */}
                    <button
                        type="button"
                        onClick={() => {
                            const current = form.state.values.fellowInvestigators ?? [];
                            const maxId = current.reduce((max, investigator) => Math.max(max, investigator.id ?? 0), 0);
                            form.setFieldValue("fellowInvestigators", [
                                ...current,
                                {
                                    id: maxId + 1,
                                    sheet_id: data.sheet.id,
                                    character: "",
                                    player: "",
                                },
                            ]);
                            setFellowInvestigators((i) => i + 1);
                        }}
                        className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-2xl"></i>
                    </button>
                </div>
            </div>


            {/* Notes */}
            <form.Field name="notes">
                {(field) => (
                    <div className='my-[40px] w-full'>
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Notes
                        </label>
                        <textarea
                            name={field.name}
                            id={field.name}
                            value={field.state.value ?? ''}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Entrez vos notes"
                        />
                    </div>
                )}
            </form.Field>

            {/* Bouton de soumission */}
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit} className="btn btn-text my-[40px]">
                        {isSubmitting ? '...' : 'Mettre à jour la fiche'}
                    </button>
                )}
            </form.Subscribe>
        </form>
    )
}