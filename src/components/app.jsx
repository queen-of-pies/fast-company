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

const App = () => {
    return (
        <>
            <NavBar />
            <ProfessionsProvider>
                <QualitiesProvider>
                    <Switch>
                        <Route exact path="/" component={Main} />
                        <Route path="/login/:type?" component={Login} />
                        <UsersProvider>
                            <Route
                                path="/users/:userId/edit"
                                component={EditForm}
                            />
                            <Route path="/users/:userId?" component={Users} />
                        </UsersProvider>
                        <Route path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </QualitiesProvider>
            </ProfessionsProvider>
            <ToastContainer />
        </>
    );
};

export default App;
