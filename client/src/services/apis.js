const BASE_URL =  import.meta.env.VITE_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/showAllCategories"
}

export const contactusEndpoint = {
    CONTACT_US_API : BASE_URL + "/reach/contact"
}