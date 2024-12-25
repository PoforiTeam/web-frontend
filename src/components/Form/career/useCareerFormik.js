import { useFormik } from 'formik';

export default function useCareerFormik({ id, res = {}, onSubmitCallback }) {
  const initialValues = {
    resume_id: Number(id),
    career_id: Number(res.career_id) || '',
    company_name: res.company_name || '',
    job_title: res.job_title || '',
    career_status: res.career_status || '',
    career_start_date: res.career_start_date || '',
    career_end_date: res.career_end_date || '',
    job_detail: res.job_detail || '',
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmitCallback(values);
    },
  });

  return formik;
}
