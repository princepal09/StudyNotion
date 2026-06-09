import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");
  console.log(courses);
  // Function to generate random colors
  const getRandomColors = (numColors) => {
    const colors = [];

    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256,
      )}, ${Math.floor(Math.random() * 256)})`;

      colors.push(color);
    }

    return colors;
  };

  // Data for student enrollment chart
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Students Enrolled",
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
      },
    ],
  };

  // Data for income chart
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Income Generated",
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text:
          currChart === "students"
            ? "Students Enrolled per Course"
            : "Income Generated per Course",
      },
    },
  };

  return (
    <div className="w-full rounded-md bg-richblack-800 p-6">
      <p className="mb-4 text-xl font-semibold text-white">
        Visualize Course Data
      </p>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-md px-4 py-2 ${
            currChart === "students"
              ? "bg-yellow-50 text-black"
              : "bg-richblack-700 text-white"
          }`}
        >
          Students
        </button>

        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-md px-4 py-2 ${
            currChart === "income"
              ? "bg-yellow-50 text-black"
              : "bg-richblack-700 text-white"
          }`}
        >
          Income
        </button>
      </div>

      {courses.length > 0 ? (
        <div className="mx-auto max-w-md">
          <Pie
            data={
              currChart === "students"
                ? chartDataForStudents
                : chartDataForIncome
            }
            options={options}
          />
        </div>
      ) : (
        <p className="text-center text-richblack-300">
          No course data available.
        </p>
      )}
    </div>
  );
};

export default InstructorChart;
