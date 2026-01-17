package main

import (
	"backend/internal/model"
	"github.com/joho/godotenv"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Define a wrapper that matches your JSON structure
type QuestContainer struct {
	Quests []model.Quest `json:"quests"`
}

func main() {
	// Load environment variables from .env file
	err := godotenv.Load()
  	if err != nil {
    	log.Fatal("Error loading .env file")
  	}

	// Get database configuration from environment variable
	config := os.Getenv("DB_URL")
	if config == "" {
		log.Fatal("DB_URL environment variable not set")
	}

	// Initialize database connection
	db, err := gorm.Open(postgres.Open(config), &gorm.Config{})
  	if err != nil {
    	panic("failed to connect database")
  	}

	// CLEAR: Drop the table and recreate it fresh
	log.Println("Dropping old table and clearing data...")

	// Drop old table
	db.Migrator().DropTable(&model.Quest{})

	// Create new table
	db.AutoMigrate(&model.Quest{})

	// 1. Read the JSON file
	jsonFile, err := os.Open("mock-data/quests.json")
	if err != nil {
		log.Fatal(err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)

	// 2. Unmarshal into the wrapper struct
	var container QuestContainer
	if err := json.Unmarshal(byteValue, &container); err != nil {
		log.Fatal("Error parsing JSON:", err)
	}

	// 3. Seeding data into the database
	log.Println("Seeding data...")
	if err := db.Create(&container.Quests).Error; err != nil {
		log.Fatal(err)
	}

	// Count mock data
	var finalCount int64
	db.Model(&model.Quest{}).Count(&finalCount)

	// Use Printf for formatting variables
	log.Printf("Successfully seeded %v quests!", finalCount)
}
