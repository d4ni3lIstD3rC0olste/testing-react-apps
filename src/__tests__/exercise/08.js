// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {renderHook, act} from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())
  console.log(result)

  expect(result.current.count).toBe(0)

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(1)

  act(() => {
    result.current.decrement()
  })
  
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 2}))

  expect(result.current.count).toBe(2)
})

test('allows customization of the step', () => {
  const {result} = renderHook(() => useCounter({
    initialCount: 2, 
    step: 2,
  }))

  expect(result.current.count).toBe(2)

  act(() => {
    result.current.increment()
  })

  expect(result.current.count).toBe(4)

  act(() => {
    result.current.decrement()
  })
  
  expect(result.current.count).toBe(2)
})
/* eslint no-unused-vars:0 */
