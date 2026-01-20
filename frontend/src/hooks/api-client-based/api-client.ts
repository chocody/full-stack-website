import type { ApiResponse, QuestResponse } from "../../types/api-response";
import { http } from "./client";

export function getQuests(): Promise<QuestResponse> {
    return http("/quests", { method: "GET" });
}

export function createQuest(data: { title: string; description: string }): Promise<ApiResponse> {
    return http("/quest", { method: "POST", body: JSON.stringify(data) });
}