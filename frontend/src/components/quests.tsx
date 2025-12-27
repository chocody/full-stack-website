import { useState } from "react";

export const Quests = () => {
    const questItems = Array.from({ length: 9 });
    const ITEMS_PER_PAGE = 5;

    const [page, setPage] = useState(0);

    const maxPage = Math.ceil(questItems.length / ITEMS_PER_PAGE) - 1;

    const visibleItems = questItems.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    return (
        <div className="w-60 h-110 bg-gray-100 border-6 rounded-4xl flex flex-col gap-3 p-3">
            {/* Quest items */}
            {/* TODO: Get quests data from hook get_quests */}
            <div className="flex flex-col gap-3 flex-1">
                {visibleItems.map((_, index) => (
                    <div
                        key={index}
                        className="w-53 h-13 !m-2 !mb-0 bg-white rounded-xl"
                    />
                ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center !mb-2">
                {page != maxPage ? (
                    <div
                        onClick={() => setPage(p => p + 1)}
                        className="text-3xl hover:text-gray-500 cursor-pointer"
                    >
                        ▼
                    </div>
                ) : (
                    <div
                        onClick={() => setPage(p => p - 1)}
                        className="text-3xl hover:text-gray-500 cursor-pointer"
                    >
                        ▲
                    </div>
                )}
            </div>
        </div>
    );
};
