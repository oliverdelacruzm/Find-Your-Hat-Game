# Find Your Hat Node.js Game

This short game written in JavaScript was created as a web development learning project on Codecademy.

## Game Objective

The objective of the game is for the user to drive the * symbol (pathCharacter) to the ^ symbol (hat). The "O" character represents a hole in the field, and driving the * there results in Game Over. Stepping out of the bounds of the field also results in Game Over. Neutral ground on the field is represented by "░", the "fieldCharacter". 

## Gameplay

A new instance of the Field class is created, and the user is prompted for directions to move the * symbol (i.e., up, down, left or right). The field is updated using the updateField method, which leaves a trail of the * symbol along the path taken by the user.

## The generateField static method

As part of this project, a static method was to be created where a field was created based on user-input dimensions, along with a maximum percentage threshold of the number of holes that would appear on the field. "Field.generateField(5, 5, 0.3)" means that a 5x5 2-dimensional array field is created, containing one hat, one * to start, and randomly placed holes whose count shall not exceed 30% of the field. 
