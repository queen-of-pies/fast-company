import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "../layouts/main";
import Login from "../layouts/login";
import NotFound from "../layouts/notFound";
import Users from "../layouts/users";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./common/protectedRoute";
import LogOut from "../layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "../store/qualities";
import { loadProfessionsList } from "../store/professions";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);

    return (
        <>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route exact path="/" component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;
