import React from "react";
import TableHeader from "./tableHeader";
import PropTypes from "prop-types";
import TableBody from "./tableBody";

const Table = ({ selectedSort, onSort, columns, data, children }) => {
    return (
        <table className="table">
            {children || (
                <>
                    <TableHeader {...{ selectedSort, onSort, columns }} />
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    selectedSort: PropTypes.object,
    onSort: PropTypes.func,
    columns: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.array
};

export default Table;
