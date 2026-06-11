import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { IoIosArrowBack } from "react-icons/io";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const location = useLocation();

  useEffect(() => {
    if (!courseSectionData.length) return;

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex =
      courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data) => data._id === subSectionId
      );

    const activeSubSectionId =
      courseSectionData[currentSectionIndex]?.subSection?.[
        currentSubSectionIndex
      ]?._id;

    setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
    setVideoBarActive(activeSubSectionId);
  }, [courseSectionData, location.pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed left-4 top-20 z-50 rounded-lg bg-richblack-700 p-2 text-white lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <HiOutlineMenu  size={24} />
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed left-0 top-14 z-50
          h-[calc(100vh-3.5rem)]
          w-[85%]
          max-w-[320px]
          bg-richblack-800
          border-r border-richblack-700
          transform transition-transform duration-300
          lg:static lg:translate-x-0 lg:w-[320px]
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 pt-4 lg:hidden">
          <h2 className="font-semibold text-white">
            Course Content
          </h2>

          <button onClick={() => setSidebarOpen(false)}>
            <IoClose color="white" size={28} />
          </button>
        </div>

        {/* Top */}
        <div className="mx-5 flex flex-col gap-4 border-b border-richblack-600 py-5 text-richblack-25">
          <div className="flex items-center justify-between">
            <div
              onClick={() =>
                navigate("/dashboard/enrolled-courses")
              }
              className="flex h-[35px] w-[35px] cursor-pointer items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
            >
              <IoIosArrowBack size={28} />
            </div>

            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>

          <div>
            <p className="line-clamp-2 text-lg font-bold">
              {courseEntireData?.courseName}
            </p>

            <p className="text-sm text-richblack-400">
              {completedLectures?.length} /{" "}
              {totalNoOfLectures} completed
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="h-[calc(100vh-220px)] overflow-y-auto">
          {courseSectionData.map((course) => (
            <div
              key={course._id}
              className="mt-2 text-richblack-5"
            >
              {/* Section */}
              <div
                className="flex cursor-pointer justify-between bg-richblack-600 px-5 py-4"
                onClick={() =>
                  setActiveStatus(
                    activeStatus === course._id
                      ? ""
                      : course._id
                  )
                }
              >
                <div className="w-[80%] break-words font-semibold">
                  {course.sectionName}
                </div>

                {activeStatus === course._id ? (
                  <BsChevronUp />
                ) : (
                  <BsChevronDown />
                )}
              </div>

              {/* Subsections */}
              {activeStatus === course._id && (
                <div>
                  {course.subSection.map((topic) => (
                    <div
                      key={topic._id}
                      className={`flex cursor-pointer items-start gap-3 px-5 py-3 text-sm md:text-base ${
                        videoBarActive === topic._id
                          ? "bg-yellow-200 font-semibold text-richblack-800"
                          : "hover:bg-richblack-900"
                      }`}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic._id}`
                        );

                        setVideoBarActive(topic._id);
                        setSidebarOpen(false);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures.includes(
                          topic._id
                        )}
                        readOnly
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      />

                      <span className="break-words">
                        {topic.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSidebar;