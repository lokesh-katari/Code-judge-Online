import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { resetpassword } from "../../features/User/UserSlice";

export function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useParams();
  const message = useSelector((state)=>state.userSlice.message)
  const [password, setpassword] = useState("");
  const [confirmPassword, setCpassword] = useState("");
  const [text, settext] = useState(" ")
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetpassword({token,password,confirmPassword}));
    console.log("clicked");
    settext(message)
  };
  useEffect(() => {
 
  }, [dispatch, navigate]);

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 h-screen  sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">{/* logo here */}</div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
           Resetting password
          </h2>
        
          <form  className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                new password{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="password"
                    id="Email"
                    value={password}
                    name="password"
                    required
                    onChange={(e) => setpassword(e.target.value)}
                  ></input>
                </div>
              </div>
       <div className="mt-2">
       <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                confirm password{" "}
                </label>
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder=" confirm Password"
                    id="password"
                    value={confirmPassword}
                    name="Cpassword"
                    onChange={(e) => setCpassword(e.target.value)}
                    required
                  ></input>
                </div>
              </div>
              <div className="p-2">
                {text}
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started
                  <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
          </form>
            </div>
          </div>
    </section>
  );
}

export default ResetPassword;
