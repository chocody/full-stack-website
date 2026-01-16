package types

import (
	"encoding/json"
	"net/http"
)

type ApiResponse struct {
	Status  int         `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"response"`
}

func Success(w http.ResponseWriter, statusCode int, message string, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	response := ApiResponse{
		Status:  statusCode,
		Message: message,
		Data:    data,
	}
	json.NewEncoder(w).Encode(response)
}

func Error(w http.ResponseWriter, statusCode int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(statusCode)
	response := ApiResponse{
		Status:  statusCode,
		Message: message,
		Data:    nil,
	}
	json.NewEncoder(w).Encode(response)
}