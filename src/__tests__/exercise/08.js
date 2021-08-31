// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
const results = {}
function TestComponent(props = {}) {
  Object.assign(results, useCounter(props))
  return null
}

const setup = (props) => {
  render(<TestComponent {...props}/>)
}

test('exposes the count and increment/decrement functions', () => {
  setup()

  expect(results.count).toBe(0)

  act(() => {
    results.increment()
  })

  expect(results.count).toBe(1)

  act(() => {
    results.decrement()
  })
  
  expect(results.count).toBe(0)
})

test('allows customization of the initial count', () => {
  setup({initialCount: 2})

  expect(results.count).toBe(2)
})

test('allows customization of the step', () => {
  setup({
    initialCount: 2, 
    step: 2,
  })

  expect(results.count).toBe(2)

  act(() => {
    results.increment()
  })

  expect(results.count).toBe(4)

  act(() => {
    results.decrement()
  })
  
  expect(results.count).toBe(2)
})
/* eslint no-unused-vars:0 */
