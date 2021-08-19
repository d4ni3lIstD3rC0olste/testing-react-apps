// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  // 🐨 create a div to render your component to (💰 document.createElement)
  var element = document.createElement('div');
  document.body.append(element);
  ReactDOM.render(<Counter/>, element);
  var buttons = element.querySelectorAll('button');
  var incrementButton = buttons[1];
  var decrementButton = buttons[0];
  var message = element.firstChild.querySelector('div');
  expect(message.textContent).toBe('Current count: 0');

  var onClickEvent = new MouseEvent("click", {
    bubbles: true
  });
  incrementButton.dispatchEvent(onClickEvent);
  expect(message.textContent).toBe('Current count: 1');

  decrementButton.dispatchEvent(onClickEvent);
  expect(message.textContent).toBe('Current count: 0');

  element.remove();
})

/* eslint no-unused-vars:0 */
