import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import usersService from "../services/users.service";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens
} from "../services/localStorage.service";

const AuthContext = React.createContext();
export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    console.log(currentUser);

    function randomInt(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("accounts:signUp", {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                ...rest
            });
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
        try {
            const { data } = await httpAuth.post(
                "accounts:signInWithPassword",
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            );
            setTokens(data);
            getUserData();
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

    async function getUserData() {
        try {
            const { content } = await usersService.getCurrentUser();
            setCurrentUser(content);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signUp, signIn, currentUser }}>
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
