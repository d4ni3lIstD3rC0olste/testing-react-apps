// testing with context and a custom render method
// http://localhost:3000/easy-button

import * as React from 'react'
import {screen} from '@testing-library/react'
import {render} from 'test/test-utils'
import EasyButton from '../../components/easy-button'

const renderEasyButton = (theme) => {
  render(<EasyButton>Easy</EasyButton>, {theme: theme})
}

test('renders with the light styles for the light theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  renderEasyButton("light");
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: white;
    color: black;
  `)
})

test('renders with the light styles for the dark theme', () => {
  // 🐨 uncomment all of this code and your test will be busted on the next line:
  renderEasyButton("dark");
  const button = screen.getByRole('button', {name: /easy/i})
  expect(button).toHaveStyle(`
    background-color: black;
    color: white;
  `)
})

/* eslint no-unused-vars:0 */
