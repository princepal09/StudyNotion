import React from 'react'
import IconBtn from './IconButton'

const ConfirmationModal = ({ modalData }) => {
    return (
        <div >

            <div>
                <p>
                    {modalData.text1}
                </p>
                <p>
                    {modalData.text2}
                </p>

                <div>
                    <IconBtn onClick={
                    modalData?.btn1handler
                }/>
                
                <button onClick={modalData?.btn1handler}>
                    {modalData.btn2Text}
                </button>
               
                
                    

                </div>
            </div>

        </div>
    )
}








































































export default ConfirmationModal
