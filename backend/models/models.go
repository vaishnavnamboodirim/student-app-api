package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Student struct {
	ID      primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name    string             `json:"name,omitempty" bson:"name,omitempty"`
	MyClass string             `json:"myclass,omitempty" bson:"myclass,omitempty"`
	Marks   string             `json:"marks,omitempty" bson:"marks,omitempty"`
	RollNo  string             `json:"rollno,omitempty" bson:"rollno,omitempty"`
}
