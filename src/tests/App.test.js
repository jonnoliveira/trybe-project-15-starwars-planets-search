import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import mockData from '../mock/mockData';


describe('Test the "Header" component', () => {

  beforeEach(async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });
    await act(async () => {
      render(<App />);
    });
  });

  it('check if the component is rendered', () => {

    const inputText = screen.getByTestId('name-filter');
    const inputOptions = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const btnRemoveFilter = screen.getByTestId('button-remove-filters');

    expect(inputText && inputOptions && inputComparison && inputValue && btnFilter && btnRemoveFilter).toBeDefined();

  });

  it('checks if the text input works correctly', async () => {
    const inputText = await screen.findByTestId("name-filter");
    act(() => {
      userEvent.type(inputText, 'tatoo')
    })
    expect(inputText.value).toBe('tatoo');

    const planetTatoo = screen.findByRole('cell', {
      name: /tatooine/i,
    })
    expect(planetTatoo).toBeDefined();
  })

  it('checks numeric filters work correctly', async () => {
    const inputOptions = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(inputOptions, 'diameter');
      userEvent.selectOptions(inputComparison, 'igual a');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '8900');
      userEvent.click(btnFilter)
    })

    const dagobahPlanet = await screen.findByRole('cell', {
      name: /dagobah/i
    })
    expect(dagobahPlanet).toBeDefined();
  })

  it('checks if multiple numerical filters are applied simultaneously', async () => {
    const inputOptions = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(inputOptions, 'diameter');
      userEvent.selectOptions(inputComparison, 'maior que');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '8900');
      userEvent.click(btnFilter)
    })

    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(8)

    act(() => {
      userEvent.selectOptions(inputOptions, 'population');
      userEvent.selectOptions(inputComparison, 'menor que');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '1000000000');
    })

    expect(inputOptions.value).toBe('population');
    expect(inputComparison.value).toBe('menor que');
    expect(inputValue.value).toBe('1000000000');

    act(() => {
      userEvent.click(btnFilter)
    })

    const rows2 = await screen.findAllByRole('row');
    expect(rows2.length).toBe(4)

    act(() => {
      userEvent.selectOptions(inputOptions, 'rotation_period');
      userEvent.selectOptions(inputComparison, 'igual a');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '12');
    })

    expect(inputOptions.value).toBe('rotation_period');
    expect(inputComparison.value).toBe('igual a');
    expect(inputValue.value).toBe('12');

    act(() => {
      userEvent.click(btnFilter)
    })

    const rows3 = await screen.findAllByRole('row');
    expect(rows3.length).toBe(2)

    const beginPlanet = await screen.findByRole('cell', {
      name: /bespin/i,
    })
    expect(beginPlanet).toBeDefined();

    const filterI = screen.getByRole('heading', {
      name: /diameter maior que 8900 x/i,
      level: 5,
    })

    const filterII = screen.getByRole('heading', {
      name: /population menor que 1000000000 x/i,
      level: 5
    })

    const filterIII = screen.getByRole('heading', {
      name: /rotation_period igual a 12 x/i,
      level: 5
    })

    expect(filterI && filterII && filterIII).toBeDefined();
  })

  it('checks that filters are excluded and data shown correctly in the table', async () => {
    const inputOptions = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');
    expect(inputOptions && inputComparison && inputValue && btnFilter).toBeDefined();

    act(() => {
      userEvent.selectOptions(inputOptions, 'diameter');
      userEvent.selectOptions(inputComparison, 'maior que');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '8900');
      userEvent.click(btnFilter)
    })

    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(8)

    act(() => {
      userEvent.selectOptions(inputOptions, 'population');
      userEvent.selectOptions(inputComparison, 'menor que');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '1000000000');
    })

    expect(inputOptions.value).toBe('population');
    expect(inputComparison.value).toBe('menor que');
    expect(inputValue.value).toBe('1000000000');

    act(() => {
      userEvent.click(btnFilter)
    })

    const rows2 = await screen.findAllByRole('row');
    expect(rows2.length).toBe(4)

    act(() => {
      userEvent.selectOptions(inputOptions, 'rotation_period');
      userEvent.selectOptions(inputComparison, 'igual a');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '12');
    })

    expect(inputOptions.value).toBe('rotation_period');
    expect(inputComparison.value).toBe('igual a');
    expect(inputValue.value).toBe('12');

    act(() => {
      userEvent.click(btnFilter)
    })

    const rows3 = await screen.findAllByRole('row');
    expect(rows3.length).toBe(2)

    const beginPlanet = await screen.findByRole('cell', {
      name: /bespin/i,
    })
    expect(beginPlanet).toBeDefined();

    const filterI = screen.getByRole('heading', {
      name: /diameter maior que 8900 x/i,
      level: 5,
    })

    const filterII = screen.getByRole('heading', {
      name: /population menor que 1000000000 x/i,
      level: 5
    })

    const filterIII = screen.getByRole('heading', {
      name: /rotation_period igual a 12 x/i,
      level: 5
    })

    expect(filterI && filterII && filterIII).toBeDefined();

    const removeFilterIII = await screen.findAllByRole('button', {
      name: /x/i,
    })
    expect(removeFilterIII.length).toBe(3);

    act(() => {
      userEvent.click(removeFilterIII[0])
    })

    const removeFilterII = await screen.findAllByRole('button', {
      name: /x/i,
    })

    expect(removeFilterII.length).toBe(2);

    const rows4 = await screen.findAllByRole('row');
    expect(rows4.length).toBe(2)


    act(() => {
      userEvent.click(removeFilterII[1])
    })

    const removeFilterI = await screen.findAllByRole('button', {
      name: /x/i,
    })

    expect(removeFilterI.length).toBe(1);

    const rows5 = await screen.findAllByRole('row');
    expect(rows5.length).toBe(5)

    act(() => {
      userEvent.click(removeFilterII[0])
    })

    const rows6 = await screen.findAllByRole('row');
    expect(rows6.length).toBe(11)
  })

  it('checks that all filters are cleared simultaneously', async () => {
    const inputOptions = screen.getByTestId('column-filter');
    const inputComparison = screen.getByTestId('comparison-filter');
    const inputValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    act(() => {
      userEvent.selectOptions(inputOptions, 'orbital_period');
      userEvent.selectOptions(inputComparison, 'menor que');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '400');
      userEvent.click(btnFilter)
    })

    const rows = await screen.findAllByRole('row');
    expect(rows.length).toBe(6)

    act(() => {
      userEvent.selectOptions(inputOptions, 'surface_water');
      userEvent.selectOptions(inputComparison, 'menor que');
      userEvent.clear(inputValue);
      userEvent.type(inputValue, '12');
      userEvent.click(btnFilter)
    })

    const rows2 = await screen.findAllByRole('row');
    expect(rows2.length).toBe(3)

    const tatooinePlanet = await screen.findByRole('cell', {
      name: /tatooine/i,
    });
    const dagobahPlanet = await screen.findByRole('cell', {
      name: /dagobah/i
    })

    expect(tatooinePlanet && dagobahPlanet).toBeDefined()

    const btnClearFilters = await screen.findByRole('button', {
      name: /limpar filtros/i
    })

    act(() => {
      userEvent.click(btnClearFilters)
    })

    const rows3 = await screen.findAllByRole('row');
    expect(rows3.length).toBe(11)

  })

  it('check if the API returns error', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(null)
    });
    await act(async () => {
      render(<App />);
    });

    const error = screen.getByText(/erro na requisição\. tente novamente mais tarde\./i)
    expect(error).toBeDefined()

  });
});
