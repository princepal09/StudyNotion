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

  console.log(courseSectionData);

  const setVideoSpecificDetails = async () => {
    if (!courseSectionData.length) return;

    if (!courseId && !sectionId && !subSectionId) {
      navigate("/dashboard/enrolled-courses");
    } else {
      console.log("courseSectionData", courseSectionData);
      // let's assume k all 3 fields are present
      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId,
      );
      console.log("filteredData", filteredData);

      const filteredVideoData = filteredData?.[0]?.subSection?.filter(
        (data) => data._id === subSectionId,
      );

      console.log("filteredVideoData", filteredVideoData);

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
          currentSectionIndex + 1
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
        ];
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
    <div className="text-white">
      {videoData.length === 0 || !videoData ? (
        <div>No Data Found</div>
      ) : (
        <div className="relative">
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
            height="500px"
            onEnded={() => setVideoEnded(true)}
          />

          {videoEnded && (
            <div>
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={handleLectureCompletion}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                />
              )}

              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    playerRef.current.currentTime = 0;
                    playerRef.current.play();
                    setVideoEnded(false);
                    // setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl"
              />

              <div>
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton"
                  >
                    Prev
                  </button>
                )}

                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <h1>{videoData?.title}</h1>
      <p>{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
