

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
            
            
            // check for old entry
            
            let courseProgress = await CourseProgress.findOne({
                courseId,
                userId
            })

            console.log(courseProgress)
            
        if (!courseProgress) {
            return res.status(404).json({
                success: false,
                message: "Course Progress doesn't exists"
            })
        } else {
            // check for re completing video or subSection
            if (courseProgress.completedVideos.inculde(subSectionId)) {
                return res.status(400).json({
                    succcess: false,
                    error: "SubSection already completed"

                })
            }

            // push into completed video
            courseProgress.completedVideos.push(subSectionId);

        }

        await courseProgress.save();

    } catch (err) {

        console.log(err,message);

        return res.status(500).json({
            success : false,
            message : "Internal Server error"
        })

    }


}

