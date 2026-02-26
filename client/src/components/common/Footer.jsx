import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import FooterCol from './FooterCol'

const bottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const company = ["About, Careers, Affilates"]
const resources = ["Articles", "Blog", "Chart Sheet", "Code Challanges", "Docs", "Projects", "Videos", "Workspaces"]
const plans = ["Paid memberships", "For students", "Business solution"]
const community = ["Forums", "Chapters", "Events"]
const subjects = [
    "AI",
    "Cloud Computing",
    "Code Foundations",
    "Computer Science",
    "Cybersecurity",
    "Data Analytics",
    "Data Science",
    "Data Visualization",
    "Developer Tools",
    "DevOps",
    "Game Development",
    "IT",
    "Machine Learning",
    "Math",
    "Mobile Development",
    "Web Design",
    "Web Development"
];
const languages = [
    "Bash",
    "C",
    "C++",
    "C#",
    "Go",
    "HTML & CSS",
    "Java",
    "JavaScript",
    "Kotlin",
    "PHP",
    "Python",
    "R",
    "Ruby",
    "SQL",
    "Swift"
];
const careerBuilding = [
    "Career paths",
    "Career services",
    "Interview prep",
    "Professional certification",
    "-",
    "Full Catalog",
    "Beta Content"
];

const Footer = () => {
    return (
        <div className='bg-richblack-800'>
            <div className='w-11/12 max-w-maxContent flex flex-row gap-8 items-center justify-between leading-6 relative py-14 mx-auto'>

                <div className='border-b w-full flex flex-row pb-5 border-richblack-700'>

                    {/* Section 1  */}
                    <div>

                        {/* Section1 1st col  */}
                        <div>
                            <div>
                                <img src={logo} alt="" />
                            </div>

                            <div>
                                <h2>Company</h2>

                                <div className='flex flex-col gap-4'>
                                    {company.map((elem, idx) =>{
                                        return <Footer key={idx} elem = {elem} />
                                    })}
                                </div>

                            </div>

                        </div>
                        {/* Section1 2nd col  */}
                        {/* Section1 3rd col  */}
                        
                    </div>


                    {/* Section 2  */}


                </div>



            </div>

        </div>
    )
}

export default Footer
