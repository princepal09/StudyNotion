import React, { useEffect, useState } from "react";

const RequirementField = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementList, setRequirementList] = useState([]);

  const handleAddRequirement = () => {
    if (requirement) {
      setRequirementList([...requirementList, requirement]);
      setRequirement("");
    }
  };

  const handleRemoveRequirement = (index) => {
    const newList = requirementList.filter((_, i) => i !== index);
    setRequirementList(newList);
  };

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0,
    });
  }, []);

//   useEffect(() => {
//     setValue(name, requirementList)
//   }, [requirementList]);

  return (
    <div>
      <label htmlFor={name}>
        {label}
        <sup>*</sup>
      </label>
      <div>
        <input
          type="text"
          id={name}
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
        />
        <button
          className="font-semibold text-yellow-100"
          onClick={handleAddRequirement}
        >
          Add
        </button>
      </div>

      {requirementList.length > 0 && (
        <ul>
          {requirementList.map((requirement, idx) => (
            <li className="flex items-center text-richblack-5" key={idx}>
              <spnan>{requirement}</spnan>
              <button
                className="text-xs text-pure-greys-300"
                type="button"
                onClick={() => handleRemoveRequirement(idx)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && <span>{label} is required</span>}
    </div>
  );
};

export default RequirementField;
