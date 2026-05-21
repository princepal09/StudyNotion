import React, { useEffect, useState } from "react";
import { fetchCourseCategories } from "../services/operations/courseDetailApi";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import Footer from "../components/common/Footer";
import CourseSlider from "../components/core/Catalog/CourseSlider";
import Course_Card from "../components/core/Catalog/Course_Card";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [active, setActive] = useState(false)
  const {course} = useSelector((state) => state.course);

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
    <div className="text-white">
      <div>
        <p>{`Home/Catalog/`} 
          <span>
            {catalogPageData?.selectedCategory?.name}
          </span>
           </p>
        <p>{catalogPageData?.selectedCategory?.name}</p>
        <p>{catalogPageData?.selectedCategory?.description}</p>
      </div>

      <div>
        {/* section1  */} 

        <div>
          <div>Courses to get you started</div>
          <div className="flex gap-x-3">
            <p className={`${active ? "text-yellow-100" : "text-gray-500"}`}>Most Popular</p>
            <p>New</p>
          </div>

          <CourseSlider   Courses = {catalogPageData?.selectedCategory?.course} />

        </div>

        {/* section 2 */}

        <div>
          <p>Top Courses in {catalogPageData?.selectedCategory?.name}</p>
          <div><CourseSlider Courses = {catalogPageData?.differentCategory?.course}   /></div>
        </div>

        {/* section 3  */}
        <div>
          <p>Frequently bought Together</p>

          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* {
                catalogPageData?.mostSellingCourses?.slice(0, 4).map( (course, idx) => (
                  <Course_Card   course = {course} key = {idx} Height = {"h-[400px]"} />
                ) )
              } */}
            </div>
          </div>


        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
