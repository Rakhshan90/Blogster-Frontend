import { PlusCircleIcon, BookOpenIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createCategoryAction } from "../../redux/slices/category/categorySlice";

//form schema 
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
})

const AddNewCategory = () => {
  //dispatch
  const dispatch = useDispatch();
  //formik
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      //dispatch action
      dispatch(createCategoryAction(values));
      // console.log(values);
    },
    validationSchema: formSchema,
  })
  //select states from store
  const state = useSelector(state=>state?.category)
  const {category, loading, appErr, serverErr, isCreate} = state;

  //navigate
  const navigate = useNavigate();
  if(isCreate){
    navigate('/category-list');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <BookOpenIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
            Add New Category
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            <p className="font-medium text-indigo-600 hover:text-indigo-500">
              These are the categories user will select when creating a post
            </p>
            {/* display error message */}
            {appErr || serverErr ? (
              <div className="text-red-500">
                {serverErr} {appErr}
              </div>
            ) : null}
          </p>
        </div>
        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              {/* Title */}
              <input
                value={formik.values.title}
                onChange={formik.handleChange('title')}
                onBlur={formik.handleBlur('title')}
                type="text"
                autoComplete="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-black focus:border-black text-center focus:z-10 sm:text-sm"
                placeholder="New Category"
              />
              <div className="text-red-500 mb-2">
                {formik.touched.title && formik.errors.title}
              </div>
            </div>
          </div>

          <div>
            <div>
              {/* Submit */}
              {loading ? (<button
                disabled
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlusCircleIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
                Loading, please wait...
              </button>) : (<button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <PlusCircleIcon
                    className="h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                </span>
                Add new Category
              </button>)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategory;
