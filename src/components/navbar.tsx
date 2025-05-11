import { Link } from "@tanstack/react-router"
import { useLocation } from "@tanstack/react-router"

import logo from "../assets/images/logo.png"

function Navbar() {
    const location = useLocation();

    return (
        <>
            {location.pathname !== '/' &&
                <nav className='bg-text justify-center md:justify-between flex flex-wrap px-[40px] py-[12px]'>
                    <Link to="/" className="flex flex-wrap text-background font-uncial-antiqua md:ms-[40px]">
                        <img src={logo} alt="" className="h-[100px] object-cover" />
                        <h1 className="h-fit self-center ms-[24px] text-4xl">Les AdA</h1>
                    </Link>
                    {location.pathname.includes('register') &&
                        <Link to="/login" className="self-center text-background h-fit">
                            <button className="btn btn-accent">Se connecter</button>
                        </Link>
                    }
                    {location.pathname.includes('login') &&
                        <Link to="/register" className="self-center text-background h-fit">
                            <button className="btn btn-accent">S'inscrire</button>
                        </Link>
                    }
                </nav>
            }
        </>
    )
}

export default Navbar
