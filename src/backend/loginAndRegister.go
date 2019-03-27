package main

import (
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
)

//forLogin is for login
type forLogin struct {
	Email    string
	Password string
}

//forLoginResponse is for login
type forLoginResponse struct {
	gorm.Model
	Err   string
	Check uint
	Email string
}

//forRegisterResponse is response for Register
type forRegisterResponse struct {
	gorm.Model
	Err   string
	Check uint
}

//HashPassword is hashing
func HashPassword(p string) (string, error) {
	Hashed, Error := bcrypt.GenerateFromPassword([]byte(p), 14)
	return string(Hashed), Error
}

//CheckPasswordHash is checking
func CheckPasswordHash(p, hash string) bool {
	Err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(p))
	return Err == nil
}

//LoginHandler has somework
func LoginHandler(c *gin.Context) {
	var params forLogin
	c.BindJSON(&params)
	Password := params.Password
	Email := params.Email
	var response forLoginResponse
	var user User
	if Password == "" || Email == "" {
		response.Check = 0
		response.Err = "Fill All"
	} else {
		check := db.Where("Email=?", Email).First(&user).Error
		if check == nil {
			if CheckPasswordHash(Password, user.Password) {
				response.Check = 1
				response.Err = "Logged In"
				response.Email = Email
			} else {
				response.Check = 0
				response.Err = "Invalid Credentials"
			}
		} else {
			response.Check = 0
			response.Err = "Invalid Credentials"
		}
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)

}

//RegisterHandler has somework
func RegisterHandler(c *gin.Context) {
	var params User
	c.BindJSON(&params)
	var response forRegisterResponse
	Name := params.Name
	Password, _ := HashPassword(params.Password)
	Email := params.Email
	if Name == "" || Password == "" || Email == "" {
		response.Check = 0
		response.Err = "Fill All"
	} else {
		var user User
		check := db.Where("Email = ?", Email).First(&user).Error
		if check != nil {
			user.Name = Name
			user.Email = Email
			user.Password = Password
			db.Create(&user)
			response.Check = 1
			response.Err = "Registered successfully"
		} else {
			response.Err = "Email already Present"
			response.Check = 0
		}
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)
}

//ShowUsers is for Viewing all users
func ShowUsers(c *gin.Context) {
	var Users []User
	db.Find(&Users)
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, Users)
	return
}

//DeleteUser is for deleting user
func DeleteUser(c *gin.Context) {
	ID := c.Params.ByName("id")
	response := ""
	var user User
	var Check User
	Error := db.Where("id = ?", ID).First(&Check).Error
	if Error != nil {
		response = "Does Not Exist"
	} else {
		db.Where("id = ?", ID).Delete(&user)
		db.Where("user_mail = ?", Check.Email).Delete(&Score{})
		response = "Delete Successfully"
	}
	c.Header("access-control-allow-origin", "*")
	c.JSON(200, response)

}
