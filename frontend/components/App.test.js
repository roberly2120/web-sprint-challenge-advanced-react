// Write your tests here
import { render, screen, fireEvent, waitFor} from "@testing-library/react"
import React from "react"
import AppFunctional from './AppFunctional'
import AppClass from "./AppClass"
import '@testing-library/jest-dom/extend-expect'
import userEvent from "@testing-library/user-event"


test('sanity', () => {
  expect(true).toBe(true)
})

test('number of moves is visible', async () => {
  render(<AppFunctional />)
  const moves = screen.getByText(/you moved/i)
  expect(moves).toBeVisible();
})
test('email input accepts text input', async () => {
  render(<AppFunctional />)
  const emailInput = screen.getByPlaceholderText('type email');
  fireEvent.change(emailInput, {target: {value: 'email@email.com'}});
  userEvent.type(emailInput, 'email@email.com')
})
test('coordinates is visible', () => {
  render(<AppClass />)
  const coordinates = screen.getByText(/coordinates/i);
  expect(coordinates).toBeVisible();
})
test('arrows are visible', () => {
  render(<AppFunctional />)
  const up = screen.getByText('UP');
  const down = screen.getByText('DOWN')
  const left = screen.getByText('LEFT')
  const right =screen.getByText('RIGHT')
  expect(up).toBeVisible();
  expect(down).toBeVisible();
  expect(left).toBeVisible();
  expect(right).toBeVisible();
})
test('submit button is visible on screen', () => {
  render(<AppClass />);
  const button = screen.getByTestId(/submit/i);
  expect(button).toBeInTheDocument();
})