package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"
)

type User struct {
	Username string `json:"username"`
}

var userStorage = make(map[string]User)

var id int

func PrintUsernames() {
	log.Println("Lista de usernames:")
	for _, user := range userStorage {
		log.Println(user.Username)
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func PostUserHandler(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if (*r).Method == "OPTIONS" {
		return
	}

	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		//EN PRODUCCION NO SE DEBE DETENER EL SERVIDOR
		panic(err)
	}
	id++
	k := strconv.Itoa(id)
	userStorage[k] = user

	w.Header().Set("Content-Type", "application/json")
	j, err := json.Marshal(user)
	if err != nil {
		//EN PRODUCCION NO SE DEBE DETENER EL SERVIDOR
		panic(err)
	}
	w.WriteHeader(http.StatusCreated)
	PrintUsernames()
	w.Write(j)
}

func main() {
	http.HandleFunc("/api/user", PostUserHandler)

	server := http.Server{
		Addr:           ":9090",
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	log.Println("Server running on port 9090")
	log.Fatal(server.ListenAndServe())
}
