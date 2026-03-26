import { useEffect, useRef, useState } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI"
import IconBtn from "../../../common/IconBtn"

export default function ChangeProfilePicture() {
    const { token } = useSelector((state) => state.auth)
    const { user, loading } = useSelector((state) => state.profile)
    const dispatch = useDispatch()

    const [imageFile, setImageFile] = useState(null)
    const [previewSource, setPreviewSource] = useState(null)

    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        console.log("file", file)
        if (file) {
            setImageFile(file)
            previewFile(file)
        }
    }

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = (e) => {
        if (!imageFile) {
            console.log("No file selected ❌")
            return
        }

        console.log("Uploading file:", imageFile)

        const formData = new FormData()
        formData.append("displayPicture", imageFile)

        dispatch(updateDisplayPicture({ token, formData }))
    }

    useEffect(() => {
        if (imageFile) {
            previewFile(imageFile)
        }
    }, [imageFile])
    return (
        <>
            <div className="flex items-center justify-between rounded-md border border-richblack-700 bg-richblack-800 p-8 px-12 text-richblack-5">
                <div className="flex items-center gap-x-4">
                    <img
                        src={previewSource || user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-19.5 rounded-full object-cover"
                    />
                    <div className="space-y-2">
                        <p>Change Profile Picture</p>

                        <div className="flex flex-row gap-3">
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="hidden"
                                accept="image/png, image/gif, image/jpeg"
                            />
                            <button
                                onClick={handleClick}
                                disabled={loading}
                                className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                            >
                                Select
                            </button>
                            <IconBtn
                                disabled={loading}
                                text={loading ? "Uploading..." : "Upload"}
                                onclick={handleFileUpload}

                            >
                                {!loading && (
                                    <FiUpload className="text-lg text-richblack-900" />
                                )}
                            </IconBtn>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}