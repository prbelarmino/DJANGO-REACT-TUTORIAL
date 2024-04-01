import Form from "../components/Form"
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Link.css'
function Login() {
    return (
        <div  className="container">
            <Form route="/api/token/" method="login" />
            <Link to="/Register" className="link">
                Register
            </Link>
        </div>
    )
    
}

export default Login