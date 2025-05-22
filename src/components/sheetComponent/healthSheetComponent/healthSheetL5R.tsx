type HealthSheetL5RProps = {
    endurance: number;
    endu_fatigue: number;
    composure: number;
    composure_strife: number;
    focus: number;
    vigilance: number;
    void_max: number;
    void_now: number;
}

export default function HealthSheetL5R(props: HealthSheetL5RProps) {
    return (
        <>
            <div className="w-full flex flex-wrap flex-col justify-between border-b-1 border-b-background text-lg text-center font-uncial-antiqua">
                <div className="w-full flex flex-wrap justify-between mb-[8px]">
                    <div className="flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background">
                        Endu.
                        <span className="text-[32px]">{props.endurance}</span>
                    </div>

                    <div className="flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background">
                        Fatigue
                        <span className="text-[32px]">{props.endu_fatigue}</span>
                    </div>

                    <div className="flex-1 flex flex-wrap flex-col justify-between">
                        Attention
                        <span className="text-[32px]">{props.focus}</span>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap flex-col justify-between border-b-1 border-b-background text-lg text-center font-uncial-antiqua">
                <div className="w-full flex flex-wrap justify-between mb-[8px]">
                    <div className="flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background">
                        Sang-froid
                        <span className="text-[32px]">{props.composure}</span>
                    </div>

                    <div className="flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background">
                        Conflit
                        <span className="text-[32px]">{props.composure_strife}</span>
                    </div>

                    <div className="flex-1 flex flex-wrap flex-col justify-between">
                        Vigilance
                        <span className="text-[32px]">{props.vigilance}</span>
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-wrap flex-col justify-between text-lg text-center font-uncial-antiqua">
                <span className="w-full text-center text-xl">Points de vide</span>
                <div className="w-full flex flex-wrap justify-between">
                    <div className="flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background">
                        Max.
                        <span className="text-[32px]">{props.void_max}</span>
                    </div>

                    <div className="flex-1 flex flex-wrap flex-col justify-between">
                        Actuels
                        <span className="text-[32px]">{props.void_now}</span>
                    </div>
                </div>
            </div>
        </>
    )
} 