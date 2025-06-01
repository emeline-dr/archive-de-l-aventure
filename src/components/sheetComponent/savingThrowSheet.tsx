import type { SavingThrows } from "../../api/sheetApi"

type SavingThrowSheetProps = {
    savingThrows: SavingThrows[];
    success: number;
    failed: number;
}

export default function SavingThrowSheet(props: SavingThrowSheetProps) {
    const { savingThrows } = props;
    return (
        <>
            <div className="w-[300px] flex flex-wrap flex-col justify-start gap-[8px] rounded-[3px]">
                <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Jets de sauvegarde</h3>
                <div className="w-full bg-primary rounded-[3px] p-[8px] flex flex-col justify-between gap-[16px]">
                    {savingThrows.map((s_t) => (
                        <div className="flex flex-row content center gap-[8px]">
                            {s_t.proficient === true &&
                                <i className="fa-solid fa-circle-check text-2xl"></i>
                            }
                            {s_t.proficient === false &&
                                <i className="fa-solid fa-circle text-2xl"></i>
                            }

                            <span className="text-xl font-uncial-antiqua leading-none">
                                {s_t.value >= 0 ? `+${s_t.value}` : s_t.value}
                            </span>
                            <span className="text-base">
                                {s_t.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-[300px] flex flex-wrap flex-col justify-start gap-[8px] rounded-[3px]">
                <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Contre la mort</h3>
                <div className="w-full flex flex-wrap justify-between gap-[8px] bg-primary rounded-[3px] p-[8px]">
                    <div className="flex-1">
                        <span className="block w-full text-base">Succès</span>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <i
                                key={index}
                                className={`fa-regular fa-heart text-[24px] ${index < props.success ? 'text-green-600' : 'text-text'
                                    }`}
                            ></i>
                        ))}

                    </div>

                    <div className="flex-1">
                        <span className="block w-full text-base">Échecs</span>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <i
                                key={index}
                                className={`fa-solid fa-skull text-[24px] ${index < props.failed ? 'text-red-800' : 'text-text'
                                    }`}
                            ></i>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}