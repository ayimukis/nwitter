import React from "react";
import {authService} from "../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import AuthForm from "../components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../images/IMG_1A2A5AC66A79-1.jpeg"

const Auth = () => {
    const onSocialClick = async (event) => {
        const {target : { name }} = event;
        let provider;
        if ( name === "google" ) {
            provider = new GoogleAuthProvider();
        } else if ( name === "github" ) {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
    }

    return (
        <div className="authContainer">
            <img src={logo} width="350px" height="175px" style={{ marginBottom: "0px" }}/>
            <AuthForm />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">
                    Continue with Google <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">
                    Continue with Github <FontAwesomeIcon icon={faGithub} />
                </button>
            </div>
        </div>
    )
};
export default Auth