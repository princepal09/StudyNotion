import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import FooterCol from './FooterCol'
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa"
import { Link } from 'react-router-dom'
const support = ['Help Center']
const bottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"]
const company = ["About", "Careers", "Affilates"]
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
            <div className='w-11/12 max-w-maxContent leading-6 relative py-14 mx-auto'>

                <div className='border-b w-full flex gap-20 flex-row pb-5 border-richblack-700'>

                    {/* Section 1  */}
                    <div className='flex gap-14'>

                        {/* Section1 1st col  */}
                        <div>
                            <div>
                                <img src={logo} alt="" />
                            </div>

                            <div className='mt-4'>
                                <FooterCol domain={company} title={"Company"} />

                            </div>

                            <div className='flex mt-4 gap-5 text-[20px] items-center'>
                                <Link>
                                    <FaFacebook className='text-richblack-400' />
                                </Link>

                                <Link>
                                    <FaGoogle className='text-richblack-400' />

                                </Link>

                                <Link>
                                    <FaTwitter className='text-richblack-400' /></Link>

                                <Link> <FaYoutube className='text-richblack-400' /> </Link>


                            </div>

                        </div>

                        {/* Section1 2nd col  */}
                        <div className='flex flex-col gap-13'>

                            <FooterCol title={"Resources"} domain={resources} />

                            <FooterCol title={"Support"} domain={support} />


                        </div>

                        {/* Section1 3rd col  */}

                        <div className='flex flex-col gap-10'>
                            <div>
                                <FooterCol title={"Plans"} domain={plans} />

                            </div>

                            <div>
                                <FooterCol title={"Community"} domain={community} />

                            </div>
                        </div>

                    </div>


                    {/* Section 2  */}

                    <div className='flex  border-richblack-700 border-l pl-13 flex-row gap-12'>
                        <div>
                            <FooterCol domain={subjects} title="Subjects" />
                        </div>
                        <div>
                            <FooterCol domain={languages} title="Languages" />
                        </div>
                        <div>
                            <FooterCol domain={careerBuilding} title={"Career Building"} />
                        </div>
                    </div>



                </div>

                <div className='flex mt-10  text-[13px] items-center text-richblack-300 justify-between'>

                    <div className='flex gap-4'>
                        {bottomFooter?.map((elem, idx) => <p key={idx}> {elem} </p>)}
                    </div>

                    <div>
                        <p className="tracking-wider">
                            Made with <span className=' text-[18px] text-pink-200'>♥</span> by Prince Pal © 2025
                        </p>
                    </div>

                </div>







            </div>

        </div>
    )
}

export default Footer
