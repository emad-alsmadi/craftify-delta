import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { downloadsApi } from '@/lib/api';
import { Download, DownloadPayload } from '@/types';

export const useMyDownloads = () => {
  return useQuery({
    queryKey: ['downloads', 'my'],
    queryFn: downloadsApi.getMyDownloads,
  });
};

export const useDownloadById = (id: string) => {
  return useQuery({
    queryKey: ['downloads', id],
    queryFn: () => downloadsApi.getDownloadById(id),
    enabled: !!id,
  });
};

export const useCreateDownload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DownloadPayload) => downloadsApi.createDownload(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads', 'my'] });
    },
  });
};

export const useRecordDownload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => downloadsApi.recordDownload(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['downloads', 'my'] });
      queryClient.invalidateQueries({ queryKey: ['downloads', id] });
    },
  });
};

export const useDeleteDownload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => downloadsApi.deleteDownload(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['downloads', 'my'] });
    },
  });
};
