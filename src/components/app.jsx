import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./ui/navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "../layouts/main";
import Login from "../layouts/login";
import NotFound from "../layouts/notFound";
import Users from "../layouts/users";
import EditForm from "./ui/editForm";
import { UsersProvider } from "../hooks/useUsers";
import { ToastContainer } from "react-toastify";
import { ProfessionsProvider } from "../hooks/useProfessions";
import { QualitiesProvider } from "../hooks/useQualities";
import { AuthProvider } from "../hooks/useAuth";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (
        <>
            <NavBar />
            <AuthProvider>
                <ProfessionsProvider>
                    <QualitiesProvider>
                        <UsersProvider>
                            <Switch>
                                <Route
                                    path="/users/:userId/edit"
                                    component={EditForm}
                                />
                                <Route
                                    path="/users/:userId?"
                                    component={Users}
                                />
                                <Route exact path="/" component={Main} />
                                <Route path="/login/:type?" component={Login} />
                                <Route path="/404" component={NotFound} />
                                <Redirect to="/404" />
                            </Switch>
                        </UsersProvider>
                    </QualitiesProvider>
                </ProfessionsProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;
