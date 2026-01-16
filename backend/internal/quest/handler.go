package quest

import (
	"backend/internal/repo"
)

type Handler struct {
	Repo *repo.QuestRepository
}