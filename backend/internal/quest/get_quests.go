package quest

import (
	"net/http"
	response "backend/internal/types"
)

func (h *Handler) GetAllQuests(w http.ResponseWriter, r *http.Request) {
	quests, err := h.Repo.GetAllQuests()
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Failed to get quests")
	}

	response.Success(w, http.StatusOK, "Get quests successfully", quests)
}