# Terminal CRM
This is a General Assembly lab assignment for our Intro to Mongoose lesson.

<img width="569" alt="terminal-crm-screenshot" src="https://github.com/user-attachments/assets/1ee38fa2-d20c-4af1-9a0b-0f35c6bce8a4" />

#### Objective
Create a Customer Relationship Management (CRM) tool for the terminal. This will be an application that allows a company to keep track of their customers. In this lab. you’re going to create a terminal-based CRM application that will have full CRUD functionality on a single model: Customer.

## Tech Stack
- JavaScript
- Node.js
  - mongoose
  - dotenv
  - prompt-sync-plus
- Express.js
- MongoDB

## Requirements
### Define a model
1. Create a new model file and build the customer schema. The customer model will have the following fields:
    - name: String
    - age: Number

### Develop the user interface
1. Display a welcome message to the user.
2. Implement a simple menu system that lets the user choose an action (Create, View, Update, Delete, Quit). Use prompt-sync to get the user’s choice and handle it accordingly.
3. When figuring out what the user wants to do, it’s probably easiest to prompt them to choose from various options in a numbered list. This way, the user just enters a number and the application knows what to do next.
4. When dealing with choosing a specific customer to update or delete, it’s probably easiest to list the customers in the database along with their ids. Then prompt the user to enter id of the user that needs to be updated/deleted.

### Sample exchanges
#### Starting the application
```
Welcome to the CRM

What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. quit

Number of action to run: 
# user inputs 3
```
#### Updating a customer
```
Below is a list of customers: 

id: 658226acdcbecfe9b99d5421 --  Name: Matt, Age: 43
id: 65825d1ead6cd90c5c430e24 --  Name: Vivienne, Age: 6

Copy and paste the id of the customer you would like to update here: 
# user inputs 658226acdcbecfe9b99d5421

What is the customers new name?
# user inputs Bilbo
What is the customers new age?
# user inputs 50
```
#### Choosing next action
```
What would you like to do?

  1. Create a customer
  2. View all customers
  3. Update a customer
  4. Delete a customer
  5. Quit

Number of action to run: 
# user inputs 2
```
#### Viewing updated customers
```
id: 658226acdcbecfe9b99d5421 --  Name: Bilbo, Age: 50
id: 65825d1ead6cd90c5c430e24 --  Name: Vivienne, Age: 6
```
#### Exiting the Application
```
exiting...
```
When you run your CRM application using `node app.js`, it starts an active session. For the application to exit cleanly, it is essential to close the MongoDB connection. This prevents potential issues like memory leaks or hanging processes.

When the exit condition is met (e.g., the user selects ‘Quit’), call `mongoose.connection.close()` in `app.js`. This command safely closes the connection to your MongoDB database.
