type HealthSheetCoCProps = {
    hit_point: number;
    major_wound: number;
    dying: boolean;
    unconscious: boolean;
    magic_points: number;
    luck: number;
}

export default function HealthSheetCoC(props: HealthSheetCoCProps) {
    return (
        <>
            <div className="h-fit w-full flex flex-wrap justify-between border-b-1 border-b-background pb-[8px] text-lg text-center font-uncial-antiqua">
                <div className="w-full flex flex-wrap justify-between">
                    <div className="h-fit flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background">
                        P.V. Max
                        <span className="text-[32px]">{props.hit_point}</span>
                    </div>

                    <div className="h-fit flex-1 flex flex-wrap flex-col justify-between">
                        Blessure(s)
                        <span className="text-[32px]">{props.major_wound}</span>
                    </div>
                </div>
            </div>

            <div className="h-fit w-full flex flex-wrap justify-between border-b-1 border-b-background pb-[8px]">
                <div className="h-fit flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background text-lg text-center font-uncial-antiqua">
                    Inconscient
                    {props.unconscious === true &&
                        <i className="fa-solid fa-check"></i>
                    }
                    {props.unconscious === false &&
                        <i className="fa-solid fa-x"></i>
                    }
                </div>

                <div className="h-fit flex-1 flex flex-wrap flex-col justify-between text-lg text-center font-uncial-antiqua">
                    Mourant
                    {props.dying === true &&
                        <i className="fa-solid fa-check"></i>
                    }
                    {props.dying === false &&
                        <i className="fa-solid fa-x"></i>
                    }
                </div>
            </div>
            <div className="h-fit w-full flex flex-wrap justify-between pb-[8px]">
                <div className="h-fit flex-1 flex flex-wrap flex-col justify-between border-e-1 border-e-background text-lg text-center font-uncial-antiqua">
                    P.M.
                    <span className="text-[32px]">{props.magic_points}</span>
                </div>

                <div className="h-fit flex-1 flex flex-wrap flex-col justify-between text-lg text-center font-uncial-antiqua">
                    Chance
                    <span className="text-[32px]">{props.luck}</span>
                </div>
            </div>
        </>
    )
}