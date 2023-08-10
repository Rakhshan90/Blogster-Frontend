import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction, fetchPostDetailsAction } from "../../redux/slices/posts/postSlices";
import LoadingComponent from "../../util/LoadingComponent";
import AddComment from "../Comments/AddComment";
import CommentsList from "../Comments/CommentsList";

const PostDetails = () => {
  //destructure id of post from params
  const location = useLocation();
  const id = location.pathname.split('/')[2];
   
  //select comment from store
  const comments = useSelector(state=>state.comments)
  const{comment} = comments;
  const{commentDeleted} = comments;
  //dispatch
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostDetailsAction(id));
  }, [id, dispatch, comment, commentDeleted]);

  //select post from posts store 
  const posts = useSelector(state => state.posts);
  const { postDetails, loading, appErr, serverErr, isDeleted } = posts;

  //checking login user and post owner is same or not
  const users = useSelector(state  => state.users);
  const {userAuth} = users;
  const isCreatedBy = userAuth?._id === postDetails?.user?._id;


  //navigate 
  const navigate = useNavigate();
  if(isDeleted){
    navigate('/posts');
  }
  return (
    <>
      {loading ? (<div className="h-screen">
        <LoadingComponent />
      </div>) : appErr || serverErr ? (<h1 className="h-screen text-red-400 text-xl">
        {serverErr} {appErr}
      </h1>) : (<section className="py-20 2xl:py-40 bg-gray-800 overflow-hidden">
        <div className="container px-4 mx-auto">
          {/* Post Image */}
          <img
            className="mb-24 w-full h-auto object-none"
            src={postDetails?.image}
            alt=""
          />
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="mt-7 mb-14 text-6xl 2xl:text-7xl text-white font-bold font-heading">
              {postDetails?.title}
            </h2>

            {/* User */}
            <div className="inline-flex pt-14 mb-14 items-center border-t border-gray-500">
              <img
                className="mr-8 w-20 lg:w-24 h-20 lg:h-24 rounded-full"
                src={postDetails?.user?.profilePhoto}
                alt=""
              />
              <div className="text-left">
                <h4 className="mb-1 text-2xl font-bold text-gray-50">
                  <span className="text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 to-orange-600">
                    {postDetails?.user?.firstName} {postDetails?.user?.lastName}
                  </span>
                </h4>
                <p className="text-gray-500">
                  {/* <DateFormatter date={postDetails?.createdAt}/> */}
                  {postDetails?.createdAt}
                </p>
              </div>
            </div>
            {/* Post description */}
            <div className="max-w-xl mx-auto">
              <p className="mb-6 text-left  text-xl text-gray-200">
                {postDetails?.description}
                {/* Show delete and update btn if it was created by user */}
                {isCreatedBy? (<p className="flex">
                  <Link className="p-3" to={`/update-post/${postDetails?._id}`}>
                    <PencilAltIcon className="h-8 mt-3 text-yellow-300" />
                  </Link>
                  <button onClick={()=>dispatch(deletePostAction(postDetails?._id))} className="ml-3">
                    <TrashIcon className="h-8 mt-3 text-red-600" />
                  </button>
                </p>) : null}
              </p>
            </div>
          </div>
        </div>
        {/* Add comment Form component here */}
        {userAuth ? (<AddComment postId={id} />) : null}

        <div className="flex justify-center  items-center">
          <CommentsList comments={postDetails?.comments} postId={postDetails?._id} />
        </div>
      </section>)}
    </>
  );
};

export default PostDetails;
