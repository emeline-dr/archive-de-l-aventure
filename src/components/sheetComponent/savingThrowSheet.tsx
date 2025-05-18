export default function SavingThrowSheet() {
    return (
        <>
            <div className="w-[300px] flex flex-wrap justify-between gap-[8px] p-[8px] rounded-[3px]">
                <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Jets de sauvegarde</h3>
                <div className="w-full bg-primary rounded-[3px] p-[8px]"></div>
            </div>

            <div className="w-[300px] flex flex-wrap justify-between gap-[8px] p-[8px] rounded-[3px]">
                <h3 className="w-full block text-2xl font-uncial-antiqua mt-[40px] mb-[40px] underline">Contre la mort</h3>
                <div className="w-full flex flex-wrap justify-between gap-[8px] bg-primary rounded-[3px] p-[8px]">
                    <div className="flex-1">
                        <span className="block w-full text-base">Succès</span>
                        <i className="fa-regular fa-heart text-[24px]"></i>
                        <i className="fa-regular fa-heart text-[24px] mx-[8px]"></i>
                        <i className="fa-regular fa-heart text-[24px]"></i>
                    </div>

                    <div className="flex-1">
                        <span className="block w-full text-base">Échecs</span>
                        <i className="fa-solid fa-skull text-[24px]"></i>
                        <i className="fa-solid fa-skull text-[24px] mx-[8px]"></i>
                        <i className="fa-solid fa-skull text-[24px]"></i>
                    </div>
                </div>
            </div>
        </>
    )
}