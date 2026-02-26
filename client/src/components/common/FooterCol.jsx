

const FooterCol = ({  title, domain }) => {
  console.log(domain)
  return (
    <div className='flex flex-col gap-2 mt-1'>
      <h2 className='text-richblack-100 font-semibold text-[19px]'>{title}</h2>

      <div className='flex flex-col mt-2 text-richblack-400 gap-3'>
        {domain?.map((elem, idx) => <p className="hover:text-white" key={idx}>{elem}</p>)}
      </div>

    

    </div>
  )
}

export default FooterCol
