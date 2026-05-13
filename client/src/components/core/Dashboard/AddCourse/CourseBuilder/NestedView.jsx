import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NestedView = () => {

  const {course} = useSelector((state) => state.course);
  const {token} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const [ediSubSection, setEdiSubSection] = useState(null)
  return (
    <div>
      <div>
        {course?.courseContent?.map((section) => (
          <details key={details._id} >

            <summary className='flex items-center justify-between gap-x-3 border'>
              <div>
                <RxDropdownMenu/>
                <p>{section.sectionName}</p>
              </div>
            </summary>

          </details>
        ))}
      </div>
    </div>
  )
}

export default NestedView
