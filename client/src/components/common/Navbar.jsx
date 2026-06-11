import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { fetchCourseCategories } from "../../services/operations/courseDetailApi";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [showCatalog, setShowCatalog] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(NavbarLinks);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetchCourseCategories();
        console.log(res);

        setSubLinks(res);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    })();
  }, []);

  // console.log("sub links", subLinks)

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex lg:h-14 h-22  items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img
            loading="lazy"
            src={logo}
            alt="Logo"
            width={160}
            height={32}
          />
        </Link>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Navigation */}
        <nav
          className={`fixed top-0 left-0 z-50 h-screen w-[260px]
    bg-richblack-900 p-6 shadow-lg
    transition-transform duration-300 ease-in-out
    md:static md:h-auto md:w-auto md:bg-transparent md:p-0 md:shadow-none
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          {/* Close Button */}
          <div className="mb-8 flex justify-end md:hidden">
            <button onClick={() => setIsMenuOpen(false)}>
              <RxCross2 size={24} className="text-richblack-25" />
            </button>
          </div>

          <ul className="flex flex-col gap-y-6 text-richblack-25 md:flex-row md:gap-x-6">
            {NavbarLinks?.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    onClick={() => setShowCatalog((prev) => !prev)}
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>

                    <BsChevronDown />

                    <div
                      className={`
    ${showCatalog ? "flex opacity-100" : "hidden opacity-0"}

    md:invisible md:absolute md:flex
    md:left-0 md:top-full
    md:opacity-0
    md:group-hover:visible
    md:group-hover:opacity-100

    mt-4 flex-col w-[220px] lg:w-[300px]
    rounded-lg bg-richblack-5 p-4 text-richblack-900
    transition-all duration-150
  `}
                    >
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks.length ? (
                        subLinks
                          ?.filter((subLink) => subLink?.course?.length > 0)
                          ?.map((subLink, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${subLink?.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()}`}
                              className="rounded-lg py-4 pl-4 hover:bg-richblack-50"
                              onClick={() => {
                                setShowCatalog(false);
                                setIsMenuOpen(false);
                              }}
                            >
                              <p>{subLink.name}</p>
                            </Link>
                          ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path} onClick={() => setIsMenuOpen(false)}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="mt-8 flex flex-col gap-4 md:hidden">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link
                to="/dashboard/cart"
                className="relative"
                onClick={() => setIsMenuOpen(false)}
              >
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

                {totalItems > 0 && (
                  <span
                    className="absolute -bottom-2 left-5 grid h-5 w-5
                place-items-center rounded-full bg-richblack-600
                text-xs font-bold text-yellow-100"
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {token === null && (
              <>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button
                    className="w-full rounded-[8px] border
              border-richblack-700 bg-richblack-800
              px-4 py-2 text-richblack-100"
                  >
                    Log in
                  </button>
                </Link>

                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                  <button
                    className="w-full rounded-[8px] border
              border-richblack-700 bg-richblack-800
              px-4 py-2 text-richblack-100"
                  >
                    Sign up
                  </button>
                </Link>
              </>
            )}

            {token !== null && (
              <div onClick={() => setIsMenuOpen(false)}>
                <ProfileDropdown />
              </div>
            )}
          </div>
        </nav>

        {/* Desktop Auth Section */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />

              {totalItems > 0 && (
                <span
                  className="absolute -bottom-2 -right-2 grid h-5 w-5
              place-items-center rounded-full bg-richblack-600
              text-xs font-bold text-yellow-100"
                >
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <>
              <Link to="/login">
                <button
                  className="rounded-[8px] border border-richblack-700
            bg-richblack-800 px-3 py-2 text-richblack-100"
                >
                  Log in
                </button>
              </Link>

              <Link to="/signup">
                <button
                  className="rounded-[8px] border border-richblack-700
            bg-richblack-800 px-3 py-2 text-richblack-100"
                >
                  Sign up
                </button>
              </Link>
            </>
          )}

          {token !== null && <ProfileDropdown />}
        </div>

        {/* Hamburger Menu */}
        <button onClick={() => setIsMenuOpen(true)} className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
