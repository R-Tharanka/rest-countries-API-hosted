import { render } from '@testing-library/react';
import Globe from '../Globe';

jest.mock('@amcharts/amcharts5', () => ({
  Root: { new: jest.fn(() => ({
    setThemes: jest.fn(),
    container: { children: { push: jest.fn() } },
    dispose: jest.fn(),
  })) },
}));

jest.mock('@amcharts/amcharts5/map', () => ({
  MapChart: { new: jest.fn() },
  MapPolygonSeries: { new: jest.fn(() => ({
    mapPolygons: { template: { setAll: jest.fn(), states: { create: jest.fn() } } },
    data: [],
  })) },
  geoOrthographic: jest.fn(),
  getGeoRectangle: jest.fn(),
}));

jest.mock('@amcharts/amcharts5-geodata/worldLow', () => ({}));

jest.mock('@amcharts/amcharts5/themes/Animated', () => ({
  new: jest.fn(),
}));

test('Globe component renders without crashing', () => {
  const { container } = render(<Globe />);
  expect(container).toBeInTheDocument();
});

test('Globe component initializes chart correctly', () => {
  render(<Globe />);
  expect(require('@amcharts/amcharts5').Root.new).toHaveBeenCalled();
});

test('Globe component cleans up on unmount', () => {
  const { unmount } = render(<Globe />);
  const mockDispose = require('@amcharts/amcharts5').Root.new().dispose;
  unmount();
  expect(mockDispose).toHaveBeenCalled();
});