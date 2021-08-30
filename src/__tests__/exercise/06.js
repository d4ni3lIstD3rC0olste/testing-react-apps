// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'
import {useCurrentPosition} from 'react-use-geolocation'

jest.mock('react-use-geolocation')

test('displays the users current location', async () => {
  // 🐨 create a fakePosition object that has an object called "coords" with latitude and longitude
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 47.9932886,
      longitude: 7.8481977,
    },
  }

  let setCurrentPosition
  useCurrentPosition.mockImplementation(() => {
    const [state, setState] = React.useState([]);
    setCurrentPosition = setState;
    return state;
  })
  // 🐨 now that setup is done, render the Location component itself
  render(<Location />)
  // 🐨 verify the loading spinner is showing up
  // 💰 tip: try running screen.debug() to know what the DOM looks like at this point.
  const spinner = screen.getByLabelText(/loading/i)
  expect(spinner).toBeInTheDocument()

  act(() => {
    setCurrentPosition([fakePosition])
  })

  // If you'd like, learn about what this means and see if you can figure out
  // how to make the warning go away (tip, you'll need to use async act)
  // 📜 https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
  // 🐨 verify the loading spinner is no longer in the document
  //    (💰 use queryByLabelText instead of getByLabelText)

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  // 🐨 verify the latitude and longitude appear correctly
  expect(screen.getByText(/latitude/i)).toHaveTextContent(`Latitude: ${fakePosition.coords.latitude}`)
  expect(screen.getByText(/longitude/i)).toHaveTextContent(`Longitude: ${fakePosition.coords.longitude}`)
})

test('error case', () => {
  const error = {
    message: 'kaputt gegangen',
  }

  let setCurrentPosition
  useCurrentPosition.mockImplementation(() => {
    const [state, setState] = React.useState([]);
    setCurrentPosition = setState;
    return state;
  })

  render(<Location />)
  
  const spinner = screen.getByLabelText(/loading/i)
  expect(spinner).toBeInTheDocument()

  act(() => {
    setCurrentPosition([{}, error])
  })

  expect(screen.getByRole('alert')).toHaveTextContent(error.message)
})

/*
eslint
  no-unused-vars: "off",
*/
