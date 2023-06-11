import { Link, useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
const Navbar = () => {

    let location = useLocation();
    let navigate = useNavigate();
    const Handlelogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    const [name, setName] = useState('');

    (async () => {
        const response = await fetch('http://localhost:5500/api/auth/getuser', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setName(json.name);
    })();

    return (

        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">InkFlo - Your Notes on Cloud</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Add</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  ${location.pathname === '/view' ? "active" : ""}`} to="/view">View</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className="btn btn-primary" to="/signup" role="button">SignUp</Link>
                        <Link className="btn btn-primary mx-2" to="/login" role="button">LogIn</Link>
                    </form> : <>
                        <span className='text-light mx-2'><i className="fa-regular fa-user mx-2" style={{color: "#9baac5"}}></i>{name}</span>
                        <button onClick={Handlelogout} className='btn btn-primary'>LogOut</button>
                    </>}
                </div>
            </div>
        </nav>

    )
}

export default Navbar
