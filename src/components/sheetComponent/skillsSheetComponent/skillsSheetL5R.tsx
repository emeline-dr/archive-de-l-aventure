import type { SkillSheet } from "../../../api/sheetApi";

type SkillsSheetL5RProps = {
    skills: SkillSheet[];
};

export default function SkillsSheetL5R(props: SkillsSheetL5RProps) {
    return (
        <div className="w-full flex flex-col justify-start gap-[16px] bg-primary rounded-[3px] p-[8px]">
            {(!props.skills || props.skills.length === 0) ? (
                <span className="italic">Pas de compétence</span>
            ) : (
                props.skills.map((skill, index) => (
                    <div key={index} className="flex flex-wrap justify-start gap-[8px]">
                        {skill.proficient === true &&
                            <i className="fa-solid fa-circle-check text-2xl"></i>
                        }
                        {skill.proficient === false &&
                            <i className="fa-solid fa-circle text-2xl"></i>
                        }
                        <span className="font-uncial-antiqua text-xl leading-none">
                            {skill.value >= 0 ? `+${skill.value}` : skill.value}
                        </span>
                        {skill.label} ({skill.categories})
                    </div>
                ))
            )}
        </div>
    );
}
