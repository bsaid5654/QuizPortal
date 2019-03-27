package main

import (
	"github.com/gin-gonic/gin"
)

//CreateGenre will create Genres and only accessible by admins
func CreateGenre(c *gin.Context) {
	var params Genre
	c.BindJSON(&params)
	response := ""
	if err != nil {
		response := err
		c.JSON(200, response)
		return
	}
	if params.Name == "" {
		response = "Fill Genre"
	} else {
		check := db.Where("Name=?", params.Name).First(&params).Error
		if check != nil {
			error := db.Create(&params).Error
			if error == nil {
				response = "Created Genre"
			} else {
				response = "Couldn't Create Genre"
			}
		} else {
			response = "Genre Already Present"
		}
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
	return
}

//ShowGenres sends all Genres
func ShowGenres(c *gin.Context) {
	var params []Genre
	if Err := db.Find(&params).Error; Err == nil {
		c.Header("access-control-allow-origin", "*")
		c.JSON(200, params)
	}
	return
}

//ShowGenre Shows the required Genre
func ShowGenre(c *gin.Context) {
	var Req Genre
	GenreID := c.Params.ByName("id")
	db.Where("id = ?", GenreID).First(&Req)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, Req)
}

//EditGenres is for Editing Genres
func EditGenres(c *gin.Context) {
	var params Genre
	GenreID := c.Params.ByName("id")
	var genre Genre
	c.BindJSON(&params)
	response := ""
	check := db.Where("name = ?", params.Name).First(&genre).Error
	if check != nil {
		UErr := db.Model(&Genre{}).Where("id = ?", GenreID).Update("name", params.Name).Error
		if UErr == nil {
			response = "Edited Successfully"
		} else {
			response = "Couldnot Edit"
		}
	} else {
		response = "Already present"
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)

}
