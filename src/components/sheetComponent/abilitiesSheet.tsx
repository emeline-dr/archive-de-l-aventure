import type { Ability } from '../../api/sheetApi';
import bgAbility from '../../assets/images/fondSheetCarac.png'

type AbilitiesSheetProps = {
    abilities: Ability[];
    system_id: number;
    sheet_id: number;
};

function AbilitiesSheet(props: AbilitiesSheetProps) {
    const { abilities } = props;

    if (!abilities || abilities.length === 0) return <p>Aucune capacité disponible.</p>;

    return (
        <div className="flex flex-wrap justify-between gap-[8px] max-w-3/4 bg-primary px-[8px] py-[16px] rounded-[3px]">
            {abilities.map((ability, index) => {
                const isEvenIndex = index % 2 === 0;

                return (
                    <div className="w-[140px]" key={ability.id}>
                        <h3 className="font-uncial-antiqua text-[32px] truncate h-[35px] text-center leading-none">
                            {ability.label}
                        </h3>
                        <div className="h-[155px] w-[140px] mt-[24px]"
                            style={{
                                backgroundImage: `url(${bgAbility})`,
                                backgroundColor: 'var(--color-primary)',
                                backgroundSize: 'contain',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundBlendMode: 'overlay',
                                transform: isEvenIndex ? 'scaleX(-1)' : 'none',
                            }}>
                            <div className="h-full flex flex-wrap flex-col justify-between content-center font-uncial-antiqua"
                                style={{
                                    transform: isEvenIndex ? 'scaleX(-1)' : 'none',
                                    marginLeft: '16px',
                                }}>
                                <span className="text-[32px] pt-[48px]">
                                    {ability.value}
                                </span>
                                <span className="text-2xl pb-[16px]">
                                    {ability.modifier >= 0 ? `+${ability.modifier}` : ability.modifier}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AbilitiesSheet;
