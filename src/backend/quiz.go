package main

import (
	"strconv"

	"github.com/gin-gonic/gin"
)

//forCreateQuiz is to take response from frontend
type forCreateQuiz struct {
	QuizName string
}

type forShowQuizzes struct {
	Quizzes  []Quiz
	Response string
}

type forShowQuiz struct {
	Q    Quiz
	Ques []Question
}

//CreateQuiz is used for Creating Quizes
func CreateQuiz(c *gin.Context) {
	var params forCreateQuiz
	GenreID := c.Params.ByName("id")
	response := ""
	c.BindJSON(&params)
	if params.QuizName == "" {
		response = "FillAll"
	} else {
		Genreid, Error := strconv.Atoi(GenreID)
		if Error == nil {
			var quiz Quiz
			check := db.Where("name = ? AND genre_id = ?", params.QuizName, Genreid).First(&quiz).Error
			if check != nil {
				var CQuiz Quiz
				CQuiz.Name = params.QuizName
				CQuiz.GenreID = uint(Genreid)
				db.Create(&CQuiz)
				response = "Created"
			} else {
				response = "Already Present"
			}
		} else {
			response = "Not able to Create"
		}
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
	return
}

//ShowQuizzes is for displaying all quiz names
func ShowQuizzes(c *gin.Context) {
	var Req forShowQuizzes
	GenreID := c.Params.ByName("id")
	response := ""
	check := db.Where("genre_id = ?", GenreID).Find(&Req.Quizzes).Error
	if check == nil {
		response = "Good"
	} else {
		response = "Quizes Not Present"
	}
	Req.Response = response
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, Req)
}

//ShowQuiz Shows the required Quiz
func ShowQuiz(c *gin.Context) {
	var Req forShowQuiz
	QuizID := c.Params.ByName("id")
	db.Where("id = ?", QuizID).Find(&Req.Q)
	db.Where("quiz_id = ?", QuizID).Find(&Req.Ques)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, Req)
}

//DeleteQuiz id for deleting quiz
func DeleteQuiz(c *gin.Context) {
	QuizID := c.Params.ByName("id")
	response := ""
	Error := db.Where("id = ?", QuizID).Delete(Quiz{}).Error
	db.Where("quiz_id = ?", QuizID).Delete(Question{})
	if Error != nil {
		response = "Does Not Exist"
	} else {
		response = "Delete Successfully"
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
}

//EditQuiz is for editing quiz
func EditQuiz(c *gin.Context) {
	QuizID := c.Params.ByName("id")
	var params Quiz
	var quiz Quiz
	c.BindJSON(&params)
	response := ""
	check := db.Where("name = ?", params.Name).First(&quiz).Error
	if check != nil {
		UErr := db.Model(&Quiz{}).Where("id = ?", QuizID).Update("name", params.Name).Error
		if UErr == nil {
			response = "Edited Successfully"
		} else {
			response = "Couldnot Edit"
		}
	} else {
		response = "Already Present"
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
}
