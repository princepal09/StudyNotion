import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

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

  const setVideoSpecificDetails = async () => {
    if (!courseSectionData.length) return;

    if (!courseId && !sectionId && !subSectionId) {
      navigate("/dashboard/enrolled-courses");
    } else {
      // let's assume k all 3 fields are present
      const filteredData = courseSectionData.filter(
        (course) => course._id === sectionId,
      );

      const filteredVideoData = filteredData?.[0].subSection.filter(
        (data) => data._id === subSectionId,
      );

      setVideoData(filteredVideoData[0]);
      setVideoEnded(false);
    }
  };
  useEffect(() => {
    setVideoSpecificDetails();
  }, []);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);
  };

  if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
    return true;
  } else {
    return false;
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId,
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

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
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSubSectionIndex].subSection[
          currentSectionIndex + 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section${nextSubSectionId}`,
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section}/${nextSubSectionId}`,
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
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      // same section previous video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ];
      // is video pe chle jaao
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section}/${prevSubSectionId}`,
      );
    }else{
      // different section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length;
       const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength  - 1]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section}/${prevSubSectionId}`,
      );

    }
  };

  const handleLectureCompletion = () => { 
    // dummy code baad m we will replace it within the actual code

  };

  return <div>
    {/* {
      !videoData ? (
        <p>No Data Found</p>
      ) : (
            //  <ReactPlayer ref={playerRef} aspec >

             </ReactPlayer>
      )
    } */}
  </div>;
};

export default VideoDetails;
