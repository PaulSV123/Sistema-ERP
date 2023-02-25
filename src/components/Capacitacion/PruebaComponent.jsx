import React from "react";

const PruebaComponent = ({ arr, caso }) => {
  console.log(arr);
  return (
    <div className="">
      {caso === "name" &&
        arr.map((item) => {
          return (
            <div className="p-1 border-2 border-y-2  border-black">
              {item.name}
            </div>
          );
        })}
      {caso === "actividad" &&
        arr.map((item) => {
          return (
            <div className="p-1 border-2 border-y-2  border-black">
              {item.actividad}
            </div>
          );
        })}
      {caso === "descripActiv" &&
        arr.map((item) => {
          return (
            <div className="p-1 border-2 border-y-2  border-black">
              {item.descripActiv}
            </div>
          );
        })}
    </div>
  );
};

export default PruebaComponent;
