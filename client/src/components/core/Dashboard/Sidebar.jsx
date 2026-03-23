import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { VscSettingsGear, VscSignOut } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModel] = useState(null)


    if (profileLoading || authLoading) {
        return <div className='mt-10'>Loading...</div>
    }
    return (

        <div>
            <div className='flex flex-col border min-w-5.5 border-r border-r-richblack-700 h-[calc(100vh - 3.5rem)] bg-richblack-800 py-10' >

                <div className='flex flex-col '>
                    {
                        sidebarLinks.map((link, index) => {
                            if (link.type && user.accountType !== link.type) return null;

                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon} />
                            )
                        })
                    }

                </div>

                <div className='mx-auto mt-6 mb-6 h-px w-10/12 bg-richblack-600'></div>

                <div className='flex flex-col'>
                    <SidebarLink
                        link={{ name: "Settings", path: 'dashboard/settings' }}
                        iconName={VscSettingsGear}
                    />

                    <button

                        onClick={() => setConfirmationModel({
                            text1: "Are You Sure",
                            text2: "You will be logged out of your account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModel(null)
                        })}
                        className='text-sm font-medium text-richblack-300'

                    >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut/>
                            <span>Logout</span>
                        </div>

                    </button>

                </div>



            </div>


            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}

        </div>
    )
}

export default Sidebar
