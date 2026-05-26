import toast from 'react-hot-toast';
import { studentEndpoints } from '../apis'
import { apiConnector } from '../apiConnector';
import rzpLogo from '../../assets/Logo/rzp_logo.png'
import { setPaymentLoading } from '../../redux/slices/courseSlice';

const { COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = studentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false)
        }

        document.body.appendChild(script);
    })
}

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {
    const toastId = toast.loading("Loading...")
    try {

        // load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, { courses },
            {
                Authorization: `Bearer ${token}`
            }
        )

        console.log(orderResponse.data.data)

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }

        // options 

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "StudyNotion",
            description: "Thank You for purchasing the course",
            image: rzpLogo,
            prefill: {
                name: `${userDetails.firstName}`,
                email: `${userDetails.email}`,
            },
            handler: function (response) {
                // send successfullyt email
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);


                // verify  Payment
                verifyPayment({ ...response, courses }, token, navigate, dispatch)
            }

        }

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();

        paymentObject.on("payment.failed", function (response) {
            toast.error("OOPS, Payment Failed");

            console.log(response);
        });


    } catch (err) {
        console.log("PAYMENT_API_ERROR...", err);
        toast.error('Could not make payment')

    }
    finally {
        toast.dismiss(toastId);
    }

}


async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount

        }, {
            Authorization: `Bearer ${token}`
        })

    } catch (err) {
        console.log("PAYMENT SUCCESS EMAIL ERRROR", err)
    }
}



async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment");

    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        })

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment Successfull, you are added to the course")

        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());

    } catch (err) {
        console.log("PAYMENT VERIFY ERRROR", err);
        toast.error("Could not verify the payment")
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false))

}