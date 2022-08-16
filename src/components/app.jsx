import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import NavBar from "./navBar";
import { Redirect, Route, Switch } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import NotFound from "./layouts/notFound";
import Users from "./layouts/users";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;
