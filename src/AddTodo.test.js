import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);

  //editing task name
  var inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(inputTask, {target:{value:"Duplicate item"}});

  //change date so that date isn't invalid
  var inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "01/01/2023"}});

  //firing button
  var element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  //repeat above tasks 
  //editing task name
  inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(inputTask, {target:{value:"Duplicate item"}});

  //change date so that date isn't invalid
  inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "01/01/2023"}});

  //firing button
  element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  const check = screen.getAllByText(/Duplicate item/i);
  expect(check.length).toBe(1);

 });



 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);

  //no task name

  //change date so that date isn't invalid
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  fireEvent.change(inputDate, { target: { value: "01/01/2023"}});
  
  //firing button
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  var check;
  try{
    check = screen.getByRole("checkbox");
  }catch{
    check = null;
  }
  expect(check).toBe(null);
 });



 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);

  //editing task name
  var inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  fireEvent.change(inputTask, {target:{value:"Item"}});

  //Invalid due date

  //firing button
  var element = screen.getByRole('button', {name: /Add/i});
  fireEvent.click(element);

  var check;
  try{
    check = screen.getByRole("checkbox");
  }catch{
    check = null;
  }
  expect(check).toBe(null);

 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
 });
