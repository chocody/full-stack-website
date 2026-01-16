package quest

import (
	"encoding/json"
	"net/http"
	"backend/internal/model"
	response "backend/internal/types"
)

func (h *Handler) CreateQuest(w http.ResponseWriter, r *http.Request) {
	var quest model.Quest
	err := json.NewDecoder(r.Body).Decode(&quest)
	if err != nil {
		response.Error(w, http.StatusBadRequest, err.Error())
		return
	}

	err = h.Repo.CreateQuest(&quest)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Failed to create quest")
		return
	}

	response.Success(w, http.StatusCreated, "Quest created successfully", quest)
}