import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = useSelector(getCurrentUserData());

    const toggleMenuOpen = () => {
        setIsOpen(!isOpen);
    };

    if (!currentUser) {
        return "Loading";
    }
    return (
        <div className="dropdown me-2" onClick={toggleMenuOpen}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt="avatar"
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? "show" : "")}>
                <Link
                    className="dropdown-item"
                    to={`/users/${currentUser._id}`}
                >
                    Profile
                </Link>
                <Link className="dropdown-item" to={`/logout`}>
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
