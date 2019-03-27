package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

//AddQuestion adds Question to a quiz
func AddQuestion(c *gin.Context) {
	var Req Question
	var check Quiz
	response := ""
	Error := c.BindJSON(&Req)
	if Error != nil {
		fmt.Println(Error)
		return
	}
	Error = db.Where("id = ?", Req.QuizID).First(&check).Error
	if Error == nil {
		db.Create(&Req)
		response = "Created"
	} else {
		response = "CouldNot Create Question"
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
}

//DeleteQuestion is for delete question
func DeleteQuestion(c *gin.Context) {
	ID := c.Params.ByName("id")
	Error := db.Where("id = ?", ID).Delete(Question{}).Error
	response := ""
	if Error == nil {
		response = "Deleted"
	} else {
		response = "Error In Deleting"
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
	return
}

//ShowQuestion is for Displaying Question
func ShowQuestion(c *gin.Context) {
	ID := c.Params.ByName("id")
	var params Question
	db.Where("id = ?", ID).First(&params)
	fmt.Println(params)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, params)
}

//EditQuestion for Editing Question
func EditQuestion(c *gin.Context) {
	ID := c.Params.ByName("id")
	var params Question
	response := ""
	UErr := db.Where("id = ?", ID).First(&params).Error
	fmt.Println(params)
	if UErr == nil {
		c.BindJSON(&params)
		db.Save(&params)
		response = "Edited"
	} else {
		response = "Not Edited"
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
	return
}
