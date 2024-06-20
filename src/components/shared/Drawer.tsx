import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

const routes = [
  {
    url: "/",
    text: "Home",
    new: false,
  },
  {
    url: "/test",
    text: "Test Route",
    new: false,
  },
];

export default function Drawer(): React.JSX.Element {
  const location = useLocation();
  const { pathname } = location;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <nav className="drawer z-20 fixed top-0 w-screen bg-base-100 p-2">
      <input
        checked={isDrawerOpen}
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        readOnly
      />
      <div className="drawer-content w-full flex bg-base-100 items-center justify-between">
        <Link
          className="font-fancy pl-3 text-neutral-content hover:text-neutral-content/60 cursor-pointer transition-colors duration-200"
          to={"/"}
        >
          is it clean?
        </Link>
        <label
          htmlFor="my-drawer"
          className="bg-transparent border-0 flex items-center text-neutral-content justify-center w-14 h-14 rounded-full hover:text-neutral-content/60 hover:bg-transparent cursor-pointer transition-colors duration-200"
          onClick={() => setIsDrawerOpen(true)}
        >
          <RxHamburgerMenu size={22} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={() => setIsDrawerOpen(false)}
        ></label>
        <ul className="menu p-4 w-80 min-h-full text-base-content bg-base-200">
          {/* Sidebar content here */}
          {routes.map((route) => {
            return (
              <li key={route.url}>
                <Link
                  to={route.url}
                  className={`bg-transparent hover:bg-base-200 ${
                    pathname === route.url
                      ? "text-accent underline underline-offset-4"
                      : ""
                  }`}
                >
                  {route.text}
                  {route.new && (
                    <span className="badge badge-neutral text-xs bg-secondary text-secondary-content">
                      NEW
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
