import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { updatepassword } from "../../features/User/UserSlice";
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


const UpdatePassword = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPass] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [text, setText] = useState("")
  const [disabled, setDisabled] = useState(true)
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleUpdatePassword =()=>{
    dispatch(updatepassword({oldPassword,newPassword,confirmPassword}))
    console.log("btn clicked");
    
  }

  useEffect(() => {
    if(newPassword===confirmPassword){
        if(newPassword.length < 4){
            setText("")
        setDisabled(true)
        }
        else{
            setText("")
            setDisabled(false)
        }
    }
    else{
      setText("passwords does not matching")  
      setDisabled(true) 
     }
  }, [newPassword,confirmPassword])
  
  return (
    <div>
      <button onClick={handleOpen}>Change Password</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <label
            htmlFor="oldpasswordword"
            className="text-base font-medium text-gray-900"
          >
            {" "}
            old password
          </label>
          <input
            autocomplete="off"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            onChange={(e) => setoldPassword(e.target.value)}
            name="oldpasswordword"
            id=""
            value={oldPassword}
          />
          <label
            htmlFor="newpassword"
            className="text-base font-medium text-gray-900"
          >
            new password
          </label>
          <input
            autocomplete="off"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            onChange={(e) => setnewPass(e.target.value)}
            name="newpassword"
            id=""
            value={newPassword}
          />
          <label
            htmlFor="confirmpasswordword"
            className="text-base font-medium text-gray-900"
          >
            {" "}
            confirm new password
          </label>
          <input
            autocomplete="off"
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="ConfirmPasswordword"
            id=""
            value={confirmPassword}
          />
          <p>{text}</p>
          <div className="flex justify-center items-center">
            <button
              className="text-bold text-center rounded-xl text-white p-3 border-2 bg-blue-500 mt-3"
              type="submit" onClick={handleUpdatePassword} disabled={disabled}
            >
              submit
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdatePassword;
