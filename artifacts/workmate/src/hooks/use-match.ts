import { useGetCurrentMatch } from "@workspace/api-client-react";

export function useMatch() {
  return useGetCurrentMatch({
    query: {
      retry: false,
      staleTime: 1000 * 60, // 1 min
    }
  });
}
