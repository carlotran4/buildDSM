import { useLocation, Link } from "react-router-dom";

export default function BullList() {
  const listOfBulls = useLocation().state;
  console.log(listOfBulls);

  return (
    <div>
      <h1 className="text-4xl text-center">Matching Bulls</h1>
      {listOfBulls.map((bull) => {
        return <Card bullData={bull} />;
      })}
    </div>
  );
}

function Card({ bullData }) {
  return (
    <div className="w-[calc(33.33%-2rem)] m-4 bg-green-800/50 p-4 inline-block">
      <h1 className="bg-black rounded-lg text-neutral-200 mx-8 mb-4 text-center text-2xl">{bullData.bull_name}</h1>
      <div className="grid grid-cols-2">
        <img src={`bullPictures/` + bullData.type_of_bull + ".jpg"} alt="bull" className="col-span-1" />
        <div className="ml-4">
          <Link to="/bullinfo" state={bullData}>
            <button className="bg-[#82c560] border-2 border-black rounded-xl shadow-md text-xl px-4 py-1">SEE LISTING</button>
          </Link>
          <p className="mt-4">{bullData.age_at_collection} Years Old</p>
          <p>{bullData.type_of_bull}</p>
          <p>{bullData.price_of_semen}$/vial</p>
        </div>
      </div>
    </div>
  );
}
