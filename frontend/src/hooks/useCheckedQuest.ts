import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkedQuest } from "./api-client-based/api-client";

interface CheckQuestParams {
    id: number;
    is_complete: boolean;
}

export function useCheckedQuest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, is_complete }: CheckQuestParams) => checkedQuest(id, is_complete),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getQuests'] });
        },
    })
}