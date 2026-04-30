import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
//   console.log(step)

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <>
      <div>
        {steps.map((item) => (
          <div key={item.id}>
            <div
              className={`${
                step === item.id
                  ? "bg-yellow-900 border-yellow-50 text-yellow-50"
                  : "bg-richblack-700 border-richblack-800 text-richblack-300"
              }`}
            >
              {step > item.id ? <FaCheck /> : item.id}
            </div>
          </div>
        ))}
      </div>

      <div>
        {steps.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      {step === 1 && <CourseInformationForm />}
      {/* {step === 2 && <CourseBuilderForm />}
      {step === 3 && <CoursePublishForm />} */}
    </>
  );
};

export default RenderSteps;
