import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuest } from "./api-client-based/api-client";

export function useCreateQuest() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: { title: string; description: string }) => createQuest(data),
        onSuccess: () => {
            // Refresh the quests list after creating
            queryClient.invalidateQueries({ queryKey: ['getQuests'] });
        }
    })
}