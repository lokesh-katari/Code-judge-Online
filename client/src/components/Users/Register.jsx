import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../features/User/UserSlice";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../AlertComponent";
import { resetShowAlert } from "../../features/User/UserSlice";

// import avatar from "../../components/avatar.png";
const formData = require("form-data");

export function Register() {
  const isRegistered = useSelector((state) => state.userSlice.isRegistered);
  const showAlert = useSelector((state) => state.userSlice.showAlert);
  const loading = useSelector((state) => state.userSlice.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [Email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setpassword] = useState("");
  const [Avatar, setAvatar] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const myForm = new formData();

    myForm.append("name", name);
    myForm.append("Email", Email);
    myForm.append("phone", phone);
    myForm.append("password", password);
    // myForm.append("avatar", Avatar);
    dispatch(userRegister({ name, Email, phone, password }));

    dispatch(resetShowAlert(false));
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
    }
  }, [dispatch, isRegistered, navigate]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
    } else {
      console.error("No file selected");
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
              width: "100vh",
              margin: "auto",
            }}
          >
            <CircularProgress />
          </Box>
        </>
      ) : (
        <>
          <section>
            {/* <Alert severity="warning">
     <AlertTitle>Warning</AlertTitle>
     This is a warning alert — <strong>check it out!</strong>
   </Alert> */}

            <AlertComponent alert={showAlert} />

            <div className="flex items-center justify-center px-4 py-16 h-screen sm:px-6 sm:py-16 lg:px-8 lg:py-24">
              <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                <div className="mb-2 flex justify-center">logo here</div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                  Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    title=""
                    className="font-medium text-black transition-all duration-200 hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
                <form action="#" method="POST" className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Full Name{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="Full Name"
                          id="name"
                          value={name}
                          required
                          name="name"
                          onChange={(e) => setname(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Email address{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="email"
                          placeholder="Email"
                          id="Email"
                          value={Email}
                          name="Email"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Phone{" "}
                      </label>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="text"
                          placeholder="phone number"
                          id="phone"
                          value={phone}
                          required
                          name="phone"
                          onChange={(e) => setPhone(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="text-base font-medium text-gray-900"
                        >
                          {" "}
                          Password{" "}
                        </label>
                      </div>
                      <div className="mt-2">
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="password"
                          placeholder="Password"
                          id="password"
                          value={password}
                          required
                          name="password"
                          onChange={(e) => setpassword(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="text-base font-medium text-gray-900"
                      >
                        {" "}
                        Avatar{" "}
                      </label>
                      <div className="mt-2">
                        <div className="">
                          {/* <img className='w-18 h-18 rounded-xl' src={Avatar} width="150px" height="150px"  alt='' /> */}
                        </div>
                        <input
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                          type="file"
                          accept="image/*"
                          name="avatar"
                          onChange={handleFileChange}
                        ></input>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={handleSubmit}
                        type="button"
                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                      >
                        Create Account <ArrowRight className="ml-2" size={16} />
                      </button>
                    </div>
                  </div>
                </form>
                <div className="mt-3 space-y-3">
                  <button
                    type="button"
                    className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                  >
                    <span className="mr-2 inline-block">
                      <svg
                        className="h-6 w-6 text-rose-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                      </svg>
                    </span>
                    Sign up with Google
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Register;
