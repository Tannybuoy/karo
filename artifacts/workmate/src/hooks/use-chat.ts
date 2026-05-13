import { 
  useGetChatMessages, 
  useSendChatMessage, 
  useGetSuggestedCafes,
  getGetChatMessagesQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function useChat(matchId: string | undefined) {
  return useGetChatMessages(matchId || "", {
    query: {
      enabled: !!matchId,
      refetchInterval: 3000, // Poll for new messages for demo purposes
    }
  });
}

export function useCafes(matchId: string | undefined) {
  return useGetSuggestedCafes(matchId || "", {
    query: {
      enabled: !!matchId,
      staleTime: Infinity,
    }
  });
}

export function useSendMessage(matchId: string) {
  const queryClient = useQueryClient();
  
  return useSendChatMessage({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetChatMessagesQueryKey(matchId) });
      }
    }
  });
}
