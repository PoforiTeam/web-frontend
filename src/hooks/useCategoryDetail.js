import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { resumeApi } from '../api/resumeApi';

export default function useCategoryDetail({ id, category, customQuery }) {
  const queryClient = useQueryClient();

  const {
    data: itemList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [category, id],
    queryFn: async () => {
      if (customQuery) {
        const customResult = await customQuery();
        return customResult;
      }
      const { data } = await resumeApi[category].detail(id);
      return data.response.result;
    },
    enabled: !!id,
  });

  const createItem = useMutation({
    mutationFn: async (values) => await resumeApi[category].create(values),
    onSuccess: () => {
      queryClient.invalidateQueries([category, id]);
    },
  });

  const updateItem = useMutation({
    mutationFn: async (values) => await resumeApi[category].update(values),
    onSuccess: () => {
      queryClient.invalidateQueries([category, id]);
    },
  });

  const deleteItem = useMutation({
    mutationFn: async (item_id) => await resumeApi[category].delete(item_id),
    onSuccess: () => {
      queryClient.invalidateQueries([category, id]);
    },
  });

  return {
    itemList,
    isLoading,
    isError,
    createItem,
    updateItem,
    deleteItem,
  };
}
