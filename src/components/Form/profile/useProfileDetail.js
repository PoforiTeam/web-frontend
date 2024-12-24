import { useState } from 'react';
import { resumeApi } from '../../../api/resumeApi';

const useProfileDetail = (id) => {
  const [profile, setProfile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const getProfile = async () => {
    try {
      const { data } = await resumeApi.profile.detail(id);
      if (Object.keys(data.response).length > 0) {
        setProfile(data.response);
        const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/api/public/${data.response.profile_image}`;
        setImagePreview(imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createProfile = async (values) => {
    try {
      await resumeApi.profile.create(values);
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const updateProfile = async (values) => {
    try {
      await resumeApi.profile.update(values);
      fetchProfile();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProfile = async (profile_id) => {
    try {
      await resumeApi.profile.delete(profile_id);
      setProfile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    profile,
    imagePreview,
    setImagePreview,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  };
};

export default useProfileDetail;
