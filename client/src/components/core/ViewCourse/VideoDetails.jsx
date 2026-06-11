import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { updateCompletedLectures } from "../../../redux/slices/viewCourseSlice";
import { markLectureAsComplete } from "../../../services/operations/courseDetailApi";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(courseSectionData);

  const setVideoSpecificDetails = async () => {
    if (!courseSectionData.length) return;

    if (!courseId && !sectionId && !subSectionId) {
      navigate("/dashboard/enrolled-courses");
    } else {
      // console.log("courseSectionData", courseSectionData);
      // let's assume k all 3 fields are present
      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId,
      );
      // console.log("filteredData", filteredData);

      const filteredVideoData = filteredData?.[0]?.subSection?.filter(
        (data) => data._id === subSectionId,
      );

      // console.log("filteredVideoData", filteredVideoData);

      setVideoData(filteredVideoData[0]);
      setVideoEnded(false);
    }
  };
  useEffect(() => {
    setVideoSpecificDetails();
  }, [courseSectionData, sectionId, subSectionId]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      //same section ki next video me jao
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      //next video pr jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`,
      );
    } else {
      //different section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      ///iss voide par jao
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`,
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex != 0) {
      //same section , prev video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      //iss video par chalge jao
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`,
      );
    } else {
      //different section , last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      //iss video par chalge jao
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`,
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    //PENDING - > Course Progress PENDING
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token,
    );
    //state update
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 text-richblack-5">
      {!videoData ? (
        <div className="rounded-xl border border-richblack-700 bg-richblack-800 p-8 text-center">
          No Data Found
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-900 shadow-2xl">
            <div className="aspect-video w-full">
              <ReactPlayer
                ref={playerRef}
                src={videoData?.videoUrl}
                controls
                config={{
                  file: {
                    attributes: {
                      controlList: "nodownload",
                    },
                  },
                }}
                width="100%"
                height="100%"
                onEnded={() => setVideoEnded(true)}
              />
            </div>

            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.85), rgba(0,0,0,0.65), rgba(0,0,0,0.35))",
                }}
                className="absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-sm"
              >
                <div className="mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-richblack-900/70 p-6 md:p-8 shadow-2xl">
                  {" "}
                  <h2 className="mb-6 text-center text-xl md:text-2xl font-bold">
                    Video Completed
                  </h2>
                  <div className="flex flex-col gap-4">
                    {!completedLectures.includes(subSectionId) && (
                      <IconBtn
                        disabled={loading}
                        onclick={handleLectureCompletion}
                        text={!loading ? "Mark As Completed" : "Loading..."}
                        customClasses="w-full justify-center rounded-lg px-4 py-3 text-sm md:text-lg"
                      />
                    )}

                    <IconBtn
                      disabled={loading}
                      onclick={() => {
                        if (playerRef?.current) {
                          playerRef.current.currentTime = 0;
                          playerRef.current.play();
                          setVideoEnded(false);
                        }
                      }}
                      text=" Rewatch"
                      customClasses="w-full justify-center rounded-lg px-4 py-3 text-sm md:text-lg"
                    />
                  </div>
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    {!isFirstVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToPrevVideo}
                        className="w-full sm:w-auto rounded-lg border border-richblack-600 bg-richblack-800 px-6 py-3 font-medium transition-all duration-200 hover:bg-richblack-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        ← Previous
                      </button>
                    )}

                    {!isLastVideo() && (
                      <button
                        disabled={loading}
                        onClick={goToNextVideo}
                       className="w-full sm:w-auto rounded-lg bg-yellow-50 px-6 py-3 font-semibold text-richblack-900 transition-all duration-200 hover:scale-105 hover:bg-yellow-25 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-richblack-700 bg-richblack-800 p-6 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-richblack-5">
              {videoData?.title}
            </h1>

            <div className="mt-4 h-px bg-richblack-700" />

            <p className="pt-4 text-sm md:text-base leading-6 md:leading-7 text-richblack-200">
              {videoData?.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoDetails;
