package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/vaishnavnamboodirim/student-app-api/backend/helper"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/vaishnavnamboodirim/student-app-api/backend/models"
)

var collection = helper.ConnectDB()

func getStudents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// we created Book array
	var students []models.Student

	// bson.M{},  we passed empty filter. So we want to get all data.
	cur, err := collection.Find(context.TODO(), bson.M{})

	if err != nil {
		helper.GetError(err, w)
		return
	}

	// Close the cursor once finished
	/*A defer statement defers the execution of a function until the surrounding function returns.
	simply, run cur.Close() process but after cur.Next() finished.*/
	defer cur.Close(context.TODO())

	for cur.Next(context.TODO()) {

		// create a value into which the single document can be decoded
		var student models.Student
		// & character returns the memory address of the following variable.
		err := cur.Decode(&student) // decode similar to deserialize process.
		if err != nil {
			log.Fatal(err)
		}

		// add item our array
		students = append(students, student)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	json.NewEncoder(w).Encode(students) // encode similar to serialize process.
}

func getStudent(w http.ResponseWriter, r *http.Request) {
	// set header.
	w.Header().Set("Content-Type", "application/json")

	var student models.Student
	// we get params with mux.
	var params = mux.Vars(r)

	// string to primitive.ObjectID
	id, _ := primitive.ObjectIDFromHex(params["id"])

	// We create filter. If it is unnecessary to sort data for you, you can use bson.M{}
	filter := bson.M{"_id": id}
	err := collection.FindOne(context.TODO(), filter).Decode(&student)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	json.NewEncoder(w).Encode(student)
}

func createStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var student models.Student

	// we decode our body request params
	_ = json.NewDecoder(r.Body).Decode(&student)

	// insert our book model.
	result, err := collection.InsertOne(context.TODO(), student)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	json.NewEncoder(w).Encode(result)
}

func updateStudent(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var params = mux.Vars(r)

	//Get id from parameters
	id, _ := primitive.ObjectIDFromHex(params["id"])

	var student models.Student

	// Create filter
	filter := bson.M{"_id": id}

	// Read update model from body request
	_ = json.NewDecoder(r.Body).Decode(&student)

	// prepare update model.
	update := bson.D{
		{"$set", bson.D{
			{"name", student.Name},
			{"myclass", student.MyClass},
			{"marks", student.Marks},
			{"rollno", student.RollNo},
		}},
	}

	err := collection.FindOneAndUpdate(context.TODO(), filter, update).Decode(&student)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	student.ID = id

	json.NewEncoder(w).Encode(student)
}

func deleteStudent(w http.ResponseWriter, r *http.Request) {
	// Set header
	w.Header().Set("Content-Type", "application/json")

	// get params
	var params = mux.Vars(r)

	// string to primitve.ObjectID
	id, err := primitive.ObjectIDFromHex(params["id"])

	// prepare filter.
	filter := bson.M{"_id": id}

	deleteResult, err := collection.DeleteOne(context.TODO(), filter)

	if err != nil {
		helper.GetError(err, w)
		return
	}

	json.NewEncoder(w).Encode(deleteResult)
}

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/students", getStudents).Methods("GET")
	r.HandleFunc("/api/students/{id}", getStudent).Methods("GET")
	r.HandleFunc("/api/students", createStudent).Methods("POST")
	r.HandleFunc("/api/students/{id}", updateStudent).Methods("PUT")
	r.HandleFunc("/api/students/{id}", deleteStudent).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8000", r))
}
