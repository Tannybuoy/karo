import { useGetMyProfile, useUpsertProfile, getGetMyProfileQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function useProfile() {
  return useGetMyProfile({
    query: {
      retry: false,
      staleTime: 1000 * 60 * 5, // 5 mins
    }
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useUpsertProfile({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetMyProfileQueryKey() });
      }
    }
  });
}
