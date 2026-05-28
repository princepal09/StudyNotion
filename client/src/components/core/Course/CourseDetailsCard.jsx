import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast'
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../redux/slices/cartSlice";
const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { thumbnail: thubmnailImage, price: currentPrice } = course;

  const handleAddToCart = () => {
    if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are an instructor, you can't buy a cours")
        return;
    }

    if(token){
        dispatch(addToCart(course));
        return
    }

    setConfirmationModal({
        text1: "You are not logged in ",
        text2 : "Please login to continue",
        btn1Text : "Login",
        btn2Text : "Cancel",
        btn1Handler : () => navigate("/login"),
        btn2Handler :  () => setConfirmationModal(null) 
    })
  };

  const handleShare =() => {
    copy(window.location.href)
      toast.success("Link Copied to Clipboard")
  }
  return (
    <div>
      <img
        alt="Thumbnail Image"
        className="max-h-[300px] min-h-[180px] w-[400px] rounded-xl"
        src={thubmnailImage}
      />

      <div>Rs. {currentPrice}</div>

      <div>
        <button
          onClick={
            user && course?.studentsEnrolled.includes(user?._id)
              ? () => navigate("/dashboard/enrolled-courses")
              : handleBuyCourse
          }
        >
          {user && course?.studentsEnrolled.includes(user?._id)
            ? "Go to Course"
            : "Buy Now"}
        </button>

        {!course.studentsEnrolled.includes(user?._id) && (
          <button onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>

      <div>
        <p>30 Day Money-Back Gurantee</p>
        <p>This Course Includes :</p>

        <div>
          {course?.instructions?.map((item, idx) => (
            <p key={idx}>
              <span>{item}</span>
            </p>
          ))}
        </div>
      </div>

      <div>
        <button onClick={handleShare}>
            Share
        </button>
      </div>

    </div>
  );
};

export default CourseDetailsCard;
