import { useForm } from "@tanstack/react-form"
import { useState } from "react"

import type { Sheet } from "../../api/sheetApi"

import { useSheets } from "../../api/sheetApi"
import { useSpecies, useSubSpecies } from "../../api/DnD/speciesDnDApi"
import { useClass, useSubClass } from "../../api/DnD/classDnDApi"
import { useOrigin } from "../../api/DnD/originDnDApi"
import { useLanguage } from "../../api/DnD/languageDnDApi"
import { useSkillDnDFiltered } from "../../api/DnD/skillDnDApi"

export default function UpdateSheetDnD(props: { sheetId: number }) {
    const { data, isLoading } = useSheets(props.sheetId)
    const speciesDnD = useSpecies();
    const subSpeciesDnD = useSubSpecies();
    const classDnD = useClass();
    const subClassDnD = useSubClass();
    const originDnD = useOrigin();
    const languageDnD = useLanguage();
    const skillsDnD = useSkillDnDFiltered();

    const [, setLanguageCount] = useState(1);
    const [, setSkillsCount] = useState(1);

    const form = useForm({
        defaultValues: {
            avatar: data?.sheet.avatar_src ?? '',
            firstName: data?.sheet.firstname ?? '',
            lastName: data?.sheet.lastname ?? '',
            alignment: data?.details.alignment ?? '',
            race: data?.details.species_id ?? 1,
            subRace: data?.details.sub_species_id ?? null,
            classDnd: data?.details.classe_id ?? 1,
            subClass: data?.details.sub_classe_id ?? 1,
            historic: data?.details.origin_id ?? 1,
            toolsHistoric1: data?.details.tools_prof?.split(',')[0]?.trim() ?? "",
            toolsHistoric2: data?.details.tools_prof?.split(',')[1]?.trim() ?? "",
            lvl: data?.sheet.lvl ?? 1,
            exp: data?.details.exp ?? 0,
            language: (data?.language ?? []).map((lang) => ({
                id: lang.id,
                sheet_id: data?.sheet.id,
                language_id: lang.language_id,
                label: lang.label,
            })),
            abilities: (data?.abilities ?? []).map((ability) => ({
                id: ability.id,
                abilities_id: ability.abilities_id,
                sheet_id: ability.sheet_id,
                value: ability.value,
                modifier: ability.modifier,
                label: ability.label,
            })),
            skills: (data?.skill ?? []).map((skill) => ({
                id: skill.id,
                skill_id: skill.skill_id,
                sheet_id: data?.sheet.id,
                label: skill.label,
                value: skill.value,
                proficient: skill.proficient,
            })),
            minorSpell: "",
            lvlOneSpell: "",
            armors: [""],
            weapons: [
                {
                    id: 1,
                    label: "",
                    type: "",
                    bonus: 0,
                    damage: 0,
                    damageType: "",
                    notes: "",
                },
            ],
            appareance: "",
            lore: "",
            characterTraits: "",
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

            const existingSkills = data.skill ?? [];
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
                skill?: Array<{
                    id: number;
                    skill_id: number;
                    sheet_id: number;
                    label: string;
                    value: number;
                    proficient: boolean;
                    categories: string;
                }>;
                language?: Array<{ id: number; sheet_id: number; language_id: number; }>,
                weapon?: Array<{ id: number; label: string; type: string; bonus: number; damage: number; damageType: string; notes: string }>;
            } = {
                sheet: {
                    id: data.sheet.id,
                    system_id: data.sheet.system_id,
                    firstname: value.firstName,
                    lastname: value.lastName,
                    avatar_src: value.avatar,
                    lvl: value.lvl,
                },
                language: (form.state.values.language ?? []).map((lang) => ({
                    id: lang.id,
                    sheet_id: data.sheet.id,
                    language_id: lang.language_id,
                })),
            };

            payload.details = {
                id: data.details.id,
                sheet_id: data.details.sheet_id,
                alignment: value.alignment,
                species_id: value.race,
                sub_species_id: value.subRace,
                classe_id: value.classDnd,
                sub_classe_id: value.subClass,
                origin_id: value.historic,
                tools_prof: value.toolsHistoric2
                    ? `${value.toolsHistoric1}, ${value.toolsHistoric2}`
                    : value.toolsHistoric1,
                exp: value.exp,
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
            } catch (err) {
                console.error('Erreur API :', err);
            }
        },
    });

    if (
        isLoading ||
        !data ||
        subSpeciesDnD.isLoading ||
        !subSpeciesDnD.data ||
        speciesDnD.isLoading ||
        !speciesDnD.data ||
        classDnD.isLoading ||
        !classDnD.data ||
        subClassDnD.isLoading ||
        !subClassDnD.data ||
        originDnD.isLoading ||
        !originDnD.data ||
        languageDnD.isLoading ||
        !languageDnD.data ||
        skillsDnD.isLoading ||
        !skillsDnD.data
    ) {
        return <p>Chargement...</p>;
    }

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
                        <div className="w-[240px]">
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Avatar
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
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

                {/* Expérience */}
                <form.Field name="exp">
                    {(field) => (
                        <div className="w-[240px]">
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Expérience
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 1}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre expérience"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-y-[40px]">
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
                                Nom de famille{" "}
                                <i className="font-crimson-text text-sm">(facultatif)</i>
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

                {/* Choix de l'alignement */}
                <form.Field name="alignment">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Alignement
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre alignement"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Champ race + sous-race */}
            <form.Field name="race">
                {(field) => {
                    const selectedRace = speciesDnD.data.find((race) => race.id === field.state.value);
                    const availableSubSpecies = subSpeciesDnD.data.filter(
                        (race) => race.species_id === selectedRace?.id
                    );

                    return (
                        <div className="w-full my-[40px]">
                            <label className="block text-xl font-uncial-antiqua mb-[8px]">
                                Race
                            </label>
                            <fieldset className="flex flex-wrap justify-start gap-[8px] bg-primary rounded-[3px] p-[8px]">
                                {speciesDnD.data.map((race) => (
                                    <div key={race.id}>
                                        <label className="flex items-center gap-2 w-[150px]">
                                            <input
                                                type="radio"
                                                value={race.id}
                                                checked={field.state.value === race.id}
                                                onChange={() => {
                                                    field.handleChange(race.id); // Met à jour la race

                                                    const hasSubSpecies = subSpeciesDnD.data.some((sub) => sub.species_id === race.id);
                                                    if (!hasSubSpecies) {
                                                        form.setFieldValue("subRace", null); // Réinitialise subRace
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                {field.state.value === race.id && (
                                                    <i className="fa-solid fa-check text-accent"></i>
                                                )}
                                            </span>
                                            {race.label}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                            {availableSubSpecies && availableSubSpecies.length > 0 && (
                                <form.Field name="subRace">
                                    {(field) => {
                                        return (
                                            <div className="w-full">
                                                <label className="block text-xl font-uncial-antiqua mt-[40px] mb-[8px]">
                                                    Sous-race
                                                </label>
                                                <fieldset className="flex flex-wrap justify-start gap-[8px] bg-primary rounded-[3px] p-[8px]">
                                                    {availableSubSpecies.map((race) => (
                                                        <>
                                                            <div key={race.id}>
                                                                <label className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        value={race.id}
                                                                        checked={
                                                                            field.state.value === race.id
                                                                        }
                                                                        onChange={() =>
                                                                            field.handleChange(race.id)
                                                                        }
                                                                        className="hidden"
                                                                    />
                                                                    <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                                        {field.state.value ===
                                                                            race.id && (
                                                                                <i className="fa-solid fa-check text-accent"></i>
                                                                            )}
                                                                    </span>
                                                                    {race.label}
                                                                </label>
                                                            </div>
                                                        </>
                                                    ))}
                                                </fieldset>
                                            </div>
                                        );
                                    }}
                                </form.Field>
                            )}
                        </div>
                    );
                }}
            </form.Field>

            {/* Champ classe + sous-classe */}
            <form.Field name="classDnd">
                {(classField) => {
                    const selectedClass = classDnD.data.find(
                        (cls) => cls.id === classField.state.value
                    );
                    const availableSubClasses = subClassDnD.data.filter(
                        (cls) => cls.classe_dnd_id === selectedClass?.id
                    );

                    return (
                        <div className="w-full my-[40px]">
                            <label className="block text-xl font-uncial-antiqua mb-[8px]">
                                Classe
                            </label>
                            <fieldset className="flex flex-wrap gap-[8px] justify-start bg-primary rounded-[3px] p-[8px]">
                                {classDnD.data.map((cls) => (
                                    <div key={cls.id}>
                                        <label className="flex items-center gap-2 w-[150px]">
                                            <input
                                                type="radio"
                                                value={cls.id}
                                                checked={classField.state.value === cls.id}
                                                onChange={() =>
                                                    classField.handleChange(cls.id)
                                                }
                                                className="hidden"
                                            />
                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                {classField.state.value === cls.id && (
                                                    <i className="fa-solid fa-check text-accent"></i>
                                                )}
                                            </span>
                                            {cls.label}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>

                            {availableSubClasses && availableSubClasses.length > 0 && (
                                <form.Field name="subClass">
                                    {(field) => (
                                        <div className="w-full">
                                            <label className="block text-xl font-uncial-antiqua mt-[40px] mb-[8px]">
                                                Sous-classe
                                            </label>
                                            <fieldset className="flex flex-wrap gap-[8px] justify-start bg-primary rounded-[3px] p-[8px]">
                                                {availableSubClasses.map((cls) => (
                                                    <div key={cls.id}>
                                                        <label className="flex items-center gap-2 w-[200px]">
                                                            <input
                                                                type="radio"
                                                                value={cls.id}
                                                                checked={
                                                                    field.state.value === cls.id
                                                                }
                                                                onChange={() =>
                                                                    field.handleChange(cls.id)
                                                                }
                                                                className="hidden"
                                                            />
                                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                                {field.state.value === cls.id && (
                                                                    <i className="fa-solid fa-check text-accent"></i>
                                                                )}
                                                            </span>
                                                            {cls.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </fieldset>
                                        </div>
                                    )}
                                </form.Field>
                            )}
                        </div>
                    );
                }}
            </form.Field>

            <div className="w-full flex flex-wrap justify-between my-[40px] gap-y-[40px]">
                {/* Choix de l'historique */}
                <form.Field name="historic">
                    {(field) => (
                        <div className="w-[240px]">
                            <label
                                htmlFor={field.name}
                                className="block text-xl font-uncial-antiqua mb-[8px]"
                            >
                                Historique
                            </label>
                            <select
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => {
                                    field.handleChange(Number(e.target.value));
                                }}
                                className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                            >
                                <option value="">Sélectionner un historique</option>
                                {originDnD.data.map((origin) => (
                                    <option key={origin.id} value={origin.id}>
                                        {origin.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </form.Field>

                {/* Choix des outils selon l'historique */}
                <div className="w-fit">
                    <form.Field name="toolsHistoric1">
                        {(field) => (
                            <>
                                <label
                                    htmlFor={field.name}
                                    className="block text-xl font-uncial-antiqua mb-[8px]"
                                >
                                    Outils offerts par l'historique
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    id={field.name}
                                    value={field.state.value ?? ''}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Entrez votre outil selon votre historique"
                                />
                            </>
                        )}
                    </form.Field>

                    <form.Field name="toolsHistoric2">
                        {(field) => (
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full mt-[8px] p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre second outil selon votre historique"
                            />
                        )}
                    </form.Field>
                </div>

                {/* Choix des langues */}
                <div className="w-fit">
                    <label className="block w-[240px] text-xl font-uncial-antiqua mb-[8px]">
                        Langues
                    </label>

                    <div className="w-full flex flex-wrap flex-col justify-start gap-[8px]">
                        {/* Choix d'une/de plusieurs langue(s) */}
                        {form.state.values.language.map((_, index) => (
                            <div key={index} className="flex flex-wrap w-[240px] justify-between gap-[8px]">
                                <form.Field name={`language[${index}].label`}>
                                    {(field) => (
                                        <select
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => {
                                                const selectedLabel = e.target.value;
                                                const selectedLanguage = languageDnD.data.find(lang => lang.label === selectedLabel);
                                                field.handleChange(selectedLabel);

                                                if (selectedLanguage) {
                                                    const updatedLanguages = [...form.state.values.language];
                                                    updatedLanguages[index] = {
                                                        ...updatedLanguages[index],
                                                        label: selectedLabel,
                                                        language_id: selectedLanguage.id,
                                                    }

                                                    form.setFieldValue('language', updatedLanguages);
                                                }
                                            }}
                                            className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                                        >
                                            <option value="">Sélectionner une langue</option>
                                            {languageDnD.data.map((language) => (
                                                <option key={language.id} value={language.label}>
                                                    {language.label}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </form.Field>

                                {/* Supprimer une langue */}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedLanguages = form.state.values.language.filter((_, i) => i !== index);
                                        form.setFieldValue('language', updatedLanguages);
                                    }}
                                    className="size-[40px] text-background bg-red-600 hover:bg-background hover:text-red-600 hover:outline-2 hover:outline-red-600 p-2 rounded text-lg cursor-pointer"
                                >
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        ))}

                        {/* Ajouter un champ de langue */}
                        <button
                            type="button"
                            onClick={() => {
                                const current = form.state.values.language ?? [];
                                const maxId = current.reduce((max, lang) => Math.max(max, lang.id ?? 0), 0);
                                form.setFieldValue("language", [
                                    ...current,
                                    {
                                        id: maxId + 1,
                                        sheet_id: data?.sheet.id,
                                        label: '',
                                        language_id: 1,
                                    },
                                ]);
                                setLanguageCount((l) => l + 1);
                            }}
                            className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
                        >
                            <i className="fa-solid fa-plus text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Abilities */}
            <div className='w-full flex flex-wrap justify-start my-[80px] gap-[16px]'>
                <label className="block w-full text-xl font-uncial-antiqua mb-[8px] underline">
                    Caractéristiques
                </label>

                {form.state.values.abilities.map((_, index) => (
                    <div key={index} className="flex-1">
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
                                            const selectedSkill = skillsDnD.data.find(skill => skill.label === selectedLabel);

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
                                        {skillsDnD.data.map((skill) => (
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

            {/* Bouton de soumission */}
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit} className="btn btn-text mt-[40px]">
                        {isSubmitting ? '...' : 'Mettre à jour la fiche'}
                    </button>
                )}
            </form.Subscribe>
        </form >
    )
}