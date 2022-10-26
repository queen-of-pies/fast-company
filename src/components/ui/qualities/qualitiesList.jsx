import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities();
    return !isLoading ? (
        qualities ? (
            qualities.map((qual) => {
                const q = getQuality(qual);
                return (
                    <span key={q._id} className={`badge bg-${q.color} m-1`}>
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
