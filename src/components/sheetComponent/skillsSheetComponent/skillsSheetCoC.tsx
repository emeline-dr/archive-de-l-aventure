import type { SkillSheet } from "../../../api/sheetApi";

type SkillsSheetCoCProps = {
    skills: SkillSheet[];
};

export default function SkillsSheetCoC(props: SkillsSheetCoCProps) {
    return (
        <div className="w-full flex flex-col justify-start gap-[16px] bg-primary rounded-[3px] p-[8px]">
            {props.skills.map((skill, index) => (
                <div key={index} className="flex flex-wrap justify-start gap-[8px]">
                    <i className="fa-solid fa-circle text-2xl"></i>
                    <span className="font-uncial-antiqua text-xl leading-none">{skill.value >= 0 ? `+${skill.value}` : skill.value}</span>
                    {skill.label} ({skill.categories})
                </div>
            ))}
        </div>
    );
}
