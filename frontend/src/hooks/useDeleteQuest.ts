import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteQuest } from "./api-client-based/api-client";

export function useDeleteQuest() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteQuest(id),
        onSuccess: () => {
            // Refresh the quests list after creating
            queryClient.invalidateQueries({ queryKey: ['getQuests'] });
        }
    })
}