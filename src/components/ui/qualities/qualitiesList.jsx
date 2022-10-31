import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getQualities,
    getQualitiesLoadingStatus,
    loadQualitiesList
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    const qualitiesList = useSelector(getQualities());

    useEffect(() => {
        dispatch(loadQualitiesList());
    }, []);

    const getQualityById = (id) =>
        qualitiesList.find((quality) => quality._id === id);

    return !isLoading ? (
        qualities ? (
            qualities.map((qual) => {
                const q = getQualityById(qual);
                return (
                    <span
                        key={`${q._id}${q.name}`}
                        className={`badge bg-${q.color} m-1`}
                    >
                        {q.name}
                    </span>
                );
            })
        ) : (
            ""
        )
    ) : (
        <span>Loading...</span>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
