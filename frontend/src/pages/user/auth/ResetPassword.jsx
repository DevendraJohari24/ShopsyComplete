import { useForm } from "react-hook-form";
import { MdLockOutline } from "react-icons/md"
import { logoutUser, resetPassword } from "../../../redux/api/authApi";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unsetUser } from "../../../redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";


function ResetPassword() {
    const {token} = useSelector(state => state.auth); 
    const {resetToken} = useParams();
    const [resetPass, resetPassResponse] = resetPassword();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
          newPassword: "",
          confirmPassword: ""
        }
      });
    const {register, handleSubmit, formState, watch} = form;
    const {errors} = formState;

    const handleSubmitButton = (data) => {
        const userData = new FormData();
        userData.set("newPassword", data.newPassword);
        userData.set("confirmPassword", data.confirmPassword);
        resetPass({resetToken, userData});
    }

    useEffect(() => {
        if(resetPassResponse.isSuccess){
            navigate("/auth");
        }
    }, [resetPassResponse, navigate]);

    useEffect(() => {
        if(token){
            navigate("/");
        }
    }, [navigate, token]);

    return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <main className="flex flex-col items-center justify-center w-full flex-1 md:px-20 px-2 text-center">
       <div className="bg-white rounded-2xl shadow-2xl flex md:w-2/3 md:max-w-4xl max-w-full">
        <div className="md:w-3/5 p-5 ">
            <div className="text-left font-bold">
                <span className="text-green-500">Company</span>Name
            </div>
                <div className="py-10">
                    <h2 className="text-3xl font-bold text-green-500 mb-2">Reset your password</h2>
                    <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                    
                    <p className="text-gray-400 my-3">Set up a strong password</p>
                    <div className="flex flex-col items-center mb-3">
                        <div className={`bg-gray-100 w-64 p-2 flex items-center mb-3 ${errors.newPassword ? "border border-red-500": ""}`}>
                            <MdLockOutline className={`m-2 ${errors.newPassword ? "text-red-500": "text-gray-400"}`} />
                            <input 
                            type="password" 
                            name="newPassword"
                             placeholder="New Password"
                             {...register("newPassword", {
                                required: "New Password should not be empty."
                             })} 
                             className={`bg-gray-100 outline-none text-sm flex-1 ${errors.newPassword ? " placeholder:text-red-500" : ""}`} />
                        </div>
                        <div className={`bg-gray-100 w-64 p-2 flex items-center mb-3 ${errors.confirmPassword ? "border border-red-500": ""}`}>
                            <MdLockOutline className={`m-2 ${errors.confirmPassword ? "text-red-500": "text-gray-400"}`} />
                            <input 
                            type="password" 
                            name="confirmPassword"
                             placeholder="Confirm Password"
                             {...register("confirmPassword", {
                                required: "Confirm Password should not be empty.",
                                validate: {
                                    matchPassword: (value) => {
                                        if (watch("newPassword") !== value){
                                            return "Password do not match"
                                        }
                                    }
                                }
                             })} 
                             className={`bg-gray-100 outline-none text-sm flex-1 ${errors.confirmPassword ? " placeholder:text-red-500" : ""}`} />
                        </div>
                       
                        <button 
                        onClick={handleSubmit(handleSubmitButton)}
                        className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                            Submit
                        </button>
                    </div>
            </div>
        </div>
    
        <div className="md:w-2/5 hidden md:block bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Fill up personal information and start journey with us.</p>
            <button  
            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
                 Sign in
            </button>
        </div>
       </div>
    </main>
    </div>
    </>
  );
}

export default ResetPassword