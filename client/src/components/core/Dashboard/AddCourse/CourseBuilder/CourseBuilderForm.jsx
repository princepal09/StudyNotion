import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { BiRightArrow } from "react-icons/bi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../redux/slices/courseSlice";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailApi";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    let result;

    if (editSectionName) {
      // WE are editing the section name
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token,
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token,
      );
    }

    //update values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least one section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subsection.length === 0)
    ) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    // if everything is good
    disaptch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) =>{
    if(editSectionName === sectionId){
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", "");
  }

  return (
    <div className="text-white">
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName" >
            Section Name<sup>*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add Section Name"
            {...register("sectionName", { required: true })}
            className="w-full"
          />
          {errors.sectionName && <span>Section name is required</span>}
        </div>

        <div className="mt-10 flex ">
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section Name"}
            outline={true}
            customClasses={"text-white"}
          >
            <MdAddCircleOutline className="text-yellow-50" size={20} />
          </IconBtn>

          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm ml-10 text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested View  */}
      {course?.courseContent?.length > 0 && <NestedView handleChangeEditSectionName = {handleChangeEditSectionName} />}

      <div className="flex justify-end gap-x-3">
        <button onclick={goBack}>Back</button>

        <IconBtn text="Next" onclick={goToNext}>
          <BiRightArrow />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
