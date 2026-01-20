package main

import (
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
  	"gorm.io/gorm"
	"github.com/rs/cors"
	"os"

	"backend/internal/quest"
	"backend/internal/model"
	"backend/internal/repo"
)

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
	log.Printf("Database URL: %s", config)

	// Initialize database connection
	db, err := gorm.Open(postgres.Open(config), &gorm.Config{})
  	if err != nil {
    	panic("failed to connect database")
  	}
	log.Println("Database connected successfully")

	// Migrate the schema
	db.AutoMigrate(&model.Quest{})

	// API routes
	questRepo := repo.NewQuestRepository(db)
	questHandler := &quest.Handler{Repo: questRepo}

	// Declare rounter
	r := mux.NewRouter()

	// Configure CORS
    corsHandler := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173", "https://localhost:8080"},
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"*"},
        AllowCredentials: true,
    }).Handler(r)

	// Handler http API
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
    w.Write([]byte("Backend is running..."))
	}).Methods("GET")

	r.HandleFunc("/quests", questHandler.GetAllQuests).Methods("GET")
	r.HandleFunc("/quest", questHandler.CreateQuest).Methods("POST")

	// Start server
	log.Println("Server starting on :8080")
	if err := http.ListenAndServe(":8080", corsHandler); err != nil {
		log.Fatal(err)
	}
}
