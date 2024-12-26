import { resumeApi } from '../../../api/resumeApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { querykeys } from '../../../constants/keys';

const useProfileDetail = (id) => {
  const queryClient = useQueryClient();

  const getProfile = () => {
    const { data, isLoading, isError } = useQuery({
      queryKey: [querykeys.PROFILE, id],
      queryFn: async () => {
        const { data: responseData } = await resumeApi.profile.detail(id);
        if (!responseData.response) return null;
        const imageUrl = `${import.meta.env.VITE_API_BASE_URL}/api/public/${responseData.response.profile_image}`;
        return { ...responseData.response, imagePreview: imageUrl };
      },
      enabled: !!id,
    });

    return { data, isLoading, isError };
  };

  const createProfile = useMutation({
    mutationFn: async (values) => await resumeApi.profile.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.PROFILE, id]);
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (values) => await resumeApi.profile.update(values),
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.PROFILE, id]);
    },
  });

  const deleteProfile = useMutation({
    mutationFn: async (profile_id) =>
      await resumeApi.profile.delete(profile_id),
    onSuccess: () => {
      queryClient.removeQueries([querykeys.PROFILE, id]);
    },
  });

  return {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile,
  };
};

export default useProfileDetail;
