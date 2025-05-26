import { useState } from "react"
import { useForm } from "@tanstack/react-form"

import { useClan } from "../../api/L5R/clanL5RApi"
import { useFamily } from "../../api/L5R/familyL5RApi"
import { useSchool } from "../../api/L5R/schoolL5RApi"
import { useSkillL5RFiltered } from "../../api/L5R/skillL5RApi"

export function L5rFormComponent() {
    const form = useForm({
        defaultValues: {
            avatar: '',
            firstName: '',
            lastName: '',
            clan: '',
            family: '',
            school: '',
            rankSchool: '',
            ninjo: '',
            giri: '',
            distinctions: '',
            passions: '',
            anxieties: '',
            personalityHabitsQuirks: '',
            expTotal: '',
            expSaved: '',
            expoSpend: '',
            endurance: '',
            enduranceFatigue: '',
            composure: '',
            composureStrife: '',
            focus: '',
            vigilance: '',
            voidPointsMax: '',
            voidPointsCurrent: '',
            skills: [{ label: '', value: '' }],
            koku: '',
            zeni: '',
            bu: '',
            Adv: '',
            DisAdv: '',
            conditions: '',
            SchoolAbilities: '',
            TechniquesNewActions: '',
            TechniquesNewFlower: '',
            armors: [''],
            weapons: [{
                id: '',
                name: '',
                damage: '',
                notes: '',
            }],
        },
        onSubmit: async ({ value }) => {
            console.log('Fiche mise à jour avec :', value)
        },
    })

    const [, setSkillsCount] = useState(0);
    const [armorCount, setArmorCount] = useState(1);
    const [, setWeaponCount] = useState(0)

    const clansL5R = useClan();
    const familiesL5R = useFamily();
    const schoolsL5R = useSchool();
    const skillsL5R = useSkillL5RFiltered();

    if (clansL5R.isLoading || familiesL5R.isLoading || schoolsL5R.isLoading || skillsL5R.isLoading) return <p>Chargement en cours...</p>;
    if (clansL5R.error || familiesL5R.error || schoolsL5R.error || skillsL5R.error) return <p>Erreur</p>;
    if (!schoolsL5R.data || !familiesL5R.data || !clansL5R.data || !skillsL5R.data) return null;

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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Entrez votre personnalité, habitudes et manies"
                        />
                    </div>
                )}
            </form.Field>

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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre sang-froid lors de conflit"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-[40px]'>
                {/* Choix de l'endurance */}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre vigilance"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix du sang-froid */}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                        onChange={(e) => field.handleChange(e.target.value)}
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

                            {/* Valeur */}
                            <form.Field name={`skills[${index}].value`}>
                                {(field) => (
                                    <input
                                        type="number"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ''}
                                        onChange={(e) => field.handleChange(e.target.value)}
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
                            const current = form.state.values.skills ?? []
                            form.setFieldValue('skills', [
                                ...current,
                                {
                                    label: '',
                                    value: '',
                                }
                            ])
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
                <form.Field name="SchoolAbilities">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Compétences d'école
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos compétences d'école"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des techniques (nouvelles actions) */}
                <form.Field name="TechniquesNewActions">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Techniques <i className='font-crimson-text text-sm'>(nouvelles actions)</i>
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos techniques (nouvelles actions)"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des techniques (nouvelles fleurs) */}
                <form.Field name="TechniquesNewFlower">
                    {(field) => (
                        <div className='flex-1'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Techniques <i className='font-crimson-text text-sm'>(nouvelles fleurs)</i>
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos techniques (nouvelles fleurs)"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            <div className='w-full mt-[40px]'>
                <label className="block text-xl font-uncial-antiqua mb-[8px]">
                    Armures
                </label>

                <div className="w-full flex flex-wrap justify-start gap-8">
                    {/* Choix d'une/de plusieurs armure(s) */}
                    {[...Array(armorCount)].map((_, index) => (
                        <div className='flex flex-wrap w-[240px] justify-between gap-[8px]'>
                            <form.Field key={index} name={`armors[${index}]`}>
                                {(field) => (
                                    <input
                                        type="text"
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ''}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                                        placeholder={`Entrez le nom de l'armure ${index + 1}`}
                                    />
                                )}
                            </form.Field>

                            {/* Supprimer une armure */}
                            <button
                                type="button"
                                onClick={() => {
                                    const updatedArmors = [...form.state.values.armors]
                                    updatedArmors.splice(index, 1)
                                    form.setFieldValue('armors', updatedArmors)
                                    setArmorCount((c) => c - 1)
                                }}
                                className="size-[40px] text-background bg-red-600 hover:bg-background hover:text-red-600 hover:outline-2 hover:outline-red-600 p-2 rounded text-lg cursor-pointer"
                            >
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    ))}

                    {/* Ajouter un champ d’armure */}
                    <button
                        type="button"
                        onClick={() => {
                            const currentArmors = form.state.values.armors ?? []
                            form.setFieldValue('armors', [...currentArmors, ''])
                            setArmorCount((c) => c + 1)
                        }}
                        className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-2xl"></i>
                    </button>
                </div>
            </div>

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
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="size-[40px] text-center text-xl bg-primary rounded-lg border border-secondary cursor-not-allowed"
                                        disabled
                                    />
                                )}
                            </form.Field>

                            <div className="flex flex-wrap flex-1 gap-[8px]">
                                {/* Nom */}
                                <form.Field name={`weapons[${index}].name`}>
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
                                    id: '',
                                    name: '',
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
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
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos zeni"
                            />
                        </div>
                    )}
                </form.Field>
            </div>

            {/* Bouton de soumission */}
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit} className="btn btn-text mt-[40px]">
                        {isSubmitting ? '...' : 'Créer la fiche de cet aventurier'}
                    </button>
                )}
            </form.Subscribe>
        </form>
    )
}