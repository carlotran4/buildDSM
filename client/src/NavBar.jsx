import { Outlet, Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <nav className=" border-b shadow-xl bg-green-800/85">
        <img src="compassss.svg" alt="logo" className="px-4 py-2 w-1/6" />
      </nav>
      <Outlet />
    </>
  );
}
