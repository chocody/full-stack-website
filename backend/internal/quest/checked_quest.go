package quest

import (
	response "backend/internal/types"
	"encoding/json"
	"net/http"
	"strconv"
)

type CheckedQuestRequest struct {
	IsComplete bool `json:"isComplete"`
}

func (h *Handler) CheckedQuest(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		response.Error(w, http.StatusBadRequest, "Missing quest ID")
		return
	}
	idInt, err := strconv.Atoi(id)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "Invalid quest ID")
		return
	}

	var req CheckedQuestRequest
	err = json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		response.Error(w, http.StatusBadRequest, "Invalid request body")
		return
	}

	err = h.Repo.CheckedQuest(idInt, req.IsComplete)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Failed to update quest status")
		return
	}

	response.Success(w, http.StatusOK, "Quest status updated successfully", nil)
}
