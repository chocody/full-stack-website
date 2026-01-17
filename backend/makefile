# Variables
BINARY_NAME=newme-backend

## up: Start postgres in docker
.PHONY: up
up:
	docker compose up

## down: Stop postgres in docker
.PHONY: down
down:
	docker compose down

## run: Run the API server
.PHONY: run
run:
	go run cmd/api/main.go

## mock: Insert mock data into the database
.PHONY: mock
mock:
	go run script/seed.go

## dev: Start database and then run the app
.PHONY: dev
dev: up
	@echo "Starting application..."
	docker compose up -d
	go run cmd/api/main.go

## clean-db: Reset everything (Deletes all data)
.PHONY: clean-db
clean-db:
	docker compose down -v
	docker compose up -d
	@echo "Database is fresh and empty."
