import React from 'react'

import { Swiper, SwiperSlide  } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { FreeMode, Pagination, Autoplay} from 'swiper/modules'

import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={24}
          autoplay = {{
            delay : 3000,
            disableOnInteraction : true
          }}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination, Autoplay]}
        >
          {Courses.map((course, idx) => (
            <SwiperSlide key={idx}>
              <Course_Card
                course={course}
                Height={"h-[250px]"}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className='text-white'>No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider