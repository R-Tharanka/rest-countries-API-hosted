import React, { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function Globe() {
    const chartRef = useRef(null); // Reference to the chart container

    useEffect(() => {
        const root = am5.Root?.new?.(chartRef.current);
        if (!root) return;

        // Apply animated theme (only if root.setThemes exists)
        const theme = am5themes_Animated?.new?.(root);
        if (typeof root.setThemes === 'function' && theme) {
            root.setThemes([theme]);
        }

        // Create a map chart with orthographic projection
        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoOrthographic(), // Globe-like projection
                panX: "rotateX", // Enable horizontal rotation
                panY: "rotateY", // Enable vertical rotation
                paddingBottom: 20,
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
            })
        );

        // Add a background series for the globe
        const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color("#e1f1ff"), // Light gray background
            fillOpacity: 0.2,
            strokeOpacity: 0, // No border
        });
        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180) // Full globe rectangle
        });

        // Add a polygon series for countries
        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: worldLow // Use low-resolution world map data
            })
        );

        // Configure tooltips and interactivity for countries
        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}", // Show country name on hover
            toggleKey: "active", // Toggle active state on click
            interactive: true // Enable interactivity
        });

        // Define hover state for countries
        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: root.interfaceColors.get("primaryButtonHover") // Highlight on hover
        });

        // Define active state for countries
        polygonSeries.mapPolygons.template.states.create("active", {
            fill: root.interfaceColors.get("primaryButtonHover") // Highlight when active
        });

        // Add slow auto-rotation to the globe
        chart.set("rotationX", 0); // Start rotation at 0 degrees
        chart.animate({
            key: "rotationX",
            to: 360, // Rotate 360 degrees
            duration: 20000, // 20 seconds for a full rotation
            loops: Infinity // Infinite loop
        });

        // Animate chart appearance
        chart.appear(1000, 100);

        // Cleanup on component unmount
        return () => {
            if (root) {
                root.dispose();
            }
        };
    }, []);

    return (
        <div
            id="chartdiv"
            ref={chartRef} // Attach the chart container reference
            className="md:w-40 md:h-40 lg:w-60 lg:h-60 " // Responsive styling
        />
    );
}
