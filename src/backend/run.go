package main

//importing modules
import (
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // If you want to use mysql or any other db, replace this line
)

// declaring the db globally
var db *gorm.DB
var err error

//User is For User
type User struct {
	gorm.Model
	Name     string `json:"Name"`
	Email    string `json:"Email"`
	Password string `json:"Password"`
}

//Genre is For User
type Genre struct {
	gorm.Model
	Name string `json:"Name"`
}

//Quiz is For User
type Quiz struct {
	gorm.Model
	//Genre   Genre `gorm:"foreignkey:GenreID;association_foreignkey:ID"`
	GenreID uint   `json:"GenreID"`
	Name    string `json:"Name"`
}

//Question is for Questions
type Question struct {
	gorm.Model
	//Quiz     Quiz   `gorm:"foreignkey:QuizID;association_foreignkey:ID"`
	QuizID   uint   `json:"QuizID"`
	Type     bool   `json:"Type"`
	Image    string `json:"Image"`
	Audio    string `json:"Audio"`
	Question string `json:"Question"`
	OptionA  string `json:"OptionA"`
	OptionB  string `json:"OptionB"`
	OptionC  string `json:"OptionC"`
	OptionD  string `json:"OptionD"`
	A        bool   `json:"A"`
	B        bool   `json:"B"`
	C        bool   `json:"C"`
	D        bool   `json:"D"`
}

//Score is for QuizScores
type Score struct {
	gorm.Model
	QuizName string `json:"QuizName"`
	Score    int    `json:"Score"`
	GenreID  uint   `json:"GenreID"`
	UserMail string `json:"UserMail"`
}

func main() {

	db, err = gorm.Open("sqlite3", "./gorm.db")
	if err != nil {
		fmt.Println(err)
	}

	if (!db.HasTable(&Genre{})) {
		db.CreateTable(&Genre{})
	}

	if (!db.HasTable(&Quiz{})) {
		db.CreateTable(&Quiz{})
	}

	if (!db.HasTable(&Question{})) {
		db.CreateTable(&Question{})
	}

	if (!db.HasTable(&User{})) {
		db.CreateTable(&User{})
	}

	if (!db.HasTable(&Score{})) {
		db.CreateTable(&Score{})
	}

	defer db.Close()
	r := gin.Default()
	r.POST("/Login", LoginHandler)
	r.POST("/Register", RegisterHandler)
	r.POST("/CreateGenre", CreateGenre)
	r.POST("/CreateQuiz/:id", CreateQuiz)
	r.POST("/SubmitScore", SubmitScore)
	r.POST("/AddQuestion", AddQuestion)
	r.GET("/ShowGenres", ShowGenres)
	r.GET("/ShowGenre/:id", ShowGenre)
	r.GET("/ShowQuestion/:id", ShowQuestion)
	r.GET("/ShowQuizzes/:id", ShowQuizzes)
	r.GET("/ShowQuiz/:id", ShowQuiz)
	r.GET("/CheckMyQuiz/:id/:Email", CheckMyQuiz)
	r.GET("/ViewUsers", ShowUsers)
	r.GET("/MyQuiz/:Email", MyQuiz)
	r.GET("/GenreLeaderBoard/:ID", GenreLeaderBoard)
	r.GET("/LeaderBoard", LeaderBoard)
	r.DELETE("/DeleteUser/:id", DeleteUser)
	r.DELETE("/DeleteQuiz/:id", DeleteQuiz)
	r.DELETE("/DeleteQuestion/:id", DeleteQuestion)
	r.PUT("/EditQuiz/:id", EditQuiz)
	r.PUT("/EditGenre/:id", EditGenres)
	r.PUT("/EditQuestion/:id", EditQuestion)

	r.Use((cors.Default()))
	r.Run(":8001") // Run on port 8080

}
