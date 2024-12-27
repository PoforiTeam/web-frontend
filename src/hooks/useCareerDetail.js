import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resumeApi } from '../api/resumeApi';
import { querykeys } from '../constants/keys';

export default function useCareerDetail(id) {
  const queryClient = useQueryClient();

  const {
    data: careerList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [querykeys.CAREER, id],
    queryFn: async () => {
      const { data } = await resumeApi.career.detail(id);
      return data.response.result;
    },
    enabled: !!id,
  });

  const createCareer = useMutation({
    mutationFn: async (values) => await resumeApi.career.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.CAREER, id]);
    },
  });

  const updateCareer = useMutation({
    mutationFn: async (values) => await resumeApi.career.update(values),
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.CAREER, id]);
    },
  });

  const deleteCareer = useMutation({
    mutationFn: async (career_id) => await resumeApi.career.delete(career_id),
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.CAREER, id]);
    },
  });

  return {
    careerList,
    isLoading,
    isError,
    createCareer,
    updateCareer,
    deleteCareer,
  };
}
