import { resumeApi } from '../../../api/resumeApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { querykeys } from '../../../constants/keys';

export default function useIntroduceDetail(id) {
  const queryClient = useQueryClient();

  const getIntroduce = () => {
    const { data, isLoading, isError } = useQuery({
      queryKey: [querykeys.INTRODUCE, id],
      queryFn: async () => {
        const { data: responstData } = await resumeApi.introduce.detail(id);
        return responstData.response;
      },
      enabled: !!id,
    });

    return { data, isLoading, isError };
  };

  const createIntroduce = useMutation({
    mutationFn: async (values) => await resumeApi.introduce.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.INTRODUCE, id]);
    },
  });

  const updateIntroduce = useMutation({
    mutationFn: async (values) => await resumeApi.introduce.update(values),
    onSuccess: () => {
      queryClient.invalidateQueries([querykeys.INTRODUCE, id]);
    },
  });

  const deleteIntroduce = useMutation({
    mutationFn: async (introduce_id) =>
      await resumeApi.introduce.delete(introduce_id),
    onSuccess: () => {
      queryClient.removeQueries([querykeys.INTRODUCE, id]);
    },
  });

  return {
    getIntroduce,
    createIntroduce,
    updateIntroduce,
    deleteIntroduce,
  };
}
