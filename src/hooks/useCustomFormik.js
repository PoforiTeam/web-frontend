import { useFormik } from 'formik';

export default function useCustomFormik({ initialValues, onSubmitCallback }) {
  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmitCallback(values);
    },
  });

  return formik;
}
