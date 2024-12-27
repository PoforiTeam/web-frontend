import { useFormik } from 'formik';

export default function useCareerFormik({ id, career = {}, onSubmitCallback }) {
  const initialValues = {
    resume_id: Number(id),
    career_id: Number(career.career_id) || '',
    company_name: career.company_name || '',
    job_title: career.job_title || '',
    career_status: career.career_status || '',
    career_start_date: career.career_start_date || '',
    career_end_date: career.career_end_date || '',
    job_detail: career.job_detail || '',
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
