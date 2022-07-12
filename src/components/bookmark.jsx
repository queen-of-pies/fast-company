import React from "react";

const Bookmark = (props) => {
  const { favorites } = props;

  return favorites ? (
    <i className="bi bi-bookmark-fill"></i>
  ) : (
    <i className="bi bi-bookmark"></i>
  );
};

export default Bookmark;
