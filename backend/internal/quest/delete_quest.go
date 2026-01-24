package quest

import (
	response "backend/internal/types"
	"net/http"
	"strconv"
)

func (h *Handler) DeleteQuest(w http.ResponseWriter, r *http.Request) {
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
	err = h.Repo.DeleteQuest(idInt)
	if err != nil {
		response.Error(w, http.StatusInternalServerError, "Failed to delete quest")
		return
	}

	response.Success(w, http.StatusCreated, "Quest deleted successfully", nil)
}
