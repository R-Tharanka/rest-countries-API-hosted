import React, { useEffect, useRef } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import worldLow from "@amcharts/amcharts5-geodata/worldLow"; // <-- Correct way
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


export default function Globe() {
    const chartRef = useRef(null);

    useEffect(() => {
        const root = am5.Root.new(chartRef.current);

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        const chart = root.container.children.push(
            am5map.MapChart.new(root, {
                projection: am5map.geoOrthographic(),
                panX: "rotateX",
                panY: "rotateY",
                paddingBottom: 20,
                paddingTop: 20,
                paddingLeft: 20,
                paddingRight: 20,
            })
        );

        const backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
        backgroundSeries.mapPolygons.template.setAll({
            fill: am5.color(0xe6e6e6),
            strokeOpacity: 0,
        });
        backgroundSeries.data.push({
            geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });

        const polygonSeries = chart.series.push(
            am5map.MapPolygonSeries.new(root, {
                geoJSON: worldLow
            })
        );

        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}",
            toggleKey: "active",
            interactive: true
        });

        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: root.interfaceColors.get("primaryButtonHover")
        });

        polygonSeries.mapPolygons.template.states.create("active", {
            fill: root.interfaceColors.get("primaryButtonHover")
        });

        // Add slow auto-rotation
        chart.set("rotationX", 0);
        chart.animate({
            key: "rotationX",
            to: 360,
            duration: 30000, // 30 seconds for full spin
            loops: Infinity
        });

        chart.appear(1000, 100);

        return () => root.dispose();
    }, []);

    return (
        <div
            id="chartdiv"
            ref={chartRef}
            className="md:w-50 md:h-50 lg:w-60 lg:h-60 ml-2"
        />
    );

}
