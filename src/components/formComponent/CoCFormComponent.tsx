import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { useSkillCoCFiltered } from "../../api/CoC/skillCoCApi";
import { useAbilitiesCoC } from "../../api/CoC/abilitiesCoC";
import { getDecodedJwt } from "../../utils/AuthUtils";

export function CthulhuFormComponent() {
  const skillCoC = useSkillCoCFiltered();
  const abilitiesCoC = useAbilitiesCoC();

  const decodedToken = getDecodedJwt();
  const userId = decodedToken?.id;

  const form = useForm({
    defaultValues: {
      avatar: '',
      firstName: '',
      lastName: '',
      gender: '',
      age: 1,
      lvl: 1,
      residence: '',
      birthPlace: '',
      occupation: '',
      hit_point: 0,
      dying: false,
      unconscious: false,
      major_wounds: 0,
      temp_insane: 0,
      indef_insane: 0,
      sanity: 99,
      luck: 99,
      magic_points: 0,
      damage_bonus: 0,
      build: 0,
      dodge: 0,
      spending_lvl: 0,
      cash: 0,
      items: [{
        label: '',
        quantity: 1,
        weight: '',
        description: '',
      }],
      notes: '',
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
      weapons: [{
        label: '',
        damage_type: '',
        damage: '',
        notes: ''
      }],
      personalDesc: '',
      traits: '',
      believes: '',
      meaningfulLocation: '',
      treasuredPossession: '',
      injuriesScar: '',
      phobiaMania: '',
      tomeSpellsArtifacts: '',
      encounters: '',
      assets: '',
      fellowInvestigators: [{
        player: '',
        character: '',
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
            system_id: 3,
          },
          details: {
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
          },
          fellowInvestigators: (value.fellowInvestigators ?? []).map((investigator) => ({
            character: investigator.character,
            player: investigator.player,
          })),
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
            damage_type: weapon.damage_type,
            notes: weapon.notes,
          }))
        }

        const response = await fetch("https://apidnd.up.railway.app/api/sheet/coc", {
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
          console.log("Fiche CoC envoyée avec succès :", responseData);
          window.location.href = "/index";
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau");
      }
    },

  });

  const [, setSkillsCount] = useState(1);
  const [, setWeaponCount] = useState(1);
  const [, setItemsCount] = useState(1);
  const [, setFellowInvestigators] = useState(1);

  if (skillCoC.isLoading || abilitiesCoC.isLoading) return <p>Chargement ...</p>;
  if (skillCoC.error || abilitiesCoC.error) return <p>Erreur</p>;
  if (!skillCoC.data || !abilitiesCoC.data) return null;

  return (
    <form
      className="relative w-full flex flex-wrap justify-between"
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      {/* Avatar */}
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
              value={field.state.value ?? ''}
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

        {abilitiesCoC.data.map((ability, index) => (
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
              form.setFieldValue('weapons', [
                ...current,
                {
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
                      const selectedSkill = skillCoC.data.find(skill => skill.label === selectedLabel);

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
                    {skillCoC.data.map((skill) => (
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
              form.setFieldValue("fellowInvestigators", [
                ...current,
                {
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
            {isSubmitting ? '...' : 'Créer la fiche de cet aventurier'}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
