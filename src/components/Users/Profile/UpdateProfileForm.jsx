import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { fetchUserDetails, profileUpdateAction } from "../../../redux/slices/users/usersSlices";
import { useLocation, useNavigate } from "react-router-dom";

//form schema 
const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required"),
  bio: Yup.string().required("Bio is required")
})

const UpdateProfileForm = () => {
  //dispatch
  const dispatch = useDispatch();

  //get user id from params
  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(()=>{
    dispatch(fetchUserDetails(id));
  }, [dispatch, id])

  //select user details from store
  const users = useSelector(state=>state.users);
  const {isUpdated, userDetails, loading, appErr, serverErr} = users;

  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userDetails?.firstName,
      lastName: userDetails?.lastName,
      email: userDetails?.email,
      bio: userDetails?.bio,
    },
    onSubmit: (values) => {
      //dispatch action
      dispatch(profileUpdateAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  })

  //navigate 
  const navigate = useNavigate();
  if(isUpdated){
    navigate(`/profile/${id}`)
  }
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h3 className="mt-6 text-center text-2xl font-extrabold text-black">
          Hey, dear <span className="text-center text-blue-500">{userDetails?.firstName} {userDetails?.lastName}</span> do you want to update your profile?
        </h3> 
    
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
          {appErr || serverErr ? <h1 className="text-center text-red-500"> {appErr} {serverErr} </h1> : null}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                First Name
              </label>
              <div className="mt-1">
                {/* First name */}
                <input
                  value={formik.values.firstName}
                  onChange={formik.handleChange('firstName')}
                  onBlur={formik.handleBlur('firstName')}
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              <div className="text-red-500">
                {formik.touched.firstName && formik.errors.firstName}
              </div>
            </div>
            <div>
              <label
                htmlFor="text"
                className="block text-sm font-medium text-black"
              >
                Last Name
              </label>
              <div className="mt-1">
                {/* Last Name */}
                <input
                  value={formik.values.lastName}
                  onChange={formik.handleChange('lastName')}
                  onBlur={formik.handleBlur('lastName')}
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.lastName && formik.errors.lastName}
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
              >
                Email
              </label>
              <div className="mt-1">
                {/* Email */}
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                />
              </div>
              {/* err msg */}
              <div className="text-red-500">
                {formik.touched.email && formik.errors.email}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Bio
              </label>
              <textarea
                value={formik.values.bio}
                onChange={formik.handleChange('bio')}
                onBlur={formik.handleBlur('bio')}
                rows="5"
                cols="10"
                className="rounded-lg appearance-none block w-full py-3 px-3 text-base text-center leading-tight text-black bg-transparent focus:bg-transparent  border border-gray-200 focus:border-black  focus:outline-none"
                type="text"
              ></textarea>
              {/* Err msg */}
              <div className="text-red-500">
                {formik.touched.bio && formik.errors.bio}
              </div>
            </div>
            <div>
              {/* submit btn */}
              {loading? (<button
                disabled
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600"
              >
                Loading, please wait...
              </button>) : (<button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                Update
              </button>)}
              
            </div>
          </form>

          <div className="mt-4 mb-3">
            <div className="relative">
              <div className="flex flex-col justify-center items-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
