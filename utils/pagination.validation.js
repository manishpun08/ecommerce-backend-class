import Yup from "yup";

export const paginationValidationSchema = Yup.object({
  page: Yup.number().default(1).min(1, "Page must be at least 1."),
  limit: Yup.number().default(6).min(1, "Limit must be at least 1."),
});
