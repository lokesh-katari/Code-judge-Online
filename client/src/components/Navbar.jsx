import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";

import Avatar from "@mui/material/Avatar";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -4,
    top: 4,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 3px",
  },
}));
export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchText, setsearchText] = useState("");

  const isLoggedIn = useSelector((state) => state.userSlice.loggedIn);
  const url = useSelector((state) => state.userSlice.profileUrl);
  const name = useSelector((state) => state.userSlice.name);

  console.log(name);
  // useEffect(() => {
  //  dispatch(UserDetails())
  // }, [])

  console.log(`this is from navbar${isLoggedIn}`);

  // const submitSearch = (event) => {
  //   event.preventDefault();
  //   // The serialize function here would be responsible for
  //   // creating an object of { key: value } pairs from the
  //   // fields in the form that make up the query.

  //   dispatch(setSearchText(searchText));
  //   setsearchText("");
  //   navigate("/products/search");
  // };

  const handleSearch = (e) => {
    setsearchText(e.target.value.trim());
  };
  return (
    <div className=" fixed top-0 w-full overflow-hidden z-50 bg-gray-900 opacity-90">
      <nav className="  px-8 py-4 flex justify-between items-center border-y border-gray-400">
        <Link
          to="/"
          className="text-3xl font-bold leading-none flex items-center space-x-4"
        >
          <span>
            <i
              className="fa-solid fa-cart-shopping fa "
              style={{ color: "#c5cedd" }}
            >
              {" "}
              E - Shoppy
            </i>
          </span>
        </Link>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-gray-100">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:items-center lg:justify-end grow mr-4">
          <li>
            <Link
              className="text-gray-100 dark:text-gray-100 hover:text-gray-500 px-4 py-2"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-100 dark:text-gray-100 hover:text-gray-500 px-4 py-2"
              to="/problems"
            >
              Problems
            </Link>
          </li>
          <li>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-900"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <form action="">
                <input
                  type="text"
                  className="py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  disabled={searchText.trim() === "" ? true : false}
                >
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 text-gray-900"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </li>
          {isLoggedIn ? (
            <>
              <Link to={"/profile"}>
                <div className="ml-4">
                  <Avatar alt={name} src={url} />
                </div>
              </Link>
              {/* <li className="mr-2">
                <div className="mx-2">
                  <Link
                    onClick={Logout}
                    to={"/logout"}
                    className="py-2 px-2  text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
                  >
                    log out
                  </Link>
                </div> 
              </li> */}
              {/* <div className="ml-2">
                <IconButton aria-label="cart">
                  <Link to={'/orders/cart'}>
                  <StyledBadge badgeContent={5} color="success">
                    <ShoppingCartIcon sx={{ color: "white"}} size="large" />
                  </StyledBadge>
                  </Link>
                </IconButton>
              </div> */}
            </>
          ) : (
            <>
              <li className="mr-2">
                <div className="mx-2">
                  <Link
                    to={"/login"}
                    className="py-2 px-2  text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
                  >
                    login
                  </Link>
                </div>
              </li>
              <li>
                <div className="mx-2">
                  <Link
                    to={"/register"}
                    className="py-2 px-2 text-sm text-gray-900 bg-gray-100 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
                  >
                    register
                  </Link>
                </div>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
