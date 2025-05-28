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

    const [, setSkillsCount] = useState(1);
    const [, setWeaponCount] = useState(1);

    const form = useForm({
        defaultValues: {
            avatar: data?.sheet.avatar_src ?? '',
            firstName: data?.sheet.firstname ?? '',
            lastName: data?.sheet.lastname ?? '',
            clan: data?.clanL5R?.label ?? '',
            family: data?.familyL5R?.label ?? '',
            school: data?.schoolL5R?.label ?? '',
            roles: data?.details.roles ?? '',
            rankSchool: data?.details.school_rank ?? '',
            ninjo: data?.details.ninjo ?? '',
            giri: data?.details.giri ?? '',
            distinctions: data?.details.distinctions ?? '',
            adversities: data?.details.adversities ?? '',
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
                    sheet_id: data?.sheet.id ?? 1,
                    label: '',
                    value: 0,
                    proficient: false,
                    categories: '',
                },
            ],
            koku: data?.details.koku ?? 0,
            zeni: data?.details.zeni ?? 0,
            bu: data?.details.bu ?? 0,
            notes: data?.details.notes ?? '',
            Adv: data?.details.adv ?? '',
            DisAdv: data?.details.disadv ?? '',
            conditions: data?.details.conditions ?? '',
            schoolAbilities: data?.details.school_abilities ?? '',
            techniquesNewActions: data?.details.techniques_new_actions ?? '',
            techniquesNewFlower: data?.details.techniques_new_flower ?? '',
            armors: [''],
            weapons: [
                {
                    id: 1,
                    label: '',
                    damage: 0,
                    notes: '',
                },
            ],
        },
        onSubmit: async ({ value }) => {
            if (!data) return;

            const existingSkills = data.skill ?? [];
            const validSkills = (value.skills ?? []).filter(
                (skill) => skill.label.trim() !== '' && !isNaN(skill.value)
            );

            const existingWeapons = data.weapon ?? [];
            const validWeapons = (value.weapons ?? []).filter(
                (weapon) => weapon.label.trim() !== '' && !isNaN(weapon.damage)
            );

            const payload: {
                sheet: {
                    id: number;
                    system_id: number;
                    firstname: string;
                    lastname: string;
                    avatar_src: string;
                };
                details?: Sheet["details"];
                skill?: Array<{
                    id: number;
                    skill_id: number;
                    sheet_id: number;
                    label: string;
                    value: number;
                    proficient: boolean;
                    categories: string;
                }>;
                weapon?: Array<{ id: number; label: string; damage: number; notes: string }>;
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
                roles: value.roles,
                ninjo: value.ninjo,
                giri: value.giri,
                distinctions: value.distinctions,
                adversities: value.adversities,
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
                notes: value.notes,
                adv: value.Adv,
                disadv: value.DisAdv,
                conditions: value.conditions,
                school_abilities: value.schoolAbilities,
                techniques_new_actions: value.techniquesNewActions,
                techniques_new_flower: value.techniquesNewFlower,
            };

            if (existingSkills.length > 0 && validSkills.length > 0) {
                payload.skill = validSkills.map((skill) => ({
                    id: skill.id,
                    skill_id: skill.skill_id,
                    sheet_id: data.sheet.id,
                    label: skill.label,
                    value: skill.value,
                    proficient: skill.proficient,
                    categories: skill.categories,
                }));
            }

            if (existingWeapons.length > 0 && validWeapons.length > 0) {
                payload.weapon = validWeapons.map((w) => ({
                    id: w.id || 1,
                    label: w.label,
                    damage: w.damage,
                    notes: w.notes,
                }));
            }

            try {
                // PATCH sans les skills vides
                const patchRes = await fetch(`https://apidnd.up.railway.app/api/sheet/${data.sheet.id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (!patchRes.ok) throw new Error('Erreur lors du PATCH');

                console.log('PATCH réussi : fiche mise à jour');

                // POST séparé si aucun skill valide n'était dans le payload
                if (existingSkills.length === 0 && validSkills.length > 0) {
                    const postRes = await fetch(`https://apidnd.up.railway.app/api/skillSheet`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(validSkills.map((skill) => ({
                            id: skill.id,
                            skill_id: skill.skill_id,
                            sheet_id: data.sheet.id,
                            label: skill.label,
                            value: skill.value,
                            proficient: skill.proficient,
                            categories: skill.categories,
                        }))),
                    });

                    if (!postRes.ok) throw new Error('Erreur lors du POST des compétences');

                    console.log('POST des compétences effectué');
                }

                if (existingWeapons.length === 0 && validWeapons.length > 0) {
                    const postWeaponsRes = await fetch(`https://apidnd.up.railway.app/api/weaponSheet`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(validWeapons.map((weapon) => ({
                            id: weapon.id,
                            sheet_id: data.sheet.id,
                            label: weapon.label,
                            damage: weapon.damage,
                            notes: weapon.notes,
                        })))
                    });

                    if (!postWeaponsRes) throw new Error('Erreur lors du POST des armes');

                    console.log('POST des armes effectué')
                }

            } catch (err) {
                console.error('Erreur API :', err);
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

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix de la personnalité, habitudes et manies */}
                <form.Field name="personalityHabitsQuirks">
                    {(field) => (
                        <div className='flex-1'>
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

                {/* Adversités */}
                <form.Field name="adversities">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Adversités
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos adversités"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Rôles */}
                <form.Field name="roles">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Rôles
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos rôles"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix de l'exp total */}
                <form.Field name="expTotal">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Expérience totale
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre expérience totale"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de l'expérience dépensée */}
                <form.Field name="expoSpend">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Expérience dépensée
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre expérience dépensée"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de l'expérience restante */}
                <form.Field name="expSaved">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Expérience restante
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre expérience restante"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix de l'endurance */}
                <form.Field name="endurance">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Endurance
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre endurance"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de la fatigue */}
                <form.Field name="enduranceFatigue">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Endurance <i className='font-crimson-text text-sm'>(fatigue)</i>
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre endurance lors de fatigue"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du sang-froid */}
                <form.Field name="composure">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Sang-froid
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre sang-froid"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du sang-froid si conflit */}
                <form.Field name="composureStrife">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Sang-froid <i className='font-crimson-text text-sm'>(conflit)</i>
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre sang-froid lors de conflit"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix de l'attention */}
                <form.Field name="focus">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Attention
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre attention"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix de vigilance */}
                <form.Field name="vigilance">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Vigilance
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre vigilance"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du points de vide max */}
                <form.Field name="voidPointsMax">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Points de vide max.
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos points de vide max."
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des points de vide actuels */}
                <form.Field name="voidPointsCurrent">
                    {(field) => (
                        <div className='w-[250px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Points de vide actuels
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos points de vide actuels"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

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

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix des avatanges */}
                <form.Field name="Adv">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Avantages
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos avantages"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des désavantages */}
                <form.Field name="DisAdv">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Désavantages
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos désavantages"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des états */}
                <form.Field name="conditions">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                États
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos états"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix des compétences d'école */}
                <form.Field name="schoolAbilities">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Compétences d'école
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos compétences d'école"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des techniques (nouvelles actions) */}
                <form.Field name="techniquesNewActions">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Techniques <i className='font-crimson-text text-sm'>(nouvelles actions)</i>
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos techniques (nouvelles actions)"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des techniques (nouvelles fleurs) */}
                <form.Field name="techniquesNewFlower">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Techniques <i className='font-crimson-text text-sm'>(nouvelles fleurs)</i>
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos techniques (nouvelles fleurs)"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Armes */}
            <div className="w-full mt-[40px]">
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
                                        value={index + 1}
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

                                {/* Dégâts */}
                                <form.Field name={`weapons[${index}].damage`}>
                                    {(field) => (
                                        <input
                                            type="number"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(Number(e.target.value))}
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
                                    label: '',
                                    damage: 0,
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

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix des koku */}
                <form.Field name="koku">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Koku
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos koku"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des bu */}
                <form.Field name="bu">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Bu
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos bu"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des zeni */}
                <form.Field name="zeni">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Zeni
                            </label>
                            <input
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? 0}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos zeni"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Notes */}
            <form.Field name="notes">
                {(field) => (
                    <div className='mt-[40px] w-full'>
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Notes
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
