// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'
import {build, fake} from '@jackfranklin/test-data-bot'

test('submitting the form calls onSubmit with username and password', () => {
  const userBuilder = build({
    fields: {
      username: fake(faker => faker.internet.userName()),
      password: fake(faker => faker.internet.password()),
    },
  });
  // 🐨 create a variable called "submittedData" and a handleSubmit function that
  const handleSubmit = jest.fn();
  // accepts the data and assigns submittedData to the data that was submitted
  
  render(<Login onSubmit={handleSubmit} />)
  const usernameInput = screen.getByLabelText('Username')
  const passwordInput = screen.getByLabelText('Password')
  const {username, password} = userBuilder({password: 'abc'})
  userEvent.type(usernameInput, username)
  userEvent.type(passwordInput, password)
  const submitButton = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledWith({
    username: username,
    password: password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
