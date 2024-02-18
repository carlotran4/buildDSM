import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function BullInfo() {
  const [moreExpanded, setMoreExpanded] = useState(false);
  const bullData = useLocation().state;

  const dataTableFromBullData = Object.entries(bullData).map(([key, value]) => {
    return (
      <tr className="border border-black text-lg" key={key}>
        <td className="border border-black px-2">
          {key
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </td>
        <td className="border border-black px-2">{value}</td>
      </tr>
    );
  });

  return (
    <div className="ml-4 mt-4">
      <h1 className="text-5xl italic my-4 bg-neutral-900 text-neutral-200 text-center rounded-3xl p-4">{bullData.bull_name}</h1>

      <div className="grid grid-cols-5">
        <img src={"bullPictures/" + bullData.type_of_bull + ".jpg"} alt="bull" className="col-span-2 rounded-lg w-full" />
        <div className="col-span-1 ml-4 italic">
          <p className="text-5xl">${bullData.price_of_semen}</p>
          <p className="text-lg">price per vial</p>
          <button className="bg-[#82c560] border-2 border-black rounded-xl shadow-md text-2xl px-4 py-2 mt-4">PLACE AN ORDER</button>
        </div>
        <div className="col-span-2 text-left mx-4">
          <h1 className="font-bold text-3xl">Quick Facts</h1>
          <p className="text-2xl">Age of Collection: {bullData.age_at_collection} Years Old</p>
          <p className="text-2xl">Breed: {bullData.type_of_bull}</p>
          <p className="text-2xl">Calving Ease Direct (CED): {bullData.calving_ease_direct}</p>
          <p className="text-2xl">Residual Average Daily Gain (RADG): {bullData.residual_average_daily_gain} lbs</p>
          <p className="text-2xl">Marbling Score: {bullData.marbling_score}</p>
        </div>
      </div>

      {!moreExpanded ? (
        <button onClick={() => setMoreExpanded(true)} className="block mx-auto my-4 mb-8">
          See All Stats
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto">
            <path
              fill-rule="evenodd"
              d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      ) : (
        <div className="mb-8 my-4">
          <table className=" border-collapse border-black border">
            <tbody className="">{dataTableFromBullData}</tbody>
          </table>
          <button onClick={() => setMoreExpanded(false)} className="block mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-auto">
              <path
                fill-rule="evenodd"
                d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
            Hide
          </button>
        </div>
      )}
    </div>
  );
}
