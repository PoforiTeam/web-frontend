import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { resumeApi } from '../../../api/resumeApi';
import ResumeBox from '../../Resume/ResumeBox';
import ProfileDisplay from './ProfileDisplay';
import ProfileEditForm from './ProfileEditForm';
import useProfileDetail from '@/hooks/useProfileDetail';

const ProfileForm = () => {
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState(null);
  const [isEdit, setEdit] = useState(false);
  const { getProfile, createProfile, updateProfile, deleteProfile } =
    useProfileDetail(id);
  const { data: profile, isLoading, isError } = getProfile();

  const formik = useFormik({
    initialValues: {
      resume_id: Number(id),
      profile_id: profile?.profile_id || '',
      profile_title: profile?.profile_title || '',
      job_title: profile?.job_title || '',
      email: profile?.email || '',
      phone: profile?.phone || '',
      profile_image: profile?.profile_image || '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      Object.keys(profile).length > 1
        ? updateProfile.mutate(values)
        : createProfile.mutate(values);
      setEdit(false);
    },
  });

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);

        const form = new FormData();
        form.append('images', file);
        const { data } = await resumeApi.uploadImage(form);
        formik.setFieldValue('profile_image', data.response.image_urls[0]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    formik.resetForm();
    if (!profile) setImagePreview(null);
    setEdit(false);
  };

  return (
    <>
      <ResumeBox
        handleEdit={() => setEdit(true)}
        handleDelete={() => deleteProfile.mutate(profile.profile_id)}
      >
        <ProfileDisplay formik={formik} imagePreview={imagePreview} />
      </ResumeBox>

      {isEdit && (
        <ProfileEditForm
          formik={formik}
          handleCancel={handleCancel}
          handleImageUpload={handleImageUpload}
          imagePreview={imagePreview}
        />
      )}
    </>
  );
};

export default ProfileForm;
