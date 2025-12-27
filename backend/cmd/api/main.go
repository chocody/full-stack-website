package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/mux"
)

func getAllQuests (w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Get all quests")
}

func main() {

	r := mux.NewRouter()
    r.HandleFunc("/quests", getAllQuests).Methods("GET")
    http.Handle("/", r)
	
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatalf("Could not start server: %s\n", err.Error())
	}
}