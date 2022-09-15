import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 p-4 shadow">
                    {formType === "register" ? (
                        <>
                            <RegisterForm />{" "}
                            <p>
                                Already have account?
                                <a type="button" onClick={toggleFormType}>
                                    Log in
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <LoginForm />{" "}
                            <p>
                                Do not have account?
                                <a type="button" onClick={toggleFormType}>
                                    Sign in
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
