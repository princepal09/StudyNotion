

const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")



exports.updateCourseProgress = async (req, res) => {

    try {

        const { courseId, subSectionId } = req.body;
        const userId = req.user.id;


        // check if the subSection is Valid or not

        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                error: "Invalid Subsection"
            })
        }

        console.log("SubSection Validation done!!")


        // check for old entry

        let courseProgress = await CourseProgress.findOne({
            courseId,
            userId
        })

        console.log("courseProgress", courseProgress)

        if (!courseProgress) {
            courseProgress = await CourseProgress.create({
                courseId,
                userId,
                completedVideos: [subSectionId]
            });
        

    } else {
        // check for re completing video or subSection
        console.log("Course Progress Validation done !!")

        if (courseProgress.completedVideos.includes(subSectionId)) {
            return res.status(400).json({
                succcess: false,
                error: "SubSection already completed"

            })
        }

        // push into completed video
        courseProgress.completedVideos.push(subSectionId);
        console.log("Course Progress Push done !!")

    }

    await courseProgress.save();
    console.log("Course Progress Save call done ")

    return res.status(200).json({
        success: true,
        message: 'Course Progress Updated Successfully !!'
    })

} catch (err) {

    console.log(err.message);

    return res.status(500).json({
        success: false,
        message: "Internal Server error"
    })

}


}

