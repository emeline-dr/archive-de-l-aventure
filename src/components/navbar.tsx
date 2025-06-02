import { Link } from "@tanstack/react-router"
import { useLocation } from "@tanstack/react-router"
import Cookies from "js-cookie";

import logo from "../assets/images/logo.png"

import { getDecodedJwt } from "../utils/AuthUtils";

function Navbar() {
    const location = useLocation();

    const decodedToken = getDecodedJwt();

    const userName = decodedToken?.username ?? '';

    let iconLink = '/index';

    if (location.pathname.includes('signIn') || location.pathname.includes('login')) {
        iconLink = '/';
    }

    const logout = () => {
        Cookies.remove('authToken');
        window.location.href = '/login';
    }

    return (
        <>
            {location.pathname !== '/' &&
                <nav className='bg-text justify-center md:justify-between flex flex-wrap px-[40px] py-[12px]'>
                    <Link to={iconLink} className="flex flex-wrap text-background font-uncial-antiqua md:ms-[40px]">
                        <img src={logo} alt="" className="h-[100px] object-cover" />
                        <h1 className="h-fit self-center ms-[24px] text-4xl">Les AdA</h1>
                    </Link>
                    {location.pathname.includes('signIn') &&
                        <Link to="/login" className="self-center text-background h-fit">
                            <button className="btn btn-accent">Se connecter</button>
                        </Link>
                    }
                    {location.pathname.includes('login') &&
                        <Link to="/signIn" className="self-center text-background h-fit">
                            <button className="btn btn-accent">S'inscrire</button>
                        </Link>
                    }
                    {decodedToken &&
                        <div className="self-center text-center">
                            <Link to="/index" activeProps={{ className: 'underline' }} className="font-uncial-antiqua block lg:inline-block text-2xl tracking-[5%] text-accent h-fit hover:underline">
                                Accueil
                            </Link>
                            <Link to="/myCharacters" activeProps={{ className: 'underline' }} className="font-uncial-antiqua block lg:inline-block text-2xl tracking-[5%] text-accent h-fit mx-[16px] hover:underline">
                                Mes aventuriers
                            </Link>
                            <Link to="/registers" activeProps={{ className: 'underline' }} className="font-uncial-antiqua block lg:inline-block text-2xl tracking-[5%] text-accent h-fit hover:underline">
                                Les registres
                            </Link>

                            <button
                                onClick={logout}
                                className="inline-flex btn-accent text-[30px] p-2 rounded-sm ms-[16px] cursor-pointer">
                                <span className="text-lg me-[8px]">{userName}</span>
                                <i className="fa-solid fa-right-from-bracket"></i>
                            </button>
                        </div>
                    }
                </nav>
            }
        </>
    )
}

export default Navbar
