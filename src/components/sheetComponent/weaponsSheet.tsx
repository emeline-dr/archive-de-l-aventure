import type { Weapon } from "../../api/sheetApi"

type WeaponsSheetProps = {
    system_id: number;
    weapons: Weapon[];
}

export default function WeaponsSheet(props: WeaponsSheetProps) {
    const { weapons } = props;

    return (
        <>
            <h3 className="block text-2xl font-uncial-antiqua mt-[40px] underline">Armes</h3>
            {(!weapons || weapons.length === 0) ? (
                <div className="w-full flex flex-wrap bg-primary p-[8px]">
                    <span className="italic">Pas d'armes</span>
                </div>
            ) : (weapons.map((weapon) => (
                <div className="w-full flex flex-wrap gap-[8px]">
                    <div className="flex flex-wrap content-center px-[8px] py-[16px] rounded-[3px] bg-primary">
                        <span className="font-uncial-antiqua text-xl">{weapon.label}</span>
                    </div>

                    {props.system_id === 2 &&
                        <>
                            <div className="flex flex-wrap content-center px-[8px] py-[16px] rounded-[3px] bg-primary">
                                <span>{weapon.properties}</span>
                            </div>


                            <div className="flex flex-wrap content-center px-[8px] py-[16px] rounded-[3px] bg-primary">
                                <span className="font-uncial-antiqua text-xl">Attaque</span>
                                <span className="self-center leading-[2] ps-[16px]">{weapon.bonus}</span>
                            </div>
                        </>
                    }

                    <div className="flex flex-wrap content-center px-[8px] py-[16px] rounded-[3px] bg-primary">
                        <span className="font-uncial-antiqua text-xl">Dégâts</span>
                        <span className="self-center leading-[2] ps-[16px]">{weapon.damage}</span>
                    </div>

                    {props.system_id === 2 &&
                        <div className="flex flex-wrap content-center px-[8px] py-[16px] rounded-[3px] bg-primary">
                            <span className="font-uncial-antiqua text-xl">Type</span>
                            <span className="self-center leading-[2] ps-[16px]">{weapon.damage_type}</span>
                        </div>
                    }

                    <div className="flex-1 flex flex-wrap content-center px-[8px] py-[16px] rounded-[3px] bg-primary">
                        <span className="font-uncial-antiqua text-xl">Autres</span>
                        <span className="self-center leading-[2] ps-[16px]">{weapon.notes ? weapon.notes : '/'}</span>
                    </div>
                </div>
            )))}
        </>
    )
}