import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div className="center ma4">
      <div>
        <div className="f3">{`${name}, Your current entry count is:`}</div>
        <div className="f2">{entries}</div>
      </div>
    </div>
  );
};

export default Rank;
