// src/components/__tests__/Globe.test.jsx

// ─── 1) Shared mocks ───────────────────────────────────────
jest.mock("@amcharts/amcharts5", () => ({
  __esModule: true,
  Root: { new: jest.fn() },
  color: jest.fn()
}));

jest.mock("@amcharts/amcharts5/map", () => ({
  __esModule: true,
  MapChart: { new: jest.fn() },
  MapPolygonSeries: { new: jest.fn() },
  geoOrthographic: jest.fn(),
  getGeoRectangle: jest.fn()
}));

jest.mock("@amcharts/amcharts5-geodata/worldLow", () => ({ __esModule: true, default: {} }));
jest.mock("@amcharts/amcharts5/themes/Animated", () => ({
  __esModule: true,
  default: { new: jest.fn() },
}));

// ─── 2) Imports ─────────────────────────────────────────────
import React from "react";
import { render } from "@testing-library/react";
import { act } from "react";
import Globe from "../Globe";

describe('Globe component', () => {
  let mockDispose;
  let mockRoot;

  beforeEach(() => {
    // Create fresh mocks for each test
    mockDispose = jest.fn();
    mockRoot = {
      setThemes: jest.fn(),
      container: {
        children: {
          push: jest.fn(() => ({
            series: {
              push: jest.fn(() => ({
                mapPolygons: { template: { setAll: jest.fn(), states: { create: jest.fn() } } },
                data: []
              }))
            },
            set: jest.fn(),
            animate: jest.fn(),
            appear: jest.fn()
          }))
        }
      },
      interfaceColors: { get: jest.fn(() => '#ccc') },
      dispose: mockDispose
    };

    // Reset all mocks before each test
    jest.clearAllMocks();
    
    // Mock am5.Root.new to return our mockRoot
    const am5 = require("@amcharts/amcharts5");
    am5.Root.new = jest.fn().mockReturnValue(mockRoot);
  });

  it('renders without crashing', () => {
    const { container } = render(<Globe />);
    expect(container).toBeInTheDocument();
  });

  it('initializes an amcharts root', () => {
    render(<Globe />);
    const am5 = require("@amcharts/amcharts5");
    expect(am5.Root.new).toHaveBeenCalled();
  });

  it('disposes root on unmount', () => {
    const { unmount } = render(<Globe />);
    const am5 = require("@amcharts/amcharts5");
    expect(am5.Root.new).toHaveBeenCalled();

    // Unmount the component
    unmount();

    // Verify that dispose was called
    expect(mockDispose).toHaveBeenCalledTimes(1);
  });
});
