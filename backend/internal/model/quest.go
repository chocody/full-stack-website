package model

import "time"

type Quest struct {
	ID    uint `json:"id" gorm:"autoIncrement;primaryKey"`
	Title string `json:"title"`
	Description string `json:"description"`
	IsCompleted bool   `json:"is_completed"`
	CreatedAt  time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}
