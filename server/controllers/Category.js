const Category = require("../models/Categories");

exports.createCategory = async (req, res) => {
  try {
    // fetch data from request body
    const { name, description } = req.body;

    //    validation  
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // create entry in DB ...
    const tagDetails = await Category.create({ name, description });

    console.log(tagDetails);

    return res.status(201).json({
      success: true,
      message: "Category Created Successfully ",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// getAllTags
exports.showAllCategories = async (req, res) => {
  try {
    // name and description should be present that's why we set the name and description will be true
    const allTags = await Category.find({}, { name: true, description: true });

    return res.status(200).json({
      success: true,
      message: "All Tags returned Successfully",
      allCategories : allTags
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// categoryPageDetails

exports.categoryPageDetails = async(req, res) =>{
  try{
    // get category Id
    const {categoryId} = req.body;

    // get courses for specified categoryId
    const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

    // vaildation 
    if(!selectedCategory){
      return res.status(404).json({
        success : flase,
        message : "Category not found!"
      })
    }


    // getCourses for different categories
    const differentCategories = await Category.find({
                               _id : {$ne : categoryId}
    }).populate("courses").exec();

    // HW ==========> 
    // get top selling courses


    // return response
    return res.status(200).json({
      success : true,
      data : {
        selectedCategory,
        differentCategories
      }
    })


  }catch(err){
    return res.status(500).json({
      success : false,
      message : "ERORRRRRRRRRRR",
      error : err.message
    }
    )
    
  }
}