import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import ReactStars from "react-stars";

import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";

const ReviewSlider = () => {
  const [review, setReview] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAIL_API,
      );

      console.log("Logging response in object", response);

      const { data } = response;
      if (data?.success) {
        setReview(data?.data);
      }
    };

    fetchAllReviews();
  }, []);

  console.log("Printing reviews", review);

  if (!review.length) {
    return <p className="text-center m-10">No Reviews found</p>;
  }

  return (
    <div className="text-white">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {review.map((review, i) => (
            <SwiperSlide key={i}>
              <div className="h-full rounded-lg bg-richblack-800 p-4 text-[14px] text-richblack-25">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review.user.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />

                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5">
                      {review?.user?.firstName} {review?.user?.lastName}
                    </h1>

                    <h2 className="text-xs font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>

                <p className="mt-3 font-medium text-richblack-25">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")}...`
                    : review?.review}
                </p>

                <div className="mt-3 flex items-center gap-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review?.rating?.toFixed(1)}
                  </h3>

                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSlider;
