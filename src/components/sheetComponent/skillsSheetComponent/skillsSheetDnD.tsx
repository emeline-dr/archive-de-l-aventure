type SkillsSheetDnDProps = {
    skills: {
        label: string;
        value: number;
    }[];
};

export default function SkillsSheetDnD(props: SkillsSheetDnDProps) {
    return (
        <div className="w-full bg-primary rounded-[3px] p-[8px]">
            {props.skills.map((skill, index) => (
                <li key={index}>
                    {skill.label}: {skill.value}
                </li>
            ))}
        </div>
    );
}
