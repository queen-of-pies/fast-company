import React, { useContext, useEffect, useState } from "react";
import qualityService from "../services/quality.service";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const QualitiesContext = React.createContext();
export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const getQualities = async () => {
            try {
                const content = await qualityService.fetchAll();
                setQualities(content);
                setIsLoading(false);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        getQualities();
    }, []);

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    const updateQuality = async (id, data) => {
        try {
            const content = await qualityService.update(id, data);
            setQualities((prevState) =>
                prevState.map((item) => {
                    if (item._id === content._id) {
                        return content;
                    }
                    return item;
                })
            );
            return content;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const deleteQuality = async (id) => {
        try {
            const content = await qualityService.delete(id);
            if (content && content._id === id) {
                setQualities((prevState) =>
                    prevState.filter((item) => item._id !== id)
                );
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const addQuality = async (data) => {
        try {
            const content = await qualityService.add(data);
            setQualities((prevState) => [...prevState, content]);
            return content;
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <QualitiesContext.Provider
            value={{
                qualities,
                isLoading,
                getQuality,
                updateQuality,
                addQuality,
                deleteQuality
            }}
        >
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
