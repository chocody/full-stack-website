import { useState } from "react";
import { useGetQuests } from "../hooks/useGetQuests";
import { useCreateQuest } from "../hooks/useCreateQuest";
import { useDeleteQuest } from "../hooks/useDeleteQuest";
import { useCheckedQuest } from "../hooks/useCheckedQuest";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from 'lucide-react';
import { Trash2 } from 'lucide-react';

export const Quests = () => {
    const { data, isLoading } = useGetQuests();
    const { mutate: createQuest, isPending } = useCreateQuest()
    const { mutate: deleteQuest } = useDeleteQuest();
    const { mutate: checkQuest } = useCheckedQuest();

    const questItems = data?.response || []
    const ITEMS_PER_PAGE = 5;

    const [page, setPage] = useState(0);

    const maxPage = Math.ceil(questItems.length / ITEMS_PER_PAGE) - 1;

    const visibleItems = questItems.slice(
        page * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFormData({ title: "", description: "" });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateQuest = () => {
        if (!formData.title) {
            alert("Please input the title")
            return;
        }
        createQuest(
            {
                title: formData.title,
                description: formData.description,
            },
            {
                onSuccess: () => {
                    handleCloseModal();
                    // Reset page to show new quest
                    if (questItems.length % ITEMS_PER_PAGE === 0) {
                        setPage(Math.ceil((questItems.length + 1) / ITEMS_PER_PAGE) - 1);
                    }
                }
            }
        );
    }

    const handleDeleteQuest = (id: number) => {
        deleteQuest(id);
    }

    const handleCheckQuest = (id: number, currentState: boolean) => {
        checkQuest({ id, is_complete: !currentState });
    }

    return (
        <div>
            {/* Create Quest Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
                <DialogContent showCloseButton={false} className="sm:max-w-[425px] !p-4 border-4 border-black">
                    <DialogHeader>
                        <DialogTitle>Create New Quest</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <label htmlFor="title" className="text-right text-sm font-medium">
                                Title
                            </label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter quest title"
                                className="col-span-3 !pl-2"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                            <label htmlFor="description" className="text-right text-sm font-medium pt-2">
                                Description
                            </label>
                            <Textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Enter quest description"
                                className="col-span-3 !p-2"
                                rows={4}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCloseModal}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handleCreateQuest}
                            disabled={isPending}
                        >
                            {isPending ? "Creating..." : "Create Quest"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div className="w-60 h-110 bg-gray-200 border-6 border-black rounded-4xl flex flex-col gap-3 p-3">
                {/* Quest items */}
                <div className="flex flex-col gap-3 flex-1">
                    {visibleItems.map((quest) => {
                        const isChecked = quest.is_completed;
                        return (
                            <div
                                key={quest.id}
                                className="flex justify-start items-center w-53 h-13 !m-2 !mb-0 bg-white rounded-xl hover:bg-gray-400 cursor-pointer"
                            >
                                <Checkbox
                                    className="!ml-2"
                                    checked={isChecked}
                                    onCheckedChange={() => handleCheckQuest(quest.id, isChecked)} />
                                <h3 className="font-semibold !ml-2">{quest.title}</h3>
                                <Trash2 className="!ml-auto !mr-2 hover:text-red-500 cursor-pointer" onClick={() => handleDeleteQuest(quest.id)} />
                            </div>
                        );
                    })}
                    {visibleItems.length < ITEMS_PER_PAGE && (
                        <div className="flex justify-center items-center">
                            <Plus className="!mt-2 border-2 border-black rounded-full cursor-pointer" onClick={handleOpenModal}></Plus>
                        </div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex justify-center item items-center !mb-2">
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
        </div >
    );
};
