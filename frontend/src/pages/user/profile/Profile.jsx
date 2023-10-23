import { AiOutlineAppstore } from "react-icons/ai"
import { FaFacebook, FaGoogle, FaInstagram, FaYoutube } from "react-icons/fa"
import { MdWorkOutline } from "react-icons/md"
import { getMineDetails } from "../../../redux/api/authApi"
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { FiMail, FiPhone } from "react-icons/fi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const {
        data:userData, 
        isLoading:isUserDataLoading,
        isSuccess:isUserDataSuccess
    } = getMineDetails();

    useEffect(() => {
        if(!token){
            navigate("/auth");
        }
    }, [token, navigate]);

    if(isUserDataLoading){
        return (
            <LoadingSpinner />
        );
    }
    return (
   <>
    {isUserDataSuccess && (
        <main className="text-indigo-600 text-2xl font-[500] max-w-7xl mx-auto border">
        <section className="px-[50px] pt-0">
            <div className="container pt-14">
                <div className="md:flex items-center justify-between sm:flex-col md:flex-row gap-3">
                    <div className="w-full md:basis-1/2">
                        <h5 
                        className=" font-[600] text-[16px]">
                            Hello Welcome
                        </h5>
                        <h1
                        className="text-headingColor font-[800] text-[1.8rem] sm:text-[40px] leading-[35px]
                        sm:leading-[46px] mt-5">
                        I'm {userData.user.name} <br />
                        {userData.user.summary}
                        </h1>
                        <div
                        className="flex items-center gap-6 mt-7"
                        >
                            <a href="">
                                <button className="bg-primaryColor text-white font-[500] flex items-center gap-2 hover:bg-smallTextColor ease-in duration-300 py-2 px-4 rounded-[8px]">
                                    <MdWorkOutline />
                                    Hire me
                                </button>
                            </a>
                            <a href="#" className="text-smallTextColor font-[600] text-[16px] border-b 
                            border-smallTextColor">
                                See portfolio
                            </a>
                            
                        </div>
                        <p 
                        className="flex gap-2 text-headingColor mt-14 font-[500] text-[15px] leading-7 sm:pl-14 sm:pr-10 items-center justify-center">
                            <span>
                                <AiOutlineAppstore />
                            </span>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <div className="flex items-center gap-9 mt-14 mb-3">
                                <span className="text-smallTextColor text-[15px] font-[600]">Follow me</span>
                                <span>
                                    <a href="#youtube" className="text-smallTextColor text-[18px] font-[600]">
                                        <FaYoutube />
                                    </a>
                                </span>
                                <span>
                                    <a href="#youtube" className="text-smallTextColor text-[18px] font-[600]">
                                        <FaFacebook />
                                    </a>
                                </span>
                                <span>
                                    <a href="#youtube" className="text-smallTextColor text-[18px] font-[600]">
                                        <FaInstagram />
                                    </a>
                                </span>
                                <span>
                                    <a href="#youtube" className="text-smallTextColor text-[18px] font-[600]">
                                        <FaGoogle />
                                    </a>
                                </span>
                            </div>
                    </div>
                    <div className="basis-1/3 mt-10 sm:mt-0">
                        <figure className="flex items-center justify-center">
                            <img src={userData?.user?.avatar?.url} alt="" className="w-[300px] h-[300px] rounded-full object-cover object-center"  />
                        </figure>
                    </div>
                    <div className="md:basis-1/5 flex items-center justify-center md:items-end  text-center mt-10 flex-wrap gap-3 md:mt-0 md:flex-col md:justify-end md:text-end">
                        <div className="mb-10 ">
                            <h2 className="text-headingColor font-[700] text-[32px] inline-block">
                                <FiPhone  />
                            </h2>
                            <h4 className="text-headingColor font-[600] text-[18px]">
                                {userData.user.phoneNo}
                            </h4>
                        </div>
                        <div className="mb-10 ">
                            <h2 className="text-headingColor font-[700] text-[32px] inline-block">
                                <FiMail />
                            </h2>
                            <h4 className="text-headingColor font-[600] text-[18px]">
                                {userData.user.email}
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
    )}
   </>
  )
}

export default Profile