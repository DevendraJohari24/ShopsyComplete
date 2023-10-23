import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/UI/Button';
import * as cs from '../../utils/constants';
import { logOut, selectCurrentToken, selectCurrentUser } from '../../store/auth/authSlice';
import { getCurrentUser, getDocuments } from '../../services/api';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../store/auth/authApiSlice';
import { toastMessage } from '../../utils/toastMessage';

export default function UserProfile() {
  const [logout, { isLoading }] = useLazyLogoutQuery();
  const user = useLoaderData();
  const {firstname, lastname, description, email, phone, avatar} = user;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async(e) => {
    e.preventDefault();
    try{
        const response = await logout().unwrap();
        dispatch(logOut());
        toastMessage("User Logout Successfully!!");
        navigate("/login");
    }catch(err){
      console.log(err);
    }
  }
  return (
		<div className="container my-28">
			<div className="flex max-md:flex-col max-md:justify-center items-center gap-8">
				<img
					alt="avatar_default"
					src={avatar ? avatar.url : cs.user}
					className="h-36 w-36"
				/>
				<div className="max-md:basis-full">
					<div className="flex items-center mb-1 max-md:justify-center">
						<h3 className="md:text-2xl text-xl font-bold">
							User Name:
						</h3>
						<span className="ml-2 md:text-xl text-lg relative md:top-[2px]">
              {firstname + " " + lastname}
						</span>
					</div>
					<div className="flex items-center max-md:justify-center">
						<h3 className="md:text-2xl text-xl font-bold">
							Email: 
						</h3>
						<span className="ml-2 md:text-xl text-lg relative md:top-[2px]">
							{email}
						</span>
					</div>
				</div>
			</div>
			<Button
				className="btn-animated max-md:w-full mt-10"
				onClick={handleLogout}
			>
				<span className="btn-animated-text">Log out</span>
			</Button>
		</div>
	);
}



export const loader = async() => {
  
  const { user } = await getCurrentUser();
  if (!user) {
  throw new Response('', {
    status: 404,
    statusText: 'Not Found',
  });
}
return user;
}
