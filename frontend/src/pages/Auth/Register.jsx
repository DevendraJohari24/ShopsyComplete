import { Link, useNavigate } from 'react-router-dom';

import { Form, Formik } from 'formik';

import Button from '../../components/UI/Button';
import { RegisterSchema } from '../../components/Form/ValidationSchema';
import { FormikControl } from '../../components/Form';
import { consent } from '../../utils/constants';
import { toastMessage } from '../../utils/toastMessage';
import { useEffect, useState } from 'react';
import Loader from '../../components/UI/Loader';
import { useRegisterMutation } from '../../store/auth/authApiSlice';

export default function Register() {
    const [registerUser, registerUserResponse] = useRegisterMutation();
    const [error, setError] = useState(null);
	const navigate = useNavigate();
	const initialValues = {
		firstname: '',
		lastname: '',
		email: '',
        phone: '',
        description: '',
        avatar: undefined,
		password: '',
		passwordConfirm: '',
		consent: [],
	};
	const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const {avatar, description, email, phone, firstname, lastname, password} = values;
        const userData = new FormData();
        userData.set("email", email);
        userData.set("password", password);
        userData.set("phone", phone);
        userData.set("description", description);
        userData.set("firstname", firstname);
        userData.set("lastname", lastname);
        userData.set("avatar", avatar);
        registerUser(userData);        
        setSubmitting(false);
	};

    useEffect(() => {
        if(registerUserResponse.isSuccess && !registerUserResponse.isError){
            toastMessage("User Created Successfully!!");
            navigate("/login");
        }

        if(registerUserResponse.isError){
            setError(registerUserResponse.error.data.message);
            toastMessage(registerUserResponse.error.data.message);
        }
    }, [registerUserResponse, navigate])

	const handleClick = () => navigate('/login');
	
    return (
		<div className="container my-28">
			<div className="flex items-center justify-center">
				<div className="">
					<div className="text-center">
						<h2 className="lg:text-[42px]  md:text-3xl text-2xl font-bold lg:leading-[3.5rem]">
							Register <br />
							Your Account
						</h2>
						<p className="mt-3 max-md:text-sm">
							Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. <br />
							Sit aliquid, Non distinctio vel iste.
						</p>
					</div>
				</div>
			</div>
			<div className="flex items-center justify-center my-10 mt-24">
				<div className="lg:w-[40%] md:w-8/12">
					<Formik
						initialValues={initialValues}
						validationSchema={RegisterSchema}
						onSubmit={handleSubmit}
					>
                        
						{({setFieldValue,isSubmitting}) => (
                            <Form>
                                {isSubmitting && <Loader type="section" />}
                                {error && (
									<label className="text-red-500 px-4 py-2 rounded mb-4 block">
										{error}
									</label>
								)}
							<FormikControl
								control="input"
								name="firstname"
								placeholder="First Name"
								className="mb-5"
							/>
							<FormikControl
								control="input"
								name="lastname"
								placeholder="Last Name"
								className="mb-5"
							/>
							<FormikControl
								control="input"
								name="email"
								placeholder="Email*"
								className="mb-5"
							/>
                            <FormikControl
								control="input"
                                type="tel"
								name="phone"
								placeholder="Phone No*"
								className="mb-5"
							/>
                            <FormikControl
								control="file"
                                type="file"
								name="avatar"
								placeholder="Profile Image"
								className="mb-5"
                                onChange={(event) => {
                                    setFieldValue("avatar", event.target.files[0])
                                }}
							/>
							<FormikControl
								control="input"
								type="password"
								name="password"
								placeholder="Password*"
								className="mb-5"
							/>
							<FormikControl
								control="input"
								type="password"
								name="passwordConfirm"
								placeholder="Confirm Password*"
                                className="mb-5"
							/>
                            <FormikControl
								control="textarea"
								name="description"
								placeholder="Summary"
								className="mb-5"
							/>
                            
							<FormikControl
								control="checkbox"
								name="consent"
								options={consent}
								className="mt-5"
							/>
							<div className="mt-7">
								<Button
									className="my-6 w-full max-md:h-[47px] max-md:text-sm"
									type="submit"
									btn="card"
								>
									CREATE ACCOUNT
								</Button>
							</div>
						</Form>
                        )}
					</Formik>
					<div className="flex flex-col items-center mt-7">
						<p className="mb-6 text-sm">
							By creating an account, you agree to our:
						</p>
						<p className="text-lg">
							<Link to="#">
								TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp;
								&nbsp; PRIVACY POLICY
							</Link>
						</p>
						<div className="mt-12 underline">
							<Button
								className="hover:text-greenBtn text-lg"
								onClick={handleClick}
							>
								ALREADY HAVE AN ACCOUNT ?
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
