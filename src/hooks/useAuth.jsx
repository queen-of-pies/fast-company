import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import usersService from "../services/users.service";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const AuthContext = React.createContext();
const httpAuth = axios.create();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, ...rest });
        } catch (error) {
            const { code, message } = error.response.data.error;
            toast.error(message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObj = {
                        email: "Пользователь с таким email не существует"
                    };
                    throw errorObj;
                }
            }
        }
    }

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
        } catch (error) {
            const { code, message } = error.response.data.error;
            toast.error(message);
            if (code === 400) {
                if (message === "INVALID_PASSWORD") {
                    const errorObj = {
                        password: "Неверно введен пароль"
                    };
                    throw errorObj;
                }
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObj = {
                        email: "Неверно введен email"
                    };
                    throw errorObj;
                }
            }
        }
    }

    async function createUser(data) {
        try {
            await usersService.create(data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <AuthContext.Provider value={{ signUp, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
