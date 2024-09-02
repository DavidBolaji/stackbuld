import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  img: yup.string().required("Image is required"),
  category: yup.string().required("Category is required"),
  price: yup
    .string()
    .typeError("Price must be a number")
    .test(
      "is-decimal",
      "Price must be a positive number with up to 2 decimal places",
      (value) =>
        value !== undefined && /^\d+(\.\d{1,2})?$/.test(value.toString())
    )
    .min(1, "Price must be greater than 1")
    .required("Product price is required"),
});

export const initialValues = {
  title: "",
  img: "",
  price: "",
  category: "",
};
