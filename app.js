import dotenv from "dotenv";
dotenv.config();
import psp from "prompt-sync-plus";
const prompt = psp();
import mongoose from "mongoose";
import Customer from "./models/customer.js";

const menu = async () => {
  const input = prompt(`
    What would you like to do?

    1. Create a customer
    2. View all customers
    3. Update a customer
    4. Delete a customer
    5. Quit

    Enter the # of action to run: `);
    
  switch (input) {
    case "1":
      await createCustomer();
      menu();
      break;
    case "2":
      await viewCustomers();
      menu();
      break;
    case "3":
      await updateCustomer();
      menu();
      break;
    case "4":
      await deleteCustomer();
      menu();
      break;
    case "5":
      console.log(`
        Exiting...`
      );
      await mongoose.connection.close()
      break;
    default:
      console.log(`
        Not a valid option. Choose a # between 1-5.`
      );
      menu();
  }
};

const createCustomer = async () => {
  const newUserInput = prompt(`
    Enter a new customer's NAME and AGE separated by a comma (e.g. "Jane, 25"): `
  );
  let [name, age] = newUserInput.split(",");
  age = parseInt(age);
  try {
    const newCustomer = await Customer.create({ name: name, age: age });
    console.log(`
      A new customer has been added.
      Name: ${newCustomer.name}
      Age: ${newCustomer.age}`
    );
  } catch (error) {
    console.log(`
      Something went wrong with trying to add a new customer. Check to make sure your value types are correct.
      -- NAME (string), AGE (number) i.e "John, 40"`)
  }
};

const viewCustomers = async () => {
  const customers = await Customer.find();
  if (customers.length === 0) {
    console.log(`
      There are currently no customers. You can add a customer by creating one.`
    );
    return;
  }
  console.log(`
    Viewing All Customers (${customers.length})`
  );
  customers.forEach((customer) =>
    console.log(`
      id: ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  );
};

const updateCustomer = async () => {
  const customer = await getCustomerById();
  if (!customer) return;

  const updateNameInput = prompt(`
    Would you like to update ${customer.name}'s NAME? (Y/N): `
  );
  if (updateNameInput.toLowerCase() === "y") {
    const newName = prompt(`
      Enter the customer's new NAME: `);
    const newCustomerName = await Customer.findByIdAndUpdate(
      customer.id,
      { name: newName },
      { new: true }
    );
    console.log(`
      Successfully updated id: ${newCustomerName.id} -- Name: ${newCustomerName.name}, Age: ${newCustomerName.age}`
    );
  }
  const updateAgeInput = prompt(`
    Would you like to update ${customer.name}'s AGE? (Y/N): `
  );
  if (updateAgeInput.toLowerCase() === "y") {
    const newAge = prompt(`
      Enter the customer's new AGE: `);
    const newCustomerAge = await Customer.findByIdAndUpdate(
      customer.id,
      { age: newAge },
      { new: true }
    );
    console.log(`
      Successfully updated id: ${newCustomerAge.id} -- Name: ${newCustomerAge.name}, Age: ${newCustomerAge.age}`
    );
  }
};

const deleteCustomer = async () => {
  const customer = await getCustomerById();
  if (!customer) return;

  const confirmDelete = prompt(`
    Are you sure you want to delete ${customer.name}? You can't undo this. (Y/N): `
  );
  if (confirmDelete.toLowerCase() === "y") {
    const confirmName = prompt(`
      To delete ${customer.name}, enter the word "DELETE": `
    );
    if (confirmName.toLowerCase() === "delete") {
      await customer.deleteOne();
      console.log(`
        Successfully deleted.`);
    } else {
      console.log(`
        Delete unsuccessful. Returning to Main Menu.`);
    }
  } else {
    console.log(`
      Delete request has been cancelled.`);
  }
};

const getCustomerById = async () => {
  await viewCustomers();
  const customerId = prompt(`
    Copy and paste the id of the customer you would like to edit here: `
  );
  if (customerId.length !== 24) {
    console.log(`
      That is not a correct customer id.`
    );
    return null;
  }
  // TODO-ST: do try..catch and return error as not found
  const customer = await Customer.findById(customerId);
  if (!customer) {
    console.log(`
      Customer with id: ${customerId} not found.`
    );
    return null;
  }
  console.log(`
    The id requested is ${customer.id} -- Name: ${customer.name}, Age: ${customer.age}`
  );
  return customer;
};

// TODO-ST: add try..catch for connection
const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`
    Welcome to the CRM.`);
  await menu();
};

connect();
