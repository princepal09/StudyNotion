import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import {MdAddCircleOutline} from 'react-icons/md'
const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);

  return (
    <div className="text-white">
      <p>Course Builder</p>
      <form>
        <div>
          <label>
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
        <div className="mt-10">
          <IconBtn
          type='submit'
          text={editSectionName ? 'Edit Section Name' : 'Create Section Name'}
          outline = {true}
          customClasses={'text-white'}
           > 
           <MdAddCircleOutline/>
           </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseBuilderForm;
