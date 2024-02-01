import Yup from "yup";

export let registerUserValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required.")
    .trim()
    .max(25, "First name must be at max of 25 character."),
  lastName: Yup.string()
    .required("Last name is required")
    .trim()
    .max(25, "First name must be at max of 25 character."),
  email: Yup.string()
    .email()
    .trim()
    .lowercase()
    .max(55, "Email must be at max of 55 character"),
  password: Yup.string()
    .required("Password is required.")
    .trim()
    .min(4, "Password must be at min 4 character.")
    .max(20, "Password must be at max 20 character."),
  dob: Yup.date().nullable(),
  gender: Yup.string().nullable().oneOf(["male", "female", "other"]).trim(),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["buyer", "seller"])
    .trim(),
});

export let loginUserValidationSchema = Yup.object({
  email: Yup.string()
    .email("Must be valid email.")
    .required("Email is required.")
    .trim()
    .lowercase(),
  password: Yup.string().required("Password is required.").trim(),
});
