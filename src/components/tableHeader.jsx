import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ selectedSort, onSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        scope="col"
                        key={column}
                        {...{ role: columns[column].path && "button" }}
                    >
                        {columns[column].name}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    selectedSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
