import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import professionsService from "../services/professions.service";

const ProfessionsContext = React.createContext();

export const useProfessions = () => {
    return useContext(ProfessionsContext);
};

export const ProfessionsProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProfessions();
    }, []);

    const getProfessions = async () => {
        try {
            const content = await professionsService.fetchAll();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const getProfession = (id) => {
        return professions.find((prof) => prof._id === id);
    };

    return (
        <ProfessionsContext.Provider
            value={{ professions, isLoading, getProfession }}
        >
            {children}
        </ProfessionsContext.Provider>
    );
};

ProfessionsProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
