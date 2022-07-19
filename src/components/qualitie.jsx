import React from "react";

const QualitieList = (props) => {
    const { qualities } = props;
    return qualities.map((qual) => (
        <span key={qual._id} className={`badge bg-${qual.color} m-1`}>
            {qual.name}
        </span>
    ));
};

export default QualitieList;
