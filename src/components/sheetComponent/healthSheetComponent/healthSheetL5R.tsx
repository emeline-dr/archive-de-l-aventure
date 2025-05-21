type HealthSheetL5RProps = {
    sheet_id: number;
}

export default function HealthSheetL5R(props: HealthSheetL5RProps) {
    return (
        <div className="w-full flex flex-wrap flex-col justify-between border-b-1 border-b-background text-2xl text-center font-uncial-antiqua">
            P.V. Max
            <span className="text-[32px]">{props.sheet_id}</span>
        </div>
    )
} 