import { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline, MdWorkOutline } from "react-icons/md";
import { AiOutlineLock, AiOutlineUnlock, AiOutlineUser } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import { BiImage } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { signinUser, signupUser } from "../../../redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Auth() {
    const [isRegisterUser, setIsRegisterUser] = useState(false); // For interchanging signup and signin form
    const { token } = useSelector((state) => state.auth);
    const [signInUser, signInResponse] = signinUser();
    const [signUpUser, signUpResponse] = signupUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
          name: "",
          email: "",
          profileImage: "",
          phoneNo: "",
          summary: "",
          password: "",
          confirmPassword: ""
        }
      });
    const {register, handleSubmit, formState, watch} = form;
    const {errors} = formState;

    
    const handleUserRegistration = (data) => {
        const userData = new FormData();
        userData.set("name", data.name);
        userData.set("email", data.email);
        userData.set("password", data.password);
        userData.set("summary", data.summary);
        userData.set("phoneNo", data.phoneNo);
        
        if(data.profileImage.length > 0){
            userData.append("file", data.profileImage[0]);
        }
        signUpUser(userData);
    }

    const handleUserLogin = (data) => {
        const userData = new FormData();
        userData.set("email", data.email);
        userData.set("password", data.password);
        signInUser(userData);
    }

    useEffect(() => {
        if(signInResponse.isSuccess){
            dispatch(setUser({
                token: signInResponse.data.token
            }));
            localStorage.setItem('jwt_auth', JSON.stringify({
                token: signInResponse.data.token,
            }));
        }
    }, [signInResponse, dispatch]);

    useEffect(() => {
        if(signUpResponse.isSuccess){
            dispatch(setUser({
                token: signUpResponse.data.token
            }));
            localStorage.setItem('jwt_auth', JSON.stringify({
                token: signUpResponse.data.token,
            }));
        }
    }, [signUpResponse, dispatch]);

    useEffect(() => {
        if(token){
            navigate("/");
        }
    }, [token, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
        <main className="flex flex-col items-center justify-center w-full flex-1 md:px-20 px-2 text-center">
       <div className="bg-white rounded-2xl shadow-2xl flex md:w-2/3 md:max-w-4xl max-w-full">
        <div className="md:w-3/5 p-5 ">
            <div className="text-left font-bold">
                <span className="text-green-500">Company</span>Name
            </div>
            {
                isRegisterUser ? (
                    // Signup
                    <div className="py-10">
                    <h2 className="text-3xl font-bold text-green-500 mb-2">Create an account</h2>
                    <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                   <div className="flex flex-col items-center mb-3">
                        <div className={`bg-gray-100 w-96 p-2 flex items-center mb-3 ${errors.name ? "border border-red-500": ""}`}>
                            <AiOutlineUser className={`m-2 ${errors.name ? "text-red-500": "text-gray-400"}`} />
                            <input type="text" 
                            name="name" 
                            placeholder="Name" 
                            {...register("name", {
                                required: "Name should not be Empty"
                            })}
                            className={` bg-gray-100 outline-none text-sm flex-1 w-full ${errors.name ? "placeholder:text-red-500" : ''}`} />
                        </div>
                        <div className="flex gap-3 w-96">
                            <div className={`bg-gray-100 w-1/2 p-2 flex items-center mb-3 ${errors.email ? "border border-red-500": ""}`}>
                                <FaRegEnvelope className={`${errors.email ? "text-red-500" : "text-gray-400" } m-2`} />
                                <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                {...register("email", {
                                    required: "Email should not be Empty",
                                    pattern: {
                                        value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                        message: "Invalid email format"
                                    },
                                })}
                                className={` bg-gray-100 outline-none text-sm flex-1 w-full ${errors.email ? "placeholder:text-red-500": ""}`} />
                            </div>
                            <div className={`bg-gray-100 w-1/2 p-2 flex items-center mb-3 ${errors.phoneNo ? "border border-red-500": ""}`}>
                                <BsPhone className={`${errors.phoneNo ? "text-red-500":"text-gray-400"} m-2`} />
                                <input type="tel" 
                                name="phoneNo" 
                                placeholder="Phone No"
                                {...register("phoneNo", {
                                    required: "Phone No should not be Empty",
                                    validate: {
                                        checkLength: (value) => {
                                             if(value.length !== 10){
                                                    return  "Phone No should be of 10 digits."
                                             }
                                        }
                                    }
                                })} 
                                className={` bg-gray-100 outline-none text-sm flex-1 w-full ${errors.phoneNo ? "placeholder:text-red-500" : ""}`} />
                            </div>
                        </div>
                        <div className="flex gap-3 w-96">
                            <div className={`bg-gray-100 w-1/2 p-2 flex items-center mb-3 ${errors.password ? "border border-red-500": ""}`}>
                                <AiOutlineUnlock className={`${errors.password ? "text-red-500":"text-gray-400"} m-2`} />
                                <input 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                {...register("password", {
                                    required: "Password should not be empty",
                                    validate: {
                                        checkLength: (value) => {
                                            if(value.length > 8){
                                                return "Password should be less than 8 characters."
                                            }
                                        }
                                    }
                                })}
                                className={` bg-gray-100 outline-none text-sm flex-1 w-full ${errors.password ? "placeholder:text-red-500" : ""}`} />
                            </div>
                            <div className={`bg-gray-100 w-1/2 p-2 flex items-center mb-3 ${errors.confirmPassword ? "border border-red-500": ""}`}>
                                <AiOutlineLock className={`${errors.confirmPassword ? "text-red-500":"text-gray-400"} m-2`} />
                                <input 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password" 
                                {...register("confirmPassword", {
                                    validate: {
                                        matchPassword: (value) => {
                                            if (watch("password") !== value){
                                                return "Password do not match"
                                            }
                                        }
                                    }
                                })}
                                className={` bg-gray-100 outline-none text-sm flex-1 w-full ${errors.confirmPassword ? "placeholder:text-red-500" : ""}`} />
                            </div>
                        </div>
                        <div className={`bg-gray-100 w-96 p-2 flex items-center mb-3 ${errors.profileImage ? "border border-red-500": ""}`}>
                            <BiImage className={`${errors.profileImage ? "text-red-500":"text-gray-400"} m-2`} />
                            <input 
                            type="file" 
                            name="profileImage" 
                            placeholder="Profile Picture" 
                            {...register("profileImage", {
                                required: false,
                                validate: {
                                    checkSize: (value) => {  
                                            if(value.length === 0){
                                                return true;
                                            }
                                            const fileTypes = ["jpg", "png", "jpeg"];
                                            const fileType = value[0].name.split(".")[1];
                                            if(!fileTypes.includes(fileType)){
                                                return `Please upload a valid file format. (${fileTypes})`;
                                            }
                                    }
                                }
                            })}
                            className={` bg-gray-100 outline-none text-sm flex-1 w-full ${errors.profileImage ? "placeholder:text-red-500" : ""}`} />
                        </div>
                        <div className={`bg-gray-100 w-96 p-2 flex items-center mb-3 ${errors.summary ? "border border-red-500": ""}`}>
                            <MdWorkOutline className={`${errors.summary ? "text-red-500":"text-gray-400"} m-2`} />
                            <input 
                            type="text" 
                            name="summary" 
                            placeholder="Profession" 
                            {...register("summary", {
                                required: "Profession should not be empty"
                            })}
                            className={` bg-gray-100 outline-none text-sm flex-1 w-full ${errors.summary ? "placeholder:text-red-500" : ""}`} />
                        </div>
                        <button 
                        onClick={handleSubmit(handleUserRegistration)}
                         className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                            Sign Up
                        </button>
                    </div>
                    <div className="md:hidden inline-block cursor-pointer hover:text-blue-500" onClick={() => setIsRegisterUser(value => !value)}>
                        <p className="font-semibold">Already a user? Sign In</p>
                    </div>
            </div>
                ) : (
                    // Login 
                    <div className="py-10">
                    <h2 className="text-3xl font-bold text-green-500 mb-2">Sign in to Account</h2>
                    <div className="border-2 w-10 border-green-500 inline-block mb-2"></div>
                    {/* Social Login */}
                    <div className="flex justify-center my-2">
                        <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                            <FaFacebookF className="text-sm" />
                        </a>
                        <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                            <FaLinkedinIn className="text-sm" />
                        </a>
                        <a href="#" className="border-2 border-gray-200 rounded-full p-3 mx-1">
                            <FaGoogle className="text-sm" />
                        </a>
                    </div>
                    <p className="text-gray-400 my-3">or use your email account</p>
                    <div className="flex flex-col items-center mb-3">
                        <div className={`bg-gray-100 w-64 p-2 flex items-center mb-3 ${errors.email ? "border border-red-500": ""}`}>
                            <FaRegEnvelope className={`${errors.email ? "text-red-500": "text-gray-400"} m-2`} />
                            <input 
                            type="email" 
                            name="email" 
                            placeholder="Email" 
                            {...register("email", {
                                required: "Email should not be empty",
                                pattern: {
                                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                    message: "Invalid email format"
                                },
                            })}
                            className={`bg-gray-100 outline-none text-sm flex-1 ${errors.email ? "placeholder:text-red-500": ""}`} />
                        </div>
                        <div className={`bg-gray-100 w-64 p-2 flex items-center mb-3 ${errors.password ? "border border-red-500": ""}`}>
                            <MdLockOutline className={`m-2 ${errors.password ? "text-red-500": "text-gray-400"}`} />
                            <input 
                            type="password" 
                            name="password"
                             placeholder="Password"
                             {...register("password", {
                                required: "Password should not be empty."
                             })} 
                             className={`bg-gray-100 outline-none text-sm flex-1 ${errors.password ? " placeholder:text-red-500" : ""}`} />
                        </div>
                        <div className="flex w-64 mb-5 justify-between">
                            <label className="flex items-center text-xs">
                                <input 
                                type="checkbox" 
                                name="remember" 
                                className="mr-1" /> Remember me
                            </label>
                            <Link to={"/me/forgotPass"} className="text-xs">Forgot Password?</Link>
                        </div>
                        <button 
                        onClick={handleSubmit(handleUserLogin)}
                        className="border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white">
                            Sign In
                        </button>
                    </div>
                    <div className="md:hidden inline-block cursor-pointer hover:text-blue-500" onClick={() => setIsRegisterUser(value => !value)}>
                        <p className="font-semibold">New User? Create an account</p>
                    </div>
            </div>
                )
            }
        </div>
    
        <div className="md:w-2/5 hidden md:block bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Hello, Friend</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Fill up personal information and start journey with us.</p>
            <button onClick={() => setIsRegisterUser((value) => !value)} className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500">
                {isRegisterUser ? "Sign in" : "Sign Up"}
            </button>
        </div>
       </div>
    </main>
    </div>
  )
}
