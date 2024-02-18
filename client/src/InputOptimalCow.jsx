import { useState } from "react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";

export default function InputOptimalCow() {
  var inputs = [
    "backfat_thickness",
    "ribeye_area",
    "marbling_score",
    "dressing_percentage",
    "subcutaneous_fat",
    "visceral_fat",
    "lean_meat_yield",
    "residual_average_daily_gain",
    "dry_matter_intake",
    "yearling_weight",
    "working_weight",
    "birth_weight",
    "calving_ease_direct",
    "yearling_height",
    "type_of_bull",
    "age_at_collection",
    "mature_height",
    "mature_weight",
    "price_of_semen",
  ];

  const goToBullList = useRef(null);

  const [data, setData] = useState({
    type_of_bull: null,
    backfat_thickness: null,
    ribeye_area: null,
    marbling_score: null,
    dressing_percentage: null,
    subcutaneous_fat: null,
    visceral_fat: null,
    lean_meat_yield: null,
    residual_average_daily_gain: null,
    dry_matter_intake: null,
    yearling_weight: null,
    working_weight: null,
    birth_weight: null,
    calving_ease_direct: null,
    yearling_height: null,
    age_at_collection: null,
    mature_height: null,
    mature_weight: null,
    price_of_semen: null,
  });

  const [bullList, setBullList] = useState();

  const updateData = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    fetch("/api/optimalCowData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setBullList(data);
      });
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // it's no longer the first render
      return; // exit the effect without running the code below
    }

    goToBullList.current.click();
  }, [bullList]);

  return (
    <>
      <Link to="/bull-list" state={bullList} className="none" ref={goToBullList} />
      <h1 className="text-4xl text-center my-4">I'm Looking For...</h1>
      <form class="w-full px-3 py-3" onSubmit={submit}>
        <div className="inline-block mx-4 w-52">
          <label htmlFor="type_of_bull" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Breed
          </label>
          <select
            type="text"
            id="type_of_bull"
            name="type_of_bull"
            onChange={updateData}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="Select Breed">Select Breed</option>
            <option value="Angus">Angus</option>
            <option value="Hereford">Hereford</option>
            <option value="Simmental">Simmental</option>
            <option value="Charolais">Charolais</option>
            <option value="Limousin">Limousin</option>
            <option value="Gelbvieh">Gelbvieh</option>
            <option value="Brahman">Brahman</option>
            <option value="Brangus">Brangus</option>
            <option value="Beefmaster">Beefmaster</option>
            <option value="Santa Gertrudis">Santa Gertrudis</option>
          </select>
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="calving_ease_direct" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Calving Ease Direct (EPD)
          </label>
          <input
            type="text"
            id="calving_ease_direct"
            name="calving_ease_direct"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="price_of_semen" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Price of Semen ($/vial)
          </label>
          <input
            type="text"
            id="price_of_semen"
            name="price_of_semen"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="backfat_thickness" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Backfat Thickness (in.)
          </label>
          <input
            type="text"
            id="backfat_thickness"
            name="backfat_thickness"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="ribeye_area" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Ribeye Area (sq. in.)
          </label>
          <input
            type="text"
            id="ribeye_area"
            name="ribeye_area"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="marbling_score" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Marbling Score (BMS)
          </label>
          <input
            type="text"
            id="marbling_score"
            name="marbling_score"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="dressing_percentage" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Dressing Percentage
          </label>
          <input
            type="text"
            id="dressing_percentage"
            name="dressing_percentage"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="subcutaneous_fat" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Subcutaneous Fat (in.)
          </label>
          <input
            type="text"
            id="subcutaneous_fat"
            name="subcutaneous_fat"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="visceral_fat" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Visceral Fat (% body wt.)
          </label>
          <input
            type="text"
            id="visceral_fat"
            name="visceral_fat"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="lean_meat_yield" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Lean Meat Yield (% carcass wt.)
          </label>
          <input
            type="text"
            id="lean_meat_yield"
            name="lean_meat_yield"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="residual_average_daily_gain" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Residual Average Gain (lbs/day)
          </label>
          <input
            type="text"
            id="residual_average_daily_gain"
            name="residual_average_daily_gain"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="dry_matter_intake" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Dry Matter Intake (lbs/day)
          </label>
          <input
            type="text"
            id="dry_matter_intake"
            name="dry_matter_intake"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="yearling_weight" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Yearling Weight (lbs)
          </label>
          <input
            type="text"
            id="yearling_weight"
            name="yearling_weight"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="working_weight" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Working Weight (lbs)
          </label>
          <input
            type="text"
            id="working_weight"
            name="working_weight"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="birth_weight" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Birth Weight (lbs)
          </label>
          <input
            type="text"
            id="birth_weight"
            name="birth_weight"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="yearling_height" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Yearling Height (in.)
          </label>
          <input
            type="text"
            id="yearling_height"
            name="yearling_height"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="age_at_collection" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Age at Collection (yrs.)
          </label>
          <input
            type="text"
            id="age_at_collection"
            name="age_at_collection"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="mature_height" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Mature Height (in.)
          </label>
          <input
            type="text"
            id="mature_height"
            name="mature_height"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="inline-block mx-4 my-2">
          <label htmlFor="mature_weight" className="w-max block text-gray-700 text-sm font-bold mb-2">
            Mature Weight (lbs)
          </label>
          <input
            type="text"
            id="mature_weight"
            name="mature_weight"
            onChange={updateData}
            className="shadow appearance-none border rounded w-max py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button type="submit" className="bg-[#82c560] border-2 border-black rounded-xl shadow-md text-2xl px-4 py-2 mt-4 block mx-auto">
          Find Closest Match
        </button>
      </form>
    </>
  );
}
