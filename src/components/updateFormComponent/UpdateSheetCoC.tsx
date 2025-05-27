import { useForm } from "@tanstack/react-form"

import type { Sheet } from "../../api/sheetApi"

import { useSheets } from "../../api/sheetApi"

export default function UpdateSheetCoC(props: { sheetId: number }) {
    const { data, isLoading } = useSheets(props.sheetId)

    const form = useForm({
        defaultValues: {
            avatar: data?.sheet.avatar_src ?? '',
            firstName: data?.sheet.firstname ?? '',
            lastName: data?.sheet.lastname ?? '',
            gender: data?.details.gender ?? '',
            age: data?.details.age ?? 1,
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
            notes: data?.details.notes ?? '',
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
            weapons: [
                {
                    id: 1,
                    name: '',
                    type: '',
                    damage: '',
                    notes: '',
                },
            ],
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
            fellowInvestigators: [
                {
                    sheet_id: 1,
                    name: '',
                    player: '',
                    id: 1,
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
                fellowInvestigators?: { sheet_id: number; name: string; player: string; id: number; }
            } = {
                sheet: {
                    id: data.sheet.id,
                    system_id: data.sheet.system_id,
                    firstname: value.firstName,
                    lastname: value.lastName,
                    avatar_src: value.avatar,
                },
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
                        type: w.type,
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-y-[40px]">
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-[40px]">
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

            <div className="w-full gap-[16px] flex flex-wrap justify-between mt-[40px] gap-y-[40px]">
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

            <div className="w-full gap-[16px] flex flex-wrap justify-between mt-[40px] gap-y-[40px]">
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

            <div className="w-full gap-[16px] flex flex-wrap justify-between mt-[40px] gap-y-[40px]">
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-[40px]">
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-[40px]">
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-[40px]">
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-[40px]">
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-[40px]">
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

            <div className="w-full flex flex-wrap justify-between mt-[40px] gap-[40px]">
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
                            placeholder="Entrez vos notes"
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