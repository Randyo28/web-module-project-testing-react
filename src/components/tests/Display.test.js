import React from 'react';
import { render, screen } from '@testing-library/react';
import Display from './../Display';
import Show from './../Show';
import userEvent from '@testing-library/user-event';

const testShow = {
    //add in approprate test data structure here.
    name: '',
	summary: '',
	seasons: [
		{
			id: '1',
			name: 'Season-1',
            _embedded: {
                episodes: [{}],
            }
		},
		{
			id: '2',
			name: 'Season-2',
            _embedded: {
                episodes: [{}],
            }
		},
		{
			id: '3',
			name: 'Season-3',
            _embedded: {
                episodes: [{}],
            }
}]}

test("renders without error", () => {
    render(<Display/> )
    expect(1).toEqual(1)
    
});

test("renders show Component when fetch button is pressed", async () => {

    //Arrange
    render(<Display show={testShow}/> )
    expect(1).toEqual(1)

    //Act
    const button = screen.getByRole('button')
    userEvent.click(button)
    
    const showContainer = await screen.findByTestId('show-container')
    
    //Assert
    expect(showContainer).toBeInTheDocument()
    expect(showContainer).toBeTruthy()
});

test("select options rendered is equal to the amount of seasons", async () => {
  //Arrange
  render(<Display show={null}/> )

  //Act
  const button = screen.getByRole('button')
  userEvent.click(button)
  
  const seasons = await screen.findAllByTestId('season-option')
//   screen.debug(seasons)

  //Assert
  expect(seasons).toHaveLength(4)
});

test("Option function is called when button presses", async () => {
    const mockDisplay = jest.fn(() => {
        console.log('This is fake data')
    })
  //Arrange
  render(<Display handleClick={() => {
      mockDisplay('Tiis is fake data')}} displayFunc={mockDisplay}/> )

  //Act
  const button = screen.getByRole('button')
  userEvent.click(button)
  
  //Assert
  expect(mockDisplay.mock.calls.length).toBe(2)
});






///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.