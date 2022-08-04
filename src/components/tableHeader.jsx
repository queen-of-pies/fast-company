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

    const renderIcon = (column) => {
        if (
            columns[column].path &&
            selectedSort.path === columns[column].path
        ) {
            return selectedSort.order === "asc" ? (
                <i className="bi bi-caret-up-fill m-lg-1"></i>
            ) : (
                <i className="bi bi-caret-down-fill m-lg-1"></i>
            );
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
                        <div className="d-flex">
                            {columns[column].name} {renderIcon(column)}
                        </div>
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
