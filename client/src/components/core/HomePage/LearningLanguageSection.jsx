import HighlightText from './HighlightText'
import image1 from '../../../assets/Images/Know_your_progress.png'
import image2 from '../../../assets/Images/Compare_with_others.png'
import image3 from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'

const LearningLanguageSection = () => {
  return (
    <div className='mt-10 '> 
    <div className='flex py-10 flex-col items-center gap-4'>
      <h1 className='text-4xl tracking-wide text-center  font-semibold'>
        Your Swiss Knife for
        <HighlightText text={"learning any language"}/>
      </h1>
      <p className='text-center text-richblack-600 tracking-wide'>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, <br /> progress tracking, custom schedule and more. 
      </p>
      
    <div className ='flex flex-row items-center justify-center mt-5 '>

    <img src={image1} className='object-contain -mr-32' alt = 'image1' loading='lazy'/>
    <img src={image2} className='object-contain' alt = 'image2' loading='lazy'/>
    <img src={image3} className='object-contain -ml-36' alt = 'image3' loading='lazy'/>

    </div>

    <div className='flex items-start '>
      <Button active={true} linkto={"/signup"}> 
      <p>Learn More</p>
      </Button>
    </div>
    </div>


    </div>
  )
}

export default LearningLanguageSection
