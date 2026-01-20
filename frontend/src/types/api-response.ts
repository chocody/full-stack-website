export type ApiResponse = {
    status: number;
    message: string;
}

export type Quest = {
    id: number,
    title: string,
    desc: string,
    is_completed: boolean,
}

export type QuestResponse = {
    status: number;
    message: string;
    response: Quest[];
}