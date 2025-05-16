import { useForm } from '@tanstack/react-form'
import { useEffect, useState } from 'react'

import { useSpecies } from '../api/DnD/speciesDnDApi'
import { useClass, useSubClass } from '../api/DnD/classDnDApi'
import { useOrigin } from '../api/DnD/originDnDApi'
import { useLanguage } from '../api/DnD/languageDnDApi'
import { useSkillDnDFiltered } from '../api/DnD/skillDnDApi'

export function DndFormComponent() {
    const form = useForm({
        defaultValues: {
            avatar: '',
            firstName: '',
            lastName: '',
            alignment: '',
            race: '',
            subRace: '',
            classDnd: '',
            subClass: '',
            historic: '',
            toolsHistoric1: '',
            toolsHistoric2: '',
            language: [''],
            lvl: '',
            statFor: '',
            statDex: '',
            statCon: '',
            statInt: '',
            statSag: '',
            statCha: '',
            skills: [
                {
                    label: '',
                    value: ''
                },
            ],
            minorSpell: '',
            lvlOneSpell: '',
            armors: [''],
            weapons: [
                {
                    id: '',
                    name: '',
                    type: '',
                    bonus: '',
                    damage: '',
                    damageType: '',
                    notes: '',
                },
            ],
            appareance: '',
            lore: '',
            characterTraits: '',
        },
        onSubmit: async ({ value }) => {
            console.log('Fiche envoyée avec :', value)
        },
    })

    useEffect(() => {
        if (form.state.values.classDnd !== 'clerc') {
            form.setFieldValue('subClass', '')
        }
    }, [form, form.state.values.classDnd])

    const [armorCount, setArmorCount] = useState(1);
    const [, setWeaponVersion] = useState(0);
    const [languageCount, setLanguageCount] = useState(1);
    const [, setSkillsCount] = useState(0);

    const speciesDnD = useSpecies();
    const classDnD = useClass();
    const subClassDnD = useSubClass();
    const originDnD = useOrigin();
    const languageDnD = useLanguage();
    const skillDnD = useSkillDnDFiltered();

    if (speciesDnD.isLoading
        || classDnD.isLoading
        || subClassDnD.isLoading
        || originDnD.isLoading
        || languageDnD.isLoading
        || skillDnD.isLoading
    ) return <p>Chargement...</p>;

    if (speciesDnD.error
        || classDnD.error
        || subClassDnD.error
        || originDnD.error
        || languageDnD.error
        || skillDnD.error
    ) return <p>Erreur</p>;

    if (!speciesDnD.data
        || !classDnD.data
        || !subClassDnD.data
        || !originDnD.data
        || !languageDnD.data
        || !skillDnD.data
    ) return null;

    const uniqueSpecies = speciesDnD.data.uniqueSpecies;
    const Species = speciesDnD.data.Species;

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
                                Nom de famille <i className='font-crimson-text text-sm'>(facultatif)</i>
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

                {/* Choix de l'alignement */}
                <form.Field name="alignment">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Alignement
                            </label>
                            <input
                                type="text"
                                name={field.name}
                                id={field.name}
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
                    const selectedRace = Species.find(race => race.id.toString() === field.state.value);
                    return (
                        <div className="w-full">
                            <label className="block text-xl font-uncial-antiqua mt-[40px] mb-[8px]">Race</label>
                            <fieldset className="flex flex-wrap justify-start gap-[8px] bg-primary rounded-[3px] p-[8px]">
                                {uniqueSpecies.map((race) => (
                                    <div key={race.id}>
                                        <label className="flex items-center gap-2 w-[150px]">
                                            <input
                                                type="radio"
                                                value={race.id}
                                                checked={field.state.value === race.id.toString()}
                                                onChange={() => field.handleChange(race.id.toString())}
                                                className="hidden"
                                            />
                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                {field.state.value === race.id.toString() && (
                                                    <i className="fa-solid fa-check text-accent"></i>
                                                )}
                                            </span>
                                            {race.label}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>
                            {selectedRace?.subspecies &&
                                <form.Field name="subRace">
                                    {(field) => {
                                        return (
                                            <div className="w-full">
                                                <label className="block text-xl font-uncial-antiqua mt-[40px] mb-[8px]">Sous-race</label>
                                                <fieldset className="flex flex-wrap justify-start gap-[8px] bg-primary rounded-[3px] p-[8px]">
                                                    {Species.map((race) => (
                                                        <>
                                                            {selectedRace?.label === race.label &&
                                                                <div key={race.id}>
                                                                    <label className="flex items-center gap-2">
                                                                        <input
                                                                            type="radio"
                                                                            value={race.id}
                                                                            checked={field.state.value === race.id.toString()}
                                                                            onChange={() => field.handleChange(race.id.toString())}
                                                                            className="hidden"
                                                                        />
                                                                        <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                                            {field.state.value === race.id.toString() && (
                                                                                <i className="fa-solid fa-check text-accent"></i>
                                                                            )}
                                                                        </span>
                                                                        {race.subspecies}
                                                                    </label>
                                                                </div>
                                                            }
                                                        </>
                                                    ))}
                                                </fieldset>
                                            </div>
                                        )
                                    }
                                    }
                                </form.Field>
                            }
                        </div>
                    )
                }
                }
            </form.Field>

            {/* Champ classe */}
            <form.Field name="classDnd">
                {(classField) => {
                    const selectedClass = classDnD.data.find(cls => cls.id.toString() === classField.state.value);
                    const availableSubClasses = subClassDnD.data.filter(cls => cls.classe_dnd_id === selectedClass?.id);

                    return (
                        <div className="w-full">
                            <label className="block text-xl font-uncial-antiqua mt-[40px] mb-[8px]">Classe</label>
                            <fieldset className="flex flex-wrap gap-[8px] justify-start bg-primary rounded-[3px] p-[8px]">
                                {classDnD.data.map((cls) => (
                                    <div key={cls.id}>
                                        <label className="flex items-center gap-2 w-[150px]">
                                            <input
                                                type="radio"
                                                value={cls.id}
                                                checked={classField.state.value === cls.id.toString()}
                                                onChange={() => classField.handleChange(cls.id.toString())}
                                                className="hidden"
                                            />
                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                {classField.state.value === cls.id.toString() && (
                                                    <i className="fa-solid fa-check text-accent"></i>
                                                )}
                                            </span>
                                            {cls.label}
                                        </label>
                                    </div>
                                ))}
                            </fieldset>

                            {availableSubClasses && availableSubClasses.length > 0 &&
                                <form.Field name="subClass">
                                    {(field) => (
                                        <div className="w-full">
                                            <label className="block text-xl font-uncial-antiqua mt-[40px] mb-[8px]">Sous-classe</label>
                                            <fieldset className="flex flex-wrap gap-[8px] justify-start bg-primary rounded-[3px] p-[8px]">
                                                {availableSubClasses.map((cls) => (
                                                    <div key={cls.id}>
                                                        <label className="flex items-center gap-2 w-[200px]">
                                                            <input
                                                                type="radio"
                                                                value={cls.id}
                                                                checked={field.state.value === cls.id.toString()}
                                                                onChange={() => field.handleChange(cls.id.toString())}
                                                                className="hidden"
                                                            />
                                                            <span className="flex justify-center self-center size-[16px] me-[8px] rounded-sm bg-text">
                                                                {field.state.value === cls.id.toString() && (
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
                            }
                        </div>
                    )
                }}
            </form.Field>

            <div className='w-full flex flex-wrap justify-between mt-[40px] gap-y-[40px]'>
                {/* Choix de l'historique */}
                <form.Field name="historic">
                    {(field) => (
                        <div className='w-[240px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Historique
                            </label>
                            <select
                                name={field.name}
                                id={field.name}
                                value={field.state.value ?? ''}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                            >
                                <option value="">Sélectionner un historique</option>
                                {originDnD.data.map((origin) => (
                                    <option key={origin.id} value={origin.label}>
                                        {origin.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </form.Field>

                {/* Choix des outils selon l'historique */}
                <div className='w-fit'>
                    <form.Field name="toolsHistoric1">
                        {(field) => (
                            <>
                                <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                    Outils offerts par l'historique
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    id={field.name}
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
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full mt-[8px] p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez votre second outil selon votre historique"
                            />
                        )}
                    </form.Field>
                </div>

                {/* Choix des langues */}
                <div className='w-fit'>
                    <label className="block text-xl font-uncial-antiqua mb-[8px]">
                        Langues
                    </label>

                    <div className="w-full flex flex-wrap flex-col justify-start gap-[8px]">
                        {/* Choix d'une/de plusieurs langue(s) */}
                        {[...Array(languageCount)].map((_, index) => (
                            <form.Field key={index} name={`language[${index}]`}>
                                {(field) => (
                                    <select
                                        name={field.name}
                                        id={field.name}
                                        value={field.state.value ?? ''}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
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
                        ))}

                        {/* Ajouter un champ de langue */}
                        <button
                            type="button"
                            onClick={() => {
                                const currentLanguages = form.state.values.language ?? []
                                form.setFieldValue('armors', [...currentLanguages, ''])
                                setLanguageCount((l) => l + 1)
                            }}
                            className="size-[40px] bg-text rounded flex justify-center items-center cursor-pointer"
                        >
                            <i className="fa-solid fa-plus text-background text-2xl"></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Choix du niveau */}
            <form.Field name="lvl">
                {(field) => (
                    <div className='w-[240px] mt-[40px]'>
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Niveau
                        </label>
                        <input
                            type="number"
                            name={field.name}
                            id={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Entrez votre niveau"
                        />
                    </div>
                )}
            </form.Field>

            <div className='w-full flex flex-wrap mt-[40px]'>
                <div className="w-full flex flex-wrap justify-between gap-y-[8px]">
                    {/* Force */}
                    <form.Field name="statFor">
                        {(field) => (
                            <div className='w-[240px]'>
                                <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                    Force
                                </label>
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Entrez votre Force"
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Constitution */}
                    <form.Field name="statCon">
                        {(field) => (
                            <div className='w-[240px]'>
                                <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                    Constitution
                                </label>
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Entrez votre Constitution"
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Dextérité */}
                    <form.Field name="statDex">
                        {(field) => (
                            <div className='w-[240px]'>
                                <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                    Dextérité
                                </label>
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Entrez votre Dextérité"
                                />
                            </div>
                        )}
                    </form.Field>
                </div>

                <div className="w-full flex flex-wrap justify-between mt-[8px] gap-y-[8px]">
                    {/* Intelligence */}
                    <form.Field name="statInt">
                        {(field) => (
                            <div className='w-[240px]'>
                                <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                    Intelligence
                                </label>
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Entrez votre Intelligence"
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Sagesse */}
                    <form.Field name="statSag">
                        {(field) => (
                            <div className='w-[240px]'>
                                <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                    Sagesse
                                </label>
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Entrez votre Sagesse"
                                />
                            </div>
                        )}
                    </form.Field>

                    {/* Charisme */}
                    <form.Field name="statCha">
                        {(field) => (
                            <div className='w-[240px]'>
                                <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                    Charisme
                                </label>
                                <input
                                    type="number"
                                    name={field.name}
                                    id={field.name}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder="Entrez votre Charisme"
                                />
                            </div>
                        )}
                    </form.Field>
                </div>
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
                                        {skillDnD.data.map((skill) => (
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
                        className="size-[40px] bg-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-background text-2xl"></i>
                    </button>
                </div>
            </div>

            <div className='w-full flex flex-wrap justify-between mt-[40px]'>
                {/* Choix des sorts mineurs */}
                <form.Field name="minorSpell">
                    {(field) => (
                        <div className='w-[250px] sm:w-[550px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Sorts mineurs
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos sorts mineurs"
                            />
                        </div>
                    )}
                </form.Field>

                {/* Choix des sorts de niveau 1 */}
                <form.Field name="lvlOneSpell">
                    {(field) => (
                        <div className='w-[250px] sm:w-[550px]'>
                            <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                                Sorts de niveau 1
                            </label>
                            <textarea
                                name={field.name}
                                id={field.name}
                                onChange={(e) => field.handleChange(e.target.value)}
                                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                                placeholder="Entrez vos sorts de niveau 1"
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
                        <form.Field key={index} name={`armors[${index}]`}>
                            {(field) => (
                                <input
                                    type="text"
                                    name={field.name}
                                    id={field.name}
                                    value={field.state.value ?? ''}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                    placeholder={`Entrez le nom de l'armure ${index + 1}`}
                                />
                            )}
                        </form.Field>
                    ))}

                    {/* Ajouter un champ d’armure */}
                    <button
                        type="button"
                        onClick={() => {
                            const currentArmors = form.state.values.armors ?? []
                            form.setFieldValue('armors', [...currentArmors, ''])
                            setArmorCount((c) => c + 1)
                        }}
                        className="size-[40px] bg-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-background text-2xl"></i>
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

                                {/* Type */}
                                <form.Field name={`weapons[${index}].type`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Type de l'arme ${index + 1}`}
                                        />
                                    )}
                                </form.Field>

                                {/* Bonus */}
                                <form.Field name={`weapons[${index}].bonus`}>
                                    {(field) => (
                                        <input
                                            type="text"
                                            name={field.name}
                                            id={field.name}
                                            value={field.state.value ?? ''}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                                            placeholder={`Bonus de l'arme ${index + 1}`}
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

                                {/* Type de dégâts */}
                                <form.Field name={`weapons[${index}].damageType`}>
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
                                    type: '',
                                    bonus: '',
                                    damage: '',
                                    damageType: '',
                                    notes: '',
                                },
                            ])
                            setWeaponVersion((w) => w + 1)
                        }}
                        className="size-[40px] bg-text rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-plus text-background text-2xl"></i>
                    </button>
                </div>
            </div>

            {/* Description de l'apparence */}
            <form.Field name="appareance">
                {(field) => (
                    <div className='w-full mt-[40px]'>
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Apparence
                        </label>
                        <textarea
                            name={field.name}
                            id={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Décrivez votre personnage"
                        />
                    </div>
                )}
            </form.Field>

            {/* Description de l'histoire */}
            <form.Field name="lore">
                {(field) => (
                    <div className='w-full mt-[40px]'>
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Histoire
                        </label>
                        <textarea
                            name={field.name}
                            id={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Décrivez l'histoire de votre personnage"
                        />
                    </div>
                )}
            </form.Field>

            {/* Description du caractère */}
            <form.Field name="characterTraits">
                {(field) => (
                    <div className='w-full mt-[40px]'>
                        <label htmlFor={field.name} className="block text-xl font-uncial-antiqua mb-[8px]">
                            Traits de caractère
                        </label>
                        <textarea
                            name={field.name}
                            id={field.name}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                            placeholder="Décrivez le caractère de votre personnage"
                        />
                    </div>
                )}
            </form.Field>

            {/* Bouton de soumission */}
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit, isSubmitting]) => (
                    <button type="submit" disabled={!canSubmit} className="btn btn-text mt-[40px]">
                        {isSubmitting ? '...' : 'Créer la fiche de cet aventurier'}
                    </button>
                )}
            </form.Subscribe>
        </form >
    )
}
