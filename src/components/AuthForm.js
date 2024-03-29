import React, {useState}  from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {authService} from "../fbase";

const inputStyles = {};

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if ( name === "email" ) {
            setEmail(value);
        } else if ( name === "password" ) {
            setPassword(value);
        }
        // console.log(`${email},${password}`)
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if ( newAccount ) {
                // create account
                data = await createUserWithEmailAndPassword(
                    authService,
                    email,
                    password
                )
            } else {
                // log in
                data = await signInWithEmailAndPassword(
                    authService,
                    email,
                    password
                )
            }
            console.log(data);
        } catch (error) {
            console.log(error)
            setError(error.code);
        }

    }
    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input type="submit" className="authInput authSubmit" value={newAccount ? "Create Account" : "Sign In"}/>
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign in." : "Create Account"}</span>
        </>
    )
}

export default AuthForm