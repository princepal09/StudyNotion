import React, { useEffect, useState } from "react";
import { fetchCourseCategories } from "../services/operations/courseDetailApi";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const {loading} = useSelector((state) => state.profile)
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [active, setActive] = useState(1);
  const { course } = useSelector((state) => state.course);

  // Fetch All Categories

  const getCategories = async () => {
    const res = await fetchCourseCategories();
    console.log(res);

    const category = res?.find(
      (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName,
    );
    // console.log(category)
    const category_id = category?._id;
    // console.log(category_id)
    setCategoryId(category_id);
  };

  const getCategoryDetails = async () => {
    try {
      const res = await getCatalogPageData(categoryId);
      console.log(res);
      setCatalogPageData(res);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, [catalogName]);

  useEffect(() => {
    if (categoryId) {
      getCategoryDetails();
    }
  }, [categoryId]);

  

  

  return (
    < >
    {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.selectedCategory?.description}
              </p>
            </div>
          </div>

     
         {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Popular
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.selectedCategory?.course}
              />
            </div>
          </div>


       {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">
              Top courses in {catalogPageData?.differentCategory?.name}
            </div>
            <div className="py-8">
              <CourseSlider
                Courses={catalogPageData?.differentCategory?.courses}
              />
            </div>
          </div>

        {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div>

      <Footer />
    </>
  );
};

export default Catalog;
