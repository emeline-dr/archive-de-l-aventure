import avatarOne from '../assets/images/icons-avatar-1.jpg';
import avatarTwo from '../assets/images/icons-avatar-3.jpg';
import avatarThree from '../assets/images/icons-avatar-2.jpg';

function Sidebar() {
    return (
        <aside className="h-auto hidden md:flex flex-wrap justify-center content-start top-0 py-[20px] w-[50px] xl:w-[120px] bg-primary transition-all duration-300">
            <img src={avatarOne} alt="Avatar de Arlahne" className='mx-[20px] size-[40px] xl:size-[80px] object-cover outline-3 outline-secondary rounded-xs' />
            <span className='block w-full text-center font-uncial-antiqua text-lg mt-[8px] mb-[16px] truncate'>Arlahne</span>

            <img src={avatarTwo} alt="Avatar de Naoe Fujiwara" className='mx-[20px] size-[40px] xl:size-[80px] object-cover outline-3 outline-secondary rounded-xs' />
            <span className='block w-full text-center font-uncial-antiqua text-lg mt-[8px] mb-[16px] truncate'>Naoe Fujiwara</span>

            <img src={avatarThree} alt="Avatar de Elaine Ann Cormier" className='mx-[20px] size-[40px] xl:size-[80px] object-cover outline-3 outline-secondary rounded-xs' />
            <span className='block w-full text-center font-uncial-antiqua text-lg mt-[8px] mb-[16px] truncate'>Elaine Ann Cormier</span>

            <button className='mt-[16px] text-xl cursor-pointer'>
                <i className="fa-solid fa-plus p-2 outline-3 outline-text rounded-full"></i>
            </button>
        </aside>
    );
}

export default Sidebar;
