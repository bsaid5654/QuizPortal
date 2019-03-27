package main

import (
	"github.com/gin-gonic/gin"
)

type forCheckMyQuiz struct {
	Email  string
	QuizID uint
}

//GenreLB is fir lGenreLeaderBoard()
type GenreLB struct {
	Score    int `json:"score"`
	UserMail string
}

//SubmitScore is for submitting score
func SubmitScore(c *gin.Context) {
	var params Score
	c.BindJSON(&params)
	db.Create(&params)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, "done")
	return
}

//MyQuiz is for users attempted Quizzes
func MyQuiz(c *gin.Context) {
	Email := c.Params.ByName("Email")
	var scores []Score
	db.Where("user_mail = ?", Email).Find(&scores)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, scores)
}

//CheckMyQuiz whether the person has answered the quiz or not
func CheckMyQuiz(c *gin.Context) {
	var params Score
	response := false
	Email := c.Params.ByName("Email")
	QuizID := c.Params.ByName("id")
	Err := db.Where("quiz_name = ? and user_mail = ?", QuizID, Email).First(&params).Error
	if Err == nil {
		response = true
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
}

//GenreLeaderBoard is for displaying total score of all in each genre
func GenreLeaderBoard(c *gin.Context) {
	var params []GenreLB
	GenreID := c.Params.ByName("ID")
	db.Table("scores").Select("SUM(score) as score,user_mail").Where("genre_id=?", GenreID).Group("user_mail").Find(&params)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, params)
}

//LeaderBoard is for LeaderBoard
func LeaderBoard(c *gin.Context) {
	var params []GenreLB
	db.Table("scores").Select("SUM(score) as score,user_mail").Group("user_mail").Find(&params)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, params)

}
