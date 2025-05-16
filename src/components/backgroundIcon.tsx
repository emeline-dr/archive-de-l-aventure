import diceBackground from '../assets/images/background-ornement.png'

function BackgroundIcon() {
    return (
        <img src={diceBackground} alt="" className='fixed z-0 bottom-[40px] end-[40px] h-[240px] object-cover opacity-50 mix-blend-luminosity' />
    )
}

export default BackgroundIcon;