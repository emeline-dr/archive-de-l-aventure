import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { useSkillCoCFiltered } from "../../api/CoC/skillCoCApi";

export function CthulhuFormComponent() {
  const skillCoC = useSkillCoCFiltered();

  const form = useForm({
    defaultValues: {
      avatar: "",
      firstName: "",
      lastName: "",
      gender: "",
      age: "",
      residence: "",
      birthPlace: "",
      occupation: "",
      statFor: "",
      statDex: "",
      statPou: "",
      statCon: "",
      statApp: "",
      statEdu: "",
      statTai: "",
      statInt: "",
      skills: [
        {
          label: "",
          value: "",
        },
      ],
      weapons: [
        {
          id: "",
          name: "",
          type: "",
          damage: "",
          notes: "",
        },
      ],
      personalDesc: "",
      traits: "",
      believes: "",
      meaningfulLocation: "",
      treasuredPossession: "",
      injuriesScar: "",
      phobiaMania: "",
      tomeSpellsArtifacts: "",
      encounters: "",
      assets: "",
      fellowInvestigators: [
        {
          name: "",
          player: "",
        },
      ],
    },
    onSubmit: async ({ value }) => {
      console.log("Fiche envoyée avec :", value);
    },
  });

  const [exportStatInt, setExportStatInt] = useState(0);
  const [, setSkillsCount] = useState(0);
  const [, setWeaponCount] = useState(0);
  const [, setFellowInvestigators] = useState(0);

  if (skillCoC.isLoading) return <p>Chargement des compétences...</p>;
  if (skillCoC.error) return <p>Erreur : {skillCoC.error.message}</p>;
  if (!skillCoC.data) return null;

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
                type="text"
                name={field.name}
                id={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
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
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Entrez votre profession"
              />
            </div>
          )}
        </form.Field>
      </div>

      <div className="w-full flex flex-wrap mt-[40px]">
        <div className="w-full flex flex-wrap justify-between gap-y-[8px]">
          {/* Force */}
          <form.Field name="statFor">
            {(field) => (
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
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
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
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

          {/* Taille */}
          <form.Field name="statTai">
            {(field) => (
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Taille
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Entrez votre Taille"
                />
              </div>
            )}
          </form.Field>

          {/* Dextérité */}
          <form.Field name="statDex">
            {(field) => (
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
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
          {/* Apparence */}
          <form.Field name="statApp">
            {(field) => (
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Apparence
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Entrez votre Apparence"
                />
              </div>
            )}
          </form.Field>

          {/* Intelligence */}
          <form.Field name="statInt">
            {(field) => (
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Intelligence
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  onChange={(e) => {
                    field.handleChange(e.target.value);

                    const newStatInt =
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10) * 2
                        : 0;
                    setExportStatInt(newStatInt);
                  }}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Entrez votre Intelligence"
                />
              </div>
            )}
          </form.Field>

          {/* Pouvoir */}
          <form.Field name="statPou">
            {(field) => (
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Charisme
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Entrez votre Pouvoir"
                />
              </div>
            )}
          </form.Field>

          {/* Éducation */}
          <form.Field name="statEdu">
            {(field) => (
              <div className="w-[240px]">
                <label
                  htmlFor={field.name}
                  className="block text-xl font-uncial-antiqua mb-[8px]"
                >
                  Éducation
                </label>
                <input
                  type="number"
                  name={field.name}
                  id={field.name}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                  placeholder="Entrez votre Éducation"
                />
              </div>
            )}
          </form.Field>
        </div>
      </div>

      {/* Compétences */}
      <div className="w-full mt-[40px]">
        <label className="block text-xl font-uncial-antiqua mb-[8px]">
          Compétences de l'investigateur{" "}
          <i className="font-crimson-text text-sm">
            (max. {exportStatInt} pts)
          </i>
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
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
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

              {/* Valeur */}
              <form.Field name={`skills[${index}].value`}>
                {(field) => (
                  <input
                    type="number"
                    name={field.name}
                    id={field.name}
                    value={field.state.value ?? ""}
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
                  const updatedSkills = [...form.state.values.skills];
                  updatedSkills.splice(index, 1);
                  form.setFieldValue("skills", updatedSkills);
                  setSkillsCount((c) => c - 1);
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
              form.setFieldValue("skills", [
                ...current,
                {
                  label: "",
                  value: "",
                },
              ]);
              setSkillsCount((s) => s + 1);
            }}
            className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
          >
            <i className="fa-solid fa-plus text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Armes */}
      <div className="w-full mt-[40px]">
        <label className="block text-xl font-uncial-antiqua mb-[8px]">
          Armes
        </label>

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
                      value={field.state.value ?? ""}
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
                      value={field.state.value ?? ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="w-[240px] p-[8px] bg-primary rounded-lg border border-secondary"
                      placeholder={`Type de l'arme ${index + 1}`}
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
                      value={field.state.value ?? ""}
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
                      value={field.state.value ?? ""}
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
                    const updatedWeapons = [...form.state.values.weapons];
                    updatedWeapons.splice(index, 1);
                    form.setFieldValue("weapons", updatedWeapons);
                    setWeaponCount((c) => c - 1);
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
              const current = form.state.values.weapons ?? [];
              form.setFieldValue("weapons", [
                ...current,
                {
                  id: "",
                  name: "",
                  type: "",
                  damage: "",
                  notes: "",
                },
              ]);
              setWeaponCount((w) => w + 1);
            }}
            className="size-[40px] bg-text text-background hover:bg-background hover:border-2 hover:border-text hover:text-text rounded flex justify-center items-center cursor-pointer"
          >
            <i className="fa-solid fa-plus text-2xl"></i>
          </button>
        </div>
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
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full p-[8px] bg-primary rounded-lg border border-secondary"
                placeholder="Listez les bien précieux de votre personnage"
              />
            </div>
          )}
        </form.Field>
      </div>

      {/* Amis investigateurs */}
      <div className="w-full mt-[40px]">
        <label className="block text-xl font-uncial-antiqua mb-[8px]">
          Amis investigateurs
        </label>

        <div className="w-full flex flex-col gap-4">
          {form.state.values.fellowInvestigators.map((_, index) => (
            <div key={index} className="flex flex-wrap gap-[8px]">
              {/* Nom */}
              <form.Field name={`fellowInvestigators[${index}].name`}>
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
                    type="number"
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
                  form.setFieldValue(
                    "fellowInvestigators",
                    updatedFellowInvestigators
                  );
                  setFellowInvestigators((c) => c - 1);
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
              const current = form.state.values.fellowInvestigators ?? [];
              form.setFieldValue("fellowInvestigators", [
                ...current,
                {
                  name: "",
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

      {/* Bouton de soumission */}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn btn-text mt-[40px]"
          >
            {isSubmitting ? "..." : "Créer la fiche de cet aventurier"}
          </button>
        )}
      </form.Subscribe>
    </form>
  );
}
