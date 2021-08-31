// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
function MyTestComponent() {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

test('exposes the count and increment/decrement functions', () => {
  render(<MyTestComponent />)
  
  const countDisplay = screen.getByText(/count/i)
  const incrementButton = screen.getByText(/increment/i)
  const decrementButton = screen.getByText(/decrement/i)

  expect(countDisplay).toHaveTextContent(`Count: ${0}`)

  userEvent.click(incrementButton)
  expect(countDisplay).toHaveTextContent(`Count: ${1}`)

  userEvent.click(decrementButton)
  expect(countDisplay).toHaveTextContent(`Count: ${0}`)
})

/* eslint no-unused-vars:0 */
