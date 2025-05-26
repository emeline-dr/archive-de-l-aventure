import { useForm } from "@tanstack/react-form"
import { useState } from "react"

import type { Sheet } from "../../api/sheetApi"

import { useSheets } from "../../api/sheetApi"
import { useClan } from "../../api/L5R/clanL5RApi"
import { useFamily } from "../../api/L5R/familyL5RApi"
import { useSchool } from "../../api/L5R/schoolL5RApi"
import { useSkillL5RFiltered } from "../../api/L5R/skillL5RApi"

export default function UpdateSheetL5R(props: { sheetId: number }) {
    const { data, isLoading } = useSheets(props.sheetId)

    const [, setSkillsCount] = useState(0);

    const form = useForm({
        defaultValues: {
            avatar: data?.sheet.avatar_src ?? '',
            firstName: data?.sheet.firstname ?? '',
            lastName: data?.sheet.lastname ?? '',
            clan: data?.clanL5R?.label ?? '',
            family: data?.familyL5R?.label ?? '',
            school: data?.schoolL5R?.label ?? '',
            rankSchool: data?.details.school_rank ?? '',
            ninjo: data?.details.ninjo ?? '',
            giri: data?.details.giri ?? '',
            distinctions: data?.details.distinctions ?? '',
            passions: data?.details.passions ?? '',
            anxieties: data?.details.anxieties ?? '',
            personalityHabitsQuirks: data?.details.personality_habits_quirks ?? '',
            expTotal: data?.details.exp_total ?? 0,
            expSaved: data?.details.exp_saved ?? 0,
            expoSpend: data?.details.expo_spent ?? 0,
            endurance: data?.details.endurance ?? 0,
            enduranceFatigue: data?.details.endurance_fatigue ?? 0,
            composure: data?.details.composure ?? 0,
            composureStrife: data?.details.composure_strife ?? 0,
            focus: data?.details.focus ?? 0,
            vigilance: data?.details.vigilance ?? 0,
            voidPointsMax: data?.details.void_points_max ?? 0,
            voidPointsCurrent: data?.details.void_points_current ?? 0,
            skills: [
                {
                    id: 1,
                    skill_id: 0,
                    sheet_id: data?.sheet.id ?? 0,
                    label: '',
                    value: 0,
                    proficient: false,
                    categories: '',
                },
            ],
            koku: data?.details.koku ?? 0,
            zeni: data?.details.zeni ?? 0,
            bu: data?.details.bu ?? 0,
            Adv: data?.details.adv ?? '',
            DisAdv: data?.details.disadv ?? '',
            conditions: data?.details.conditions ?? '',
            SchoolAbilities: data?.details.school_abilities ?? '',
            techniquesNewActions: data?.details.techniques_new_actions ?? '',
            techniquesNewFlower: data?.details.techniques_new_flower ?? '',
            armors: [''],
            weapons: [
                {
                    id: 1,
                    name: '',
                    damage: '',
                    notes: '',
                },
            ],
        },
        onSubmit: async ({ value }) => {
            if (!data) return;

            const payload: {
                sheet: {
                    id: number;
                    system_id: number;
                    firstname: string;
                    lastname: string;
                    avatar_src: string;
                };
                details?: Sheet["details"];
                skill?: Array<{ id: number; label: string; value: number }>;
                weapon?: Array<{ id: number; label: string; damage: string; notes: string }>;
                clanL5R?: { label: string; }
                familyL5R?: { label: string; }
                schoolL5R?: { label: string; }
            } = {
                sheet: {
                    id: data.sheet.id,
                    system_id: data.sheet.system_id,
                    firstname: value.firstName,
                    lastname: value.lastName,
                    avatar_src: value.avatar,
                },
            };

            const clanId = clansL5R.data ? clansL5R.data.find(clan => clan.label === value.clan)?.id : undefined;
            const familyId = familiesL5R.data ? familiesL5R.data.find(family => family.label === value.family)?.id : undefined;
            const schoolId = schoolsL5R.data ? schoolsL5R.data.find(school => school.label === value.school)?.id : undefined;

            payload.details = {
                id: data.details.id,
                sheet_id: data.details.sheet_id,
                clan_id: clanId,
                family_id: familyId,
                school_id: schoolId,
                school_rank: Number(value.rankSchool) || 0,
                ninjo: value.ninjo,
                giri: value.giri,
                distinctions: value.distinctions,
                passions: value.passions,
                anxieties: value.anxieties,
                personality_habits_quirks: value.personalityHabitsQuirks,
                exp_total: value.expTotal,
                exp_saved: value.expSaved,
                expo_spent: value.expoSpend,
                endurance: value.endurance,
                endurance_fatigue: value.enduranceFatigue,
                composure: value.composure,
                composure_strife: value.composureStrife,
                focus: value.focus,
                vigilance: value.vigilance,
                void_points_max: value.voidPointsMax,
                void_points_current: value.voidPointsCurrent,
                koku: value.koku,
                zeni: value.zeni,
                bu: value.bu,
                adv: value.Adv,
                disadv: value.DisAdv,
                conditions: value.conditions,
                school_abilities: value.SchoolAbilities,
                techniques_new_actions: value.techniquesNewActions,
                techniques_new_flower: value.techniquesNewFlower,
            };

            if (value.skills && value.skills.length > 0) {
                const validSkills = value.skills.filter(
                    (skill) => skill.label.trim() !== '' && !isNaN(skill.value)
                );

                if (validSkills.length > 0) {
                    payload.skill = validSkills.map((skill) => ({
                        id: skill.id,
                        skill_id: skill.skill_id,
                        label: skill.label,
                        value: skill.value,
                        proficient: skill.proficient,
                        categories: skill.categories,
                        sheet_id: data.sheet.id
                    }));
                }
            }


            if (value.weapons && value.weapons.length > 0) {
                const validWeapons = value.weapons.filter(
                    (w) => w.name.trim() !== '' || w.damage.trim() !== '' || w.notes.trim() !== ''
                );

                if (validWeapons.length > 0) {
                    payload.weapon = validWeapons.map((w) => ({
                        id: w.id || 0,
                        label: w.name,
                        damage: w.damage,
                        notes: w.notes,
                    }));
                }
            }


            try {
                console.log('Payload envoyé à l’API :', JSON.stringify(payload, null, 2));

                const response = await fetch(`https://apidnd.up.railway.app/api/sheet/${data.sheet.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    throw new Error('Erreur lors de la mise à jour de la fiche');
                }

                const updatedData = await response.json();
                console.log('Mise à jour réussie :', updatedData);
            } catch (err) {
                console.error('Erreur API:', err);
            }
        },

    })

    const clansL5R = useClan();
    const familiesL5R = useFamily();
    const schoolsL5R = useSchool();
    const skillsL5R = useSkillL5RFiltered();

    if (clansL5R.isLoading || familiesL5R.isLoading || schoolsL5R.isLoading || skillsL5R.isLoading) return <p>Chargement en cours...</p>;
    if (clansL5R.error || familiesL5R.error || schoolsL5R.error || skillsL5R.error) return <p>Erreur</p>;
    if (!schoolsL5R.data || !familiesL5R.data || !clansL5R.data || !skillsL5R.data) return null;

    if (!data || isLoading) return <p>Chargement...</p>

    return (
        <form
            className="relative w-full flex flex-wrap justify-between"
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
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

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-y-[40px]'>
                {/* Choix du prénom */}
                <form.Field name="firstName">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
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
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
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

                {/* Choix du clan */}
                <form.Field name="clan">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Clan
                            </label>
                            <select
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);  // Mise à jour explicite de la valeur
                                }}
                                className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                            >
                                <option value="">Sélectionner un clan</option>
                                {clansL5R.data.map((clanL5R) => (
                                    <option key={clanL5R.id} value={clanL5R.label}>
                                        {clanL5R.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-y-[40px]'>
                {/* Choix de la famille */}
                <form.Field name="family">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Famille
                            </label>
                            <select
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                }}
                                className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                            >
                                <option value="">Sélectionner une famille</option>
                                {familiesL5R.data.map((familyL5R) => (
                                    <option key={familyL5R.id} value={familyL5R.label}>
                                        {familyL5R.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </form.Field>

                {/* Choix de l'école */}
                <form.Field name="school">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                École
                            </label>
                            <select
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => {
                                    field.handleChange(e.target.value);
                                }}
                                className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                            >
                                <option value="">Sélectionner une école</option>
                                {schoolsL5R.data.map((schoolL5R) => (
                                    <option key={schoolL5R.id} value={schoolL5R.label}>
                                        {schoolL5R.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </form.Field>

                {/* Choix du rang d'école */}
                <form.Field name="rankSchool">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Rang d'école
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre rang d'école"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix du Ninjô */}
                <form.Field name="ninjo">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Ninjô
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre ninjô"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du giri */}
                <form.Field name="giri">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Giri
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre giri"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix des titres */}
                <form.Field name="distinctions">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Titres
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos titres"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des passions */}
                <form.Field name="passions">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Passions
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos passions"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des défaillances */}
                <form.Field name="anxieties">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Défaillances
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos défaillances"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Choix de la personnalité, habitudes et manies */}
            <form.Field name="personalityHabitsQuirks">
                {(field) => (
                    <div className='mt-[40px] w-full'>
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Personnalité, habitudes et manies
                        </label>
                        <textarea
                            name={field.name}
                            id={field.name}
                            value={field.state.value ?? ''}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Entrez votre personnalité, habitudes et manies"
                        />
                    </div>
                )}
            </form.Field>

            {/* Compétences */}
            <div className="w-full mt-[40px]">
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
                                            const selectedSkill = skillsL5R.data.find(skill => skill.label === selectedLabel);

                                            field.handleChange(selectedLabel);

                                            if (selectedSkill) {
                                                const updatedSkills = [...form.state.values.skills];
                                                updatedSkills[index] = {
                                                    ...updatedSkills[index],
                                                    label: selectedLabel,
                                                    skill_id: selectedSkill.id,
                                                    categories: selectedSkill.categories
                                                };
                                                form.setFieldValue('skills', updatedSkills);
                                            }
                                        }}
                                        className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                    >
                                        <option value="">Sélectionner une compétence</option>
                                        {skillsL5R.data.map((skill) => (
                                            <option key={skill.id} value={skill.label}>
                                                {skill.label}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </form.Field>

                            <form.Field name={`skills[${index}].proficient`}>
                                {(field) => (
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            id={field.name}
                                            checked={field.state.value ?? false}
                                            onChange={(e) => field.handleChange(e.target.checked)}
                                            className="size-4"
                                        />
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
                                    categories: '',
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
        </form>
    )
}
