// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  let submittedData = '';
  const handleSubmit = (data) => submittedData = data;
  // accepts the data and assigns submittedData to the data that was submitted
  
  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByLabelText('Username')
  const password = screen.getByLabelText('Password')
  userEvent.type(username, 'user')
  userEvent.type(password, 'verysecure')
  const submitButton = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitButton)

  expect(submittedData).toEqual({
    username: 'user',
    password: 'verysecure',
  })

  // 🐨 render the login with your handleSubmit function as the onSubmit prop
  //
  // 🐨 get the username and password fields via `getByLabelText`
  // 🐨 use userEvent.type to change the username and password fields to
  //    whatever you want
  //
  // 🐨 click on the button with the text "Submit"
  //
  // assert that submittedData is correct
  // 💰 use `toEqual` from Jest: 📜 https://jestjs.io/docs/en/expect#toequalvalue
})

/*
eslint
  no-unused-vars: "off",
*/
