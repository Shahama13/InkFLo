import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

function LogIn(props) {
    const [credential, setCredential] = useState({email:"", password:""})
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5500/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email:credential.email, password:credential.password })
        });
        const json = await response.json();
        console.log(json)
        
        if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken)
            props.showAlert(" LoggedIn Successfully", "success")
            navigate("/")
        }
        else{
            props.showAlert("Invalid Email or Password", "danger")
        }
    }
    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h3 className='my-4'>LogIn to Continue</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" value={credential.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" value={credential.password} onChange={onChange} className="form-control" id="password" />
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default LogIn