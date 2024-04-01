import Form from "../components/Form"
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/Link.css'
function Login() {
    return <Form route="/api/token/" method="login" />
}

export default Login