package repo

import (
	"backend/internal/model"
	"gorm.io/gorm"
)

type Quest = model.Quest

type QuestRepository struct {
	DB *gorm.DB
}

func NewQuestRepository(db *gorm.DB) *QuestRepository {
	return &QuestRepository{DB: db}
}

func (r *QuestRepository) GetAllQuests() ([]Quest, error) {
	var quests []Quest
	r.DB.Find(&quests)
	return quests, nil
}

func (r *QuestRepository) CreateQuest(quest *model.Quest) error {
	return r.DB.Create(quest).Error
}
