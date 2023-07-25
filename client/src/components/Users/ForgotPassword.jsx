import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch,useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { forgotpassword } from "../../features/User/UserSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "16px",
};


const ForgotPassword = () => {
  const dispatch = useDispatch()
  const message = useSelector((state)=>state.userSlice.message)
  const [open, setOpen] = useState(false);
  const [Email, setEmail] = useState("");
 
  const [text, setText] = useState("")

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleUpdatePassword =()=>{
    dispatch(forgotpassword({Email}))
   
    console.log("btn clicked");
    
  }

  useEffect(() => {
    setText(message);
  }, [message])
  
  return (
    <div>
      <button onClick={handleOpen}>forgot Password</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label
            htmlFor="Email"
            className="text-base font-medium text-gray-900"
          >
            {" "}
           Enter your Email
          </label>
          <input
            autocomplete="off"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            name="Email"
            id=""
            value={Email}
          />
       
          <p>{text}</p>
          <div className="flex justify-center items-center">
            <button
              className="text-bold text-center rounded-xl text-white p-3 border-2 bg-blue-500 mt-3"
              type="submit" onClick={handleUpdatePassword}
            >
              submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ForgotPassword;
