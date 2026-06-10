import { createPortal } from "react-dom";
import IconBtn from "./IconBtn";

export default function ConfirmationModal({ modalData }) {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>

        <p className="mt-3 mb-5 text-richblack-200">
          {modalData?.text2}
        </p>

        <div className="flex gap-4">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />

          <button
            className="rounded-md bg-richblack-200 px-5 py-2 font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}