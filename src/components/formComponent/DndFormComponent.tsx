import { useForm } from "@tanstack/react-form";
import { useState } from "react";

import { useSpecies, useSubSpecies } from "../../api/DnD/speciesDnDApi";
import { useClass, useSubClass } from "../../api/DnD/classDnDApi";
import { useOrigin } from "../../api/DnD/originDnDApi";
import { useLanguage } from "../../api/DnD/languageDnDApi";
import { useSkillDnDFiltered } from "../../api/DnD/skillDnDApi";
import { useAbilitiesDnD } from "../../api/DnD/abilitiesDnDApi";

import { getDecodedJwt } from "../../utils/AuthUtils";

export function DndFormComponent() {
  const decodedToken = getDecodedJwt();
  const userId = decodedToken?.id;

  const form = useForm({
    defaultValues: {
      avatar: '',
      firstName: '',
      lastName: '',
      alignment: '',
      race_id: 0,
      subRace_id: 0,
      classDnd_id: 0,
      subClass_id: 0,
      origin_id: 0,
      toolsHistoric1: "",
      toolsHistoric2: "",
      lvl: 1,
      exp: 0,
      maxHp: 10,
      hp: 10,
      hit_dice: '',
      proficiency: 0,
      ca: 0,
      initiative: 0,
      inspiration: false,
      speed: 0,
      swim_speed: 0,
      climb_speed: 0,
      fly_speed: 0,
      death_saves_success: 0,
      death_saves_failed: 0,
      weapon_prof: "",
      armor_prof: "",
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 10,
      platinum: 0,
      languages: [{
        language_id: 0,
      }],
      abilities: [{
        abilities_id: 1,
        value: 1,
        modifier: 0,
      }],
      saving_throw: [{
        value: 0,
        proficient: false,
        abilities_id: 0,
      }],
      skills: [{
        skill_id: 1,
        label: '',
        value: 1,
        proficient: false,
      }],
      items: [{
        label: '',
        quantity: 1,
        weight: '',
        description: '',
      }],
      weapons: [{
        label: '',
        damage_type: '',
        damage: '',
        properties: '',
        bonus: 0,
        notes: '',
      }],
      spells: [{
        label: '',
        level: 0,
        school: '',
        casting_time: '',
        range: '',
        components: '',
        duration: '',
        description: '',
        prepared: false,
        known: false,
        is_ritual: false,
      }],
      dd_spell: 0,
      spell_bonus_attack: 0,
      appareance: '',
      lore: '',
      characterTraits: '',
      allies: '',
      enemies: '',
      feats: [{
        label: '',
        description: '',
        level_acquired: 1,
      }],
      spells_slot: [{
        slots_1_total: 0,
        slots_1_used: 0,
        slots_2_total: 0,
        slots_2_used: 0,
        slots_3_total: 0,
        slots_3_used: 0,
        slots_4_total: 0,
        slots_4_used: 0,
        slots_5_total: 0,
        slots_5_used: 0,
        slots_6_total: 0,
        slots_6_used: 0,
        slots_7_total: 0,
        slots_7_used: 0,
        slots_8_total: 0,
        slots_8_used: 0,
        slots_9_total: 0,
        slots_9_used: 0
      }]
    },
    onSubmit: async ({ value }) => {
      try {
        const basePayload = {
          sheet: {
            firstname: value.firstName,
            lastname: value.lastName,
            avatar_src: value.avatar,
            lvl: value.lvl,
            user_id: userId,
            system_id: 2,
          },
          details: {
            classe_id: value.classDnd_id,
            sub_classe_id: value.subClass_id,
            species_id: value.race_id,
            sub_species_id: value.subRace_id === 0 ? null : value.subRace_id,
            origin_id: value.origin_id,
            alignment: value.alignment,
            max_hp: value.maxHp,
            hp: value.hp,
            hit_dice: value.hit_dice,
            proficiency: value.proficiency,
            ca: value.ca,
            initiative: value.initiative,
            speed: value.speed,
            swim_speed: value.swim_speed,
            climb_speed: value.climb_speed,
            fly_speed: value.fly_speed,
            inspiration: value.inspiration,
            death_saves_success: value.death_saves_success,
            death_saves_fail: value.death_saves_failed,
            weapon_prof: value.weapon_prof,
            armor_prof: value.armor_prof,
            tools_prof: value.toolsHistoric2
              ? `${value.toolsHistoric1}, ${value.toolsHistoric2}`
              : value.toolsHistoric1,
            gold: value.gold,
            silver: value.silver,
            copper: value.copper,
            electrum: value.electrum,
            platinum: value.platinum,
            dd_spell: value.dd_spell,
            spell_bonus_attack: value.spell_bonus_attack,
            apparence: value.appareance,
            histoire: value.lore,
            caractere: value.characterTraits,
            allies: value.allies,
            enemies: value.enemies,
            exp: value.exp,
          },
          languages: (value.languages ?? []).map(lang => ({
            language_id: lang.language_id,
          })),
          saving_throw: (value.saving_throw ?? []).map(save_throw => ({
            value: save_throw.value,
            proficient: save_throw.proficient,
            abilities_id: save_throw.abilities_id,
          })),
          abilities: (value.abilities ?? []).map(ability => ({
            abilities_id: ability.abilities_id,
            value: ability.value,
            modifier: ability.modifier,
          })),
          items: (value.items ?? []).map(item => ({
            label: item.label,
            quantity: item.quantity,
            weight: item.weight,
            description: item.description,
          })),
          skills: (value.skills ?? []).map(skill => ({
            skill_id: skill.skill_id,
            value: skill.value,
            proficient: skill.proficient,
          })),
          weapons: (value.weapons ?? []).map(weapon => ({
            label: weapon.label,
            damage: weapon.damage,
            damage_type: weapon.damage_type,
            bonus: weapon.bonus,
            properties: weapon.properties,
            notes: weapon.notes,
          })),
          spells_slot: [{
            slots_1_total: value.spells_slot[0].slots_1_total,
            slots_1_used: value.spells_slot[0].slots_1_used,
            slots_2_total: value.spells_slot[0].slots_2_total,
            slots_2_used: value.spells_slot[0].slots_2_used,
            slots_3_total: value.spells_slot[0].slots_3_total,
            slots_3_used: value.spells_slot[0].slots_3_used,
            slots_4_total: value.spells_slot[0].slots_4_total,
            slots_4_used: value.spells_slot[0].slots_4_used,
            slots_5_total: value.spells_slot[0].slots_5_total,
            slots_5_used: value.spells_slot[0].slots_5_used,
            slots_6_total: value.spells_slot[0].slots_6_total,
            slots_6_used: value.spells_slot[0].slots_6_used,
            slots_7_total: value.spells_slot[0].slots_7_total,
            slots_7_used: value.spells_slot[0].slots_7_used,
            slots_8_total: value.spells_slot[0].slots_8_total,
            slots_8_used: value.spells_slot[0].slots_8_used,
            slots_9_total: value.spells_slot[0].slots_9_total,
            slots_9_used: value.spells_slot[0].slots_9_used,
          }],
          feats: (value.feats ?? []).map(feat => ({
            label: feat.label,
            description: feat.description,
            level_acquired: feat.level_acquired,
          })),
        };

        const validSpells = (value.spells ?? []).filter(
          (spell) => spell.label?.trim() !== ''
        );

        const payload = {
          ...basePayload,
          ...(validSpells.length > 0 && {
            spells: validSpells.map(spell => ({
              label: spell.label,
              level: spell.level,
              school: spell.school,
              casting_time: spell.casting_time,
              range: spell.range,
              components: spell.components,
              duration: spell.duration,
              description: spell.description,
              prepared: spell.prepared,
              known: spell.known,
              is_ritual: spell.is_ritual,
            }))
          })
        };

        const response = await fetch("https://apidnd.up.railway.app/api/sheet/dnd", {
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
          console.log("Fiche DnD envoyée avec succès :", responseData);
          window.location.href = "/index";
        }
      } catch (error) {
        console.error("Erreur réseau :", error);
        alert("Erreur réseau");
      }
    },
  });

  const [, setLanguageCount] = useState(1);
  const [, setSkillsCount] = useState(1);
  const [, setWeaponCount] = useState(1);
  const [, setItemsCount] = useState(1);
  const [, setSpellsCount] = useState(1);
  const [, setFeatsCount] = useState(1);

  const speciesDnD = useSpecies();
  const subSpeciesDnD = useSubSpecies();
  const classDnD = useClass();
  const subClassDnD = useSubClass();
  const originDnD = useOrigin();
  const languageDnD = useLanguage();
  const skillsDnD = useSkillDnDFiltered();
  const abilitiesDnD = useAbilitiesDnD();

  if (
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
    !skillsDnD.data ||
    abilitiesDnD.isLoading ||
    !abilitiesDnD.data
  ) {
    return <p>Chargement...</p>;
  }

  return (
    <form
      className="relative w-full flex flex-wrap justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {/* Champ avatar */}
      <form.Field name="avatar">
        {(field) => (
          <div className="absolute -top-[76px] end-0">
            <label
              htmlFor={field.name}
              className="block text-xl font-uncial-antiqua mb-[8px]"
            >
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
      <form.Field name="race_id">
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
                          field.handleChange(race.id);

                          const hasSubSpecies = subSpeciesDnD.data.some((sub) => sub.species_id === race.id);

                          if (!hasSubSpecies) {
                            form.setFieldValue("subRace_id", 0);
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
                <form.Field name="subRace_id">
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
      <form.Field name="classDnd_id">
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
                <form.Field name="subClass_id">
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
        <form.Field name="origin_id">
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
            {form.state.values.languages.map((_, index) => (
              <div key={index} className="flex flex-wrap w-[240px] justify-between gap-[8px]">
                <form.Field name={`languages[${index}].language_id`}>
                  {(field) => (
                    <select
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? ''}
                      onChange={(e) => {
                        const selectedId = Number(e.target.value);
                        const selectedLanguage = languageDnD.data.find(lang => lang.id === selectedId);
                        field.handleChange(selectedId);

                        if (selectedLanguage) {
                          const updatedLanguages = [...form.state.values.languages];
                          updatedLanguages[index] = {
                            ...updatedLanguages[index],
                            language_id: selectedId,
                          }

                          form.setFieldValue('languages', updatedLanguages);
                        }
                      }}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                    >
                      <option value="">Sélectionner une langue</option>
                      {languageDnD.data.map((language) => (
                        <option key={language.id} value={language.id}>
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
                    const updatedLanguages = form.state.values.languages.filter((_, i) => i !== index);
                    form.setFieldValue('languages', updatedLanguages);
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
                const current = form.state.values.languages ?? [];
                form.setFieldValue("languages", [
                  ...current,
                  {
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

        {abilitiesDnD.data.map((ability, index) => (
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

      <div className="w-full flex flex-wrap justify-between my-[40px] gap-y-[40px]">
        {/* Choix des pv max */}
        <form.Field name="maxHp">
          {(field) => (
            <div className="w-[240px]">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                P.V. maximum
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos points de vie maximum"
              />
            </div>
          )}
        </form.Field>

        {/* PV actuels */}
        <form.Field name="hp">
          {(field) => (
            <div className="w-[240px]">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                P.V. actuels
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos points de vie actuels"
              />
            </div>
          )}
        </form.Field>

        {/* Choix du dés de dégâts */}
        <form.Field name="hit_dice">
          {(field) => (
            <div className="w-[240px]">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Dés de dégâts
              </label>
              <input
                type="text"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos dés de dégâts"
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
        {/* Choix du bonus de maîtrise */}
        <form.Field name="proficiency">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Bonus de maîtrise
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre bonus de maîtrise"
              />
            </div>
          )}
        </form.Field>

        {/* Déterminer le AC */}
        <form.Field name="ca">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                AC
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre AC"
              />
            </div>
          )}
        </form.Field>

        {/* Choix de l'initiative */}
        <form.Field name="initiative">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Initiative
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre initiative"
              />
            </div>
          )}
        </form.Field>

        {/* Choix si inspiré ou pas */}
        <form.Field name="inspiration">
          {(field) => (
            <div className="flex-1 flex flex-wrap justify-center">
              <label
                htmlFor={field.name}
                className="block w-full flex flex-wrap justify-center text-xl font-uncial-antiqua gap-[8px]"
              >
                <span className="w-full block text-center">Inspiration ?</span>

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
                    <i className="fa-solid fa-check text-accent text-lg"></i>
                  )}
                </span>
              </label>
            </div>
          )}
        </form.Field>
      </div>

      <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
        {/* Choix de la vitesse */}
        <form.Field name="speed">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Vitesse
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre vitesse"
              />
            </div>
          )}
        </form.Field>

        {/* Choix de la vitesse de nage */}
        <form.Field name="swim_speed">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Vitesse de nage
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre vitesse de nage"
              />
            </div>
          )}
        </form.Field>

        {/* Choix de la vitesse d'escalade */}
        <form.Field name="climb_speed">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Vitesse d'escalade
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre vitesse d'escalade"
              />
            </div>
          )}
        </form.Field>

        {/* Choix de la vitesse de vol */}
        <form.Field name="fly_speed">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Vitesse de vol
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre vitesse de vol"
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

      {/* Jets de sauvegarde */}
      <div className="w-full my-[40px]">
        <label className="block text-xl font-uncial-antiqua mb-[8px]">
          Jets de sauvegarde
        </label>

        <div className="w-full flex flex-wrap justify-between gap-[40px]">
          {abilitiesDnD.data.map((ability, index) => (
            <div key={index} className="flex flex-wrap flex-col gap-[8px]">
              {/* Nom de la capacité */}
              <label className="font-uncial-antiqua text-lg">{ability.label}</label>

              {/* Id Abilities */}
              <form.Field
                name={`saving_throw[${index}].abilities_id`}
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

              {/* Maîtrise ou pas */}
              <form.Field name={`saving_throw[${index}].proficient`}>
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
              <form.Field name={`saving_throw[${index}].value`}>
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
            </div>
          ))}
        </div>
      </div >

      <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
        {/* Jets réussis contre la mort */}
        <form.Field name="death_saves_success">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Jets réussis contre la mort
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos jets réussis contre la mort"
              />
            </div>
          )}
        </form.Field>

        {/* Jets d'échecs contre la mort */}
        <form.Field name="death_saves_failed">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Jets d'échecs contre la mort
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos jets d'échecs contre la mort"
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
        {/* Maîtrise(s) d'armes */}
        <form.Field name="weapon_prof">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Maîtrise(s) d'armes
              </label>
              <input
                type="text"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre/vos maîtrise(s) d'armes"
              />
            </div>
          )}
        </form.Field>

        {/* Maîtrise(s) d'armure*/}
        <form.Field name="armor_prof">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Maîtrise(s) d'armure
              </label>
              <input
                type="text"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre/vos maîtrise(s) d'armure"
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Feats */}
      <div className="w-full my-[40px]">
        <label className="block text-xl font-uncial-antiqua mb-[8px]">
          Capacités et traits
        </label>

        <div className="w-full flex flex-col gap-4">
          {form.state.values.feats.map((_, index) => (
            <div key={index} className="flex flex-wrap gap-[8px]">
              {/* Nom */}
              <form.Field name={`feats[${index}].label`}>
                {(field) => (
                  <input
                    type="text"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder={`Nom de la capacité ${index + 1}`}
                  />
                )}
              </form.Field>

              {/* Description */}
              <form.Field name={`feats[${index}].description`}>
                {(field) => (
                  <input
                    type="text"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder={`Description de la capacité ${index + 1}`}
                  />
                )}
              </form.Field>

              {/* Acquis au niveau */}
              <form.Field name={`feats[${index}].level_acquired`}>
                {(field) => (
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder={`Capacité ${index + 1} acquise au niveau :`}
                  />
                )}
              </form.Field>

              {/* Supprimer un feat */}
              <button
                type="button"
                onClick={() => {
                  const updatedFeats = [...form.state.values.feats]
                  updatedFeats.splice(index, 1)
                  form.setFieldValue('feats', updatedFeats)
                  setFeatsCount((f) => f + 1)
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
              const current = form.state.values.feats ?? [];

              form.setFieldValue('feats', [
                ...current,
                {
                  label: '',
                  level_acquired: 1,
                  description: '',
                }
              ]);

              setFeatsCount((f) => f + 1)
            }}
            className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
          >
            <i className="fa-solid fa-plus text-2xl"></i>
          </button>
        </div>
      </div>

      <div className="w-full flex flex-wrap justify-between my-[40px] gap-[40px]">
        {/* Pièces de cuivre */}
        <form.Field name="copper">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Pièces de cuivre
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? 0}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos pièces de cuivre"
              />
            </div>
          )}
        </form.Field>

        {/* Pièces d'argent */}
        <form.Field name="silver">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Pièces d'argent
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos pièces d'argent"
              />
            </div>
          )}
        </form.Field>

        {/* Pièces d'electrum */}
        <form.Field name="electrum">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Pièces d'electrum
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? 0}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos pièces d'electrum"
              />
            </div>
          )}
        </form.Field>

        {/* Pièces d'argent */}
        <form.Field name="gold">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Pièces d'or
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos pièces d'or"
              />
            </div>
          )}
        </form.Field>

        {/* Pièces de platine */}
        <form.Field name="platinum">
          {(field) => (
            <div className="flex-1">
              <label
                htmlFor={field.name}
                className="block text-xl font-uncial-antiqua mb-[8px]"
              >
                Pièces de platine
              </label>
              <input
                type="number"
                name={field.name}
                id={field.name}
                value={field.state.value ?? ''}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez vos pièces de platine"
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
              <div className="size-[40px] font-uncial-antiqua flex flex-wrap justify-center content-center text-center text-2xl bg-primary rounded-lg border border-secondary cursor-not-allowed">
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

                {/* Propriétés */}
                <form.Field name={`weapons[${index}].properties`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Propriétés de l'arme ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Bonus */}
                <form.Field name={`weapons[${index}].bonus`}>
                  {(field) => (
                    <input
                      type="number"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? ''}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
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
                  bonus: 0,
                  properties: '',
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

      {/* Items */}
      <div className="w-full my-[40px]">
        <label className="block text-xl font-uncial-antiqua mb-[8px]">Objets de l'inventaire</label>

        <div className="w-full flex flex-col gap-4">
          {form.state.values.items.map((_, index) => (
            <div key={index} className="flex flex-wrap gap-[8px]">
              <div className="flex flex-wrap flex-1 gap-[8px]">
                {/* ID */}
                <div className="size-[40px] font-uncial-antiqua flex flex-wrap justify-center content-center text-center text-2xl bg-primary rounded-lg border border-secondary cursor-not-allowed">
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

      {/* Les sorts */}
      <div className='w-full flex flex-wrap justify-start my-[80px] gap-[16px]'>
        <label className="block w-full text-xl font-uncial-antiqua mb-[8px] underline">
          Sorts
        </label>

        <div className="w-full flex flex-wrap justify-between mb-[32px] gap-[40px]">
          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 1
            </label>
            {/* Emplacement 1 - Total */}
            <form.Field name="spells_slot[0].slots_1_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 1"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 1 - Utilisé */}
            <form.Field name="spells_slot[0].slots_1_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 1"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 2
            </label>
            {/* Emplacement 2 - Total */}
            <form.Field name="spells_slot[0].slots_2_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 2"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 2 - Utilisé */}
            <form.Field name="spells_slot[0].slots_2_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 2"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 3
            </label>
            {/* Emplacement 3 - Total */}
            <form.Field name="spells_slot[0].slots_3_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 3"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 3 - Utilisé */}
            <form.Field name="spells_slot[0].slots_3_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 3"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 4
            </label>
            {/* Emplacement 4 - Total */}
            <form.Field name="spells_slot[0].slots_4_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 4"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 4 - Utilisé */}
            <form.Field name="spells_slot[0].slots_4_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 4"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 5
            </label>
            {/* Emplacement 5 - Total */}
            <form.Field name="spells_slot[0].slots_5_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 5"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 5 - Utilisé */}
            <form.Field name="spells_slot[0].slots_5_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 5"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 6
            </label>
            {/* Emplacement 6 - Total */}
            <form.Field name="spells_slot[0].slots_6_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 6"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 6 - Utilisé */}
            <form.Field name="spells_slot[0].slots_6_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 6"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 7
            </label>
            {/* Emplacement 7 - Total */}
            <form.Field name="spells_slot[0].slots_7_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 7"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 7 - Utilisé */}
            <form.Field name="spells_slot[0].slots_7_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 7"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 8
            </label>
            {/* Emplacement 8 - Total */}
            <form.Field name="spells_slot[0].slots_8_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 8"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 8 - Utilisé */}
            <form.Field name="spells_slot[0].slots_8_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 8"
                  />
                </div>
              )}
            </form.Field>
          </div>

          <div className="flex-1 rounded-sm flex flex-wrap bg-primary justify-between p-[8px] gap-x-[40px] gap-y-[16px]">
            <label className="block w-full text-lg font-uncial-antiqua mb-[8px] ">
              Niveau 9
            </label>
            {/* Emplacement 9 - Total */}
            <form.Field name="spells_slot[0].slots_9_total">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre total d’emplacements niveau 9"
                  />
                </div>
              )}
            </form.Field>

            {/* Emplacement 9 - Utilisé */}
            <form.Field name="spells_slot[0].slots_9_used">
              {(field) => (
                <div className="flex-1">
                  <label
                    htmlFor={field.name}
                    className="block text-md font-uncial-antiqua mb-[8px]"
                  >
                    Utilisés
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ''}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                    placeholder="Entrez le nombre utilisés d’emplacements niveau 9"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-between mb-[32px] gap-[40px]">
          {/* DD de sauvegarde de sort */}
          <form.Field name="dd_spell">
            {(field) => (
              <div className="flex-1">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  DD de sauvegarde de sort
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Entrez votre DD de sauvegarde de sort"
                />
              </div>
            )}
          </form.Field>

          {/* Bonus de sort */}
          <form.Field name="spell_bonus_attack">
            {(field) => (
              <div className="flex-1">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Bonus d'attaque d'un sort
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  value={field.state.value ?? 0}
                  onChange={(e) => field.handleChange(Number(e.target.value))}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Entrez votre bonus d'attaque d'un sort"
                />
              </div>
            )}
          </form.Field>
        </div>

        <div className="w-full flex flex-col gap-4">
          {form.state.values.spells.map((_, index) => (
            <div key={index} className="flex flex-wrap gap-[8px]">
              {/* ID */}
              <div className="size-[40px] font-uncial-antiqua flex flex-wrap justify-center content-center text-center text-2xl bg-primary rounded-lg border border-secondary cursor-not-allowed">
                {index}
              </div>

              <div className="flex flex-wrap flex-1 gap-[8px]">
                {/* Nom */}
                <form.Field name={`spells[${index}].label`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? ''}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Nom du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Niveau */}
                <form.Field name={`spells[${index}].level`}>
                  {(field) => (
                    <input
                      type="number"
                      name={field.name}
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(Number(e.target.value))}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Niveau du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* École */}
                <form.Field name={`spells[${index}].school`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`École du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Temps d'invocation */}
                <form.Field name={`spells[${index}].casting_time`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Temps d'invocation du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Distance */}
                <form.Field name={`spells[${index}].range`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Distance effectuée du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Composants */}
                <form.Field name={`spells[${index}].components`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Composants du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Durée */}
                <form.Field name={`spells[${index}].duration`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Durée du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Description */}
                <form.Field name={`spells[${index}].description`}>
                  {(field) => (
                    <input
                      type="text"
                      name={field.name}
                      id={field.name}
                      value={field.state.value ?? 0}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="flex-1 p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Description du sort ${index + 1}`}
                    />
                  )}
                </form.Field>

                {/* Préparé ou pas */}
                <form.Field name={`spells[${index}].prepared`}>
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
                      Sort préparé ?
                    </label>
                  )}
                </form.Field>

                {/* Connu ou pas */}
                <form.Field name={`spells[${index}].known`}>
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
                      Sort connu ?
                    </label>
                  )}
                </form.Field>

                {/* Demande un rituel ou pas */}
                <form.Field name={`spells[${index}].is_ritual`}>
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
                      Demande un rituel ?
                    </label>
                  )}
                </form.Field>

                {/* Supprimer un sort */}
                <button
                  type="button"
                  onClick={() => {
                    const updatedSpells = [...form.state.values.spells]
                    updatedSpells.splice(index, 1)
                    form.setFieldValue('spells', updatedSpells)
                    setSpellsCount((i) => i - 1)
                  }}
                  className="size-[40px] text-background bg-red-600 hover:bg-background hover:text-red-600 hover:outline-2 hover:outline-red-600 p-2 rounded text-lg cursor-pointer"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          {/* Ajouter un nouveau sort */}
          <button
            type="button"
            onClick={() => {
              const current = form.state.values.spells ?? []
              form.setFieldValue('spells', [
                ...current,
                {
                  label: '',
                  level: 0,
                  school: '',
                  casting_time: '',
                  range: '',
                  components: '',
                  description: '',
                  duration: '',
                  prepared: false,
                  known: false,
                  is_ritual: false,
                },
              ])
              setSpellsCount((i) => i + 1)
            }}
            className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
          >
            <i className="fa-solid fa-plus text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Description de l'apparence */}
      <form.Field name="appareance">
        {(field) => (
          <div className="w-full my-[40px]">
            <label
              htmlFor={field.name}
              className="block text-xl font-uncial-antiqua mb-[8px]"
            >
              Apparence
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

      {/* Description de l'histoire */}
      <form.Field name="lore">
        {(field) => (
          <div className="w-full my-[40px]">
            <label
              htmlFor={field.name}
              className="block text-xl font-uncial-antiqua mb-[8px]"
            >
              Histoire
            </label>
            <textarea
              name={field.name}
              id={field.name}
              value={field.state.value ?? ''}
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
          <div className="w-full my-[40px]">
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
              placeholder="Décrivez le caractère de votre personnage"
            />
          </div>
        )}
      </form.Field>

      <div className="w-full flex flex-wrap gap-[16px]">
        <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Relations</h3>
        {/* Alliés */}
        <div className="flex-1 bg-primary p-[16px] text-base rounded-[3px]">
          <form.Field name="allies">
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Alliés
                </label>
                <textarea
                  name={field.name}
                  id={field.name}
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Listez vos alliés"
                />
              </div>
            )}
          </form.Field>
        </div>

        {/* Ennemis */}
        <div className="flex-1 bg-primary p-[16px] text-base rounded-[3px]">
          <form.Field name="enemies">
            {(field) => (
              <div>
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Ennemis
                </label>
                <textarea
                  name={field.name}
                  id={field.name}
                  value={field.state.value ?? ''}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Listez vos ennemis"
                />
              </div>
            )}
          </form.Field>
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
  );
}
