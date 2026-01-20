import { useQuery } from "@tanstack/react-query";
import { getQuests } from "./api-client-based/api-client";

export function useGetQuests() {
    return useQuery({
        queryKey: ['getQuests'],
        queryFn: getQuests,
    });
}