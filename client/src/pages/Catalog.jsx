import React, { useEffect, useState } from "react";
import { fetchCourseCategories } from "../services/operations/courseDetailApi";
import { getCatalogPageData } from "../services/operations/pageAndComponentData";
import { useParams } from "react-router-dom";
import Footer from "../components/common/Footer";

const Catalog = () => {
  const { catalogName } = useParams();
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

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
        <p>{"Home/Catalog"}</p>
        <p></p>
        <p></p>
      </div>

      <div>
        {/* section1  */}

        <div>
          <div className="flex gap-x-3">
            <p>Most Popular</p>
            <p>New</p>
          </div>

          {/* <CourseSlider/> */}
        </div>

        {/* section 2 */}

        <div>
          <p>Top Courses</p>
          <div>{/* <CourseSlider/> */}</div>
        </div>

        {/* section 3  */}
        <div>
          <p>Frequently bought Together</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
