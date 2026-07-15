import { useQuery } from '@tanstack/react-query';
import { licensesApi } from '@/lib/api';

export function licenseTypesKey() {
  return ['licenses', 'types'] as const;
}

export function licenseTypeBySlugKey(slug: string) {
  return ['licenses', 'bySlug', slug] as const;
}

export function userLicensesKey(userId: string) {
  return ['licenses', 'user', userId] as const;
}

export function useLicenseTypes() {
  return useQuery({
    queryKey: licenseTypesKey(),
    queryFn: async () => {
      return await licensesApi.getLicenseTypes();
    },
    staleTime: 60_000,
    retry: 1,
  });
}

export function useLicenseTypeBySlug(slug: string) {
  return useQuery({
    queryKey: licenseTypeBySlugKey(slug),
    queryFn: async () => {
      return await licensesApi.getLicenseTypeBySlug(slug);
    },
    enabled: Boolean(slug),
    staleTime: 60_000,
    retry: 1,
  });
}

export function useUserLicenses(userId: string) {
  return useQuery({
    queryKey: userLicensesKey(userId),
    queryFn: async () => {
      return await licensesApi.getUserLicenses(userId);
    },
    enabled: Boolean(userId),
    staleTime: 30_000,
    retry: 1,
  });
}
