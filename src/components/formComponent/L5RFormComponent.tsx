import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import { useClan } from "../../api/L5R/clanL5RApi"
import { useFamily } from "../../api/L5R/familyL5RApi"
import { useSchool } from "../../api/L5R/schoolL5RApi"
import { useSkillL5RFiltered } from "../../api/L5R/skillL5RApi"
import { useAbilitiesL5R } from "../../api/L5R/abilitiesL5RApi"
import { getDecodedJwt } from "../../utils/AuthUtils";

export function L5rFormComponent() {
    const decodedToken = getDecodedJwt();
    const userId = decodedToken?.id;

    const form = useForm({
        defaultValues: {
            avatar: '',
            firstName: '',
            lastName: '',
            clan_id: 0,
            family_id: 0,
            school_id: 0,
            roles: '',
            rankSchool: 0,
            ninjo: '',
            giri: '',
            distinctions: '',
            adversities: '',
            passions: '',
            anxieties: '',
            personalityHabitsQuirks: '',
            lvl: 1,
            expTotal: 0,
            expSaved: 0,
            expoSpend: 0,
            endurance: 0,
            enduranceFatigue: 0,
            composure: 0,
            composureStrife: 0,
            focus: 0,
            vigilance: 0,
            voidPointsMax: 0,
            voidPointsCurrent: 0,
            abilities: [{
                abilities_id: 1,
                value: 1,
                modifier: 0,
            }],
            skills: [{
                skill_id: 1,
                label: '',
                value: 1,
                proficient: false,
            }],
            koku: 0,
            zeni: 0,
            bu: 0,
            items: [{
                label: '',
                quantity: 1,
                weight: '',
                description: '',
            }],
            notes: '',
            Adv: '',
            DisAdv: '',
            conditions: '',
            schoolAbilities: '',
            techniquesNewActions: '',
            techniquesNewFlower: '',
            weapons: [{
                label: '',
                damage: '',
                notes: ''
            }],
        },
        onSubmit: async ({ value }) => {
            try {
                const payload = {
                    sheet: {
                        firstname: value.firstName,
                        lastname: value.lastName,
                        avatar_src: value.avatar,
                        lvl: value.lvl,
                        user_id: userId,
                        system_id: 1,
                    },
                    details: {
                        clan_id: value.clan_id,
                        family_id: value.family_id,
                        school_id: value.school_id,
                        school_rank: value.rankSchool,
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
                    },
                    abilities: (value.abilities ?? []).map((ability) => ({
                        abilities_id: ability.abilities_id,
                        value: ability.value,
                        modifier: ability.modifier,
                    })),
                    items: (value.items ?? []).map((item) => ({
                        label: item.label,
                        quantity: item.quantity,
                        weight: item.weight,
                        description: item.description,
                    })),
                    skills: (value.skills ?? []).map((skill) => ({
                        skill_id: skill.skill_id,
                        value: skill.value,
                        proficient: skill.proficient,
                    })),
                    weapons: (value.weapons ?? []).map((weapon) => ({
                        label: weapon.label,
                        damage: weapon.damage,
                        notes: weapon.notes,
                    }))
                }

                const response = await fetch("https://apidnd.up.railway.app/api/sheet/l5r", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Erreur lors de l'envoi :", errorData);
                    alert("Erreur lors de l'envoi du formulaire");
                } else {
                    const responseData = await response.json();
                    console.log("Fiche L5R envoyée avec succès :", responseData);
                    window.location.href = "/index";
                }
            } catch (error) {
                console.error("Erreur réseau :", error);
                alert("Erreur réseau");
            }
        },
    })

    const [, setSkillsCount] = useState(1);
    const [, setWeaponCount] = useState(1);
    const [, setItemsCount] = useState(1);

    const clansL5R = useClan();
    const familiesL5R = useFamily();
    const schoolsL5R = useSchool();
    const skillsL5R = useSkillL5RFiltered();
    const abilitiesL5R = useAbilitiesL5R();

    if (clansL5R.isLoading || familiesL5R.isLoading || schoolsL5R.isLoading || skillsL5R.isLoading || abilitiesL5R.isLoading) return <p>Chargement en cours...</p>;
    if (clansL5R.error || familiesL5R.error || schoolsL5R.error || skillsL5R.error || abilitiesL5R.error) return <p>Erreur</p>;
    if (!schoolsL5R.data || !familiesL5R.data || !schoolsL5R.data || !skillsL5R.data || !abilitiesL5R.data) return null;

    return (
        <form
            className="relative w-full flex flex-wrap justify-between"
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
        >
            {/* Champ avatar */}
            <form.Field name="avatar">
                {(field) => (
                    <div className="absolute -top-[76px] end-0">
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Avatar
                        </label>
                        <input
                            type="text"
                            name={field.name}
                            id={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Entrez l'url de votre avatar"
                        />
                    </div>
                )}
            </form.Field>

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-y-[40px]">
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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
                <form.Field name="clan_id">
                    {(field) => (
                        <div className="flex-1">
                            <label className="block text-xl font-uncial-antiqua mb-[8px]">Clan</label>
                            <fieldset className="flex flex-wrap justify-start gap-[8px] bg-primary rounded-[3px] p-[8px]">
                                {clansL5R?.data?.map((clanL5R) => (
                                    <div key={clanL5R.id}>
                                        <label className="flex items-center gap-2 w-[150px]">
                                            <input
                                                type="radio"
                                                value={clanL5R.label}
                                                checked={field.state.value === clanL5R.id}
                                                onChange={() => field.handleChange(clanL5R.id)}
                                                className="hidden"
                                            />
                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                {field.state.value === clanL5R.id && (
                                                    <i className="fa-solid fa-check text-accent"></i>
                                                )}
                                            </span>
                                            {clanL5R.label}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Choix de la famille */}
            <form.Field name="family_id">
                {(field) => (
                    <div className="w-full my-[40px]">
                        <label className="block text-xl font-uncial-antiqua mb-[8px]">Famille</label>
                        <fieldset className="flex flex-wrap justify-start gap-[8px] bg-primary rounded-[3px] p-[8px]">
                            {familiesL5R.data.map((familyL5R) => (
                                <div key={familyL5R.id}>
                                    <label className="flex items-center gap-2 w-[200px]">
                                        <input
                                            type="radio"
                                            value={familyL5R.label}
                                            checked={field.state.value === familyL5R.id}
                                            onChange={() => field.handleChange(Number(familyL5R.id))}
                                            className="hidden"
                                        />
                                        <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                            {field.state.value === familyL5R.id && (
                                                <i className="fa-solid fa-check text-accent"></i>
                                            )}
                                        </span>
                                        {familyL5R.label}
                                    </label>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                )}
            </form.Field>

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
                {/* Choix de l'école */}
                <form.Field name="school_id">
                    {(field) => (
                        <div className="flex-1">
                            <label className="block text-xl font-uncial-antiqua mb-[8px]">École</label>
                            <fieldset className="flex flex-wrap justify-start gap-[8px] bg-primary rounded-[3px] p-[8px]">
                                {schoolsL5R.data.map((schoolL5R) => (
                                    <div key={schoolL5R.id}>
                                        <label className="flex items-center gap-2 w-[200px]">
                                            <input
                                                type="radio"
                                                value={schoolL5R.label}
                                                checked={field.state.value === schoolL5R.id}
                                                onChange={() => field.handleChange(schoolL5R.id)}
                                                className="hidden"
                                            />
                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                {field.state.value === schoolL5R.id && (
                                                    <i className="fa-solid fa-check text-accent"></i>
                                                )}
                                            </span>
                                            {schoolL5R.label}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
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
                                type="number"
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(Number(e.target.value))}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre rang d'école"
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

                {abilitiesL5R.data.map((ability, index) => (
                    <div key={index} className="w-[240px]">
                        {/* Nom de la capacité */}
                        <label className="font-uncial-antiqua text-lg">{ability.label}</label>

                        {/* Id Abilities */}
                        <form.Field
                            name={`abilities[${index}].abilities_id`}
                            defaultValue={ability.id}
                        >
                            {(field) => (
                                <input
                                    type="hidden"
                                    name={field.name}
                                    value={field.state.value}
                                />
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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
                                            const selectedSkill = skillsL5R.data.find(skill => skill.label === selectedLabel);

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

                            form.setFieldValue('skills', [
                                ...current,
                                {
                                    skill_id: 0,
                                    label: '',
                                    value: 0,
                                    proficient: false,
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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
            <div className="w-full my-[40px]">
                <label className="block text-xl font-uncial-antiqua mb-[8px]">Armes</label>

                <div className="w-full flex flex-col gap-4">
                    {form.state.values.weapons.map((_, index) => (
                        <div key={index} className="flex flex-wrap gap-[8px]">
                            {/* ID */}
                            <div className="size-[40px] text-center text-xl bg-primary rounded-lg border border-secondary cursor-not-allowed">
                                {index}
                            </div>

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
                            form.setFieldValue('weapons', [
                                ...current,
                                {
                                    label: '',
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

            <div className='w-full flex flex-wrap justify-between my-[40px] gap-[40px]'>
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

            {/* Items */}
            <div className="w-full my-[40px]">
                <label className="block text-xl font-uncial-antiqua mb-[8px]">Objets de l'inventaire</label>

                <div className="w-full flex flex-col gap-4">
                    {form.state.values.items.map((_, index) => (
                        <div key={index} className="flex flex-wrap gap-[8px]">
                            <div className="flex flex-wrap flex-1 gap-[8px]">
                                {/* ID */}
                                <div className="size-[40px] text-center text-xl bg-primary rounded-lg border border-secondary cursor-not-allowed">
                                    {index}
                                </div>

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
                            form.setFieldValue('items', [
                                ...current,
                                {
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
                            placeholder="Entrez votre personnalité, habitudes et manies"
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
        </form >
    )
}