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
	r.DB.Order("id ASC").Find(&quests)
	return quests, nil
}

func (r *QuestRepository) CreateQuest(quest *model.Quest) error {
	return r.DB.Create(quest).Error
}

func (r *QuestRepository) DeleteQuest(id int) error {
	return r.DB.Where(id).Delete(&Quest{}).Error
}

func (r *QuestRepository) CheckedQuest(id int, IsComplete bool) error {
	return r.DB.Model(&Quest{}).Where("id = ?", id).Update("is_completed", IsComplete).Error
}
