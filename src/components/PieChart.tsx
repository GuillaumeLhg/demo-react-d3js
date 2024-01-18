import * as d3 from "d3";
import { useEffect, useRef } from "react";

function pieChart(divRef: React.RefObject<HTMLDivElement>) {
    const data = [
        { "Film": "Orange mécanique", "Stars": "7602396", "Released": "1971" },
        { "Film": "Spartacus", "Stars": "3525328", "Released": "1951" },
        { "Film": "Barry Lindon", "Stars": "3475185", "Released": "1975" },
        { "Film": "2001, l'Odyssée de l'espace", "Stars": "3256084", "Released": "1968" },
        { "Film": "Shining", "Stars": "2359705", "Released": "1980" },
    ];
    let svg: any;
    const margin = 50;
    const width = 750;
    const height = 600;
    // The radius of the pie chart is half the smallest side
    const radius = Math.min(width, height) / 2 - margin;
    let colors: any;
    // Compute the position of each group on the pie:
    const pie = d3.pie<any>().value((d: any) => Number(d.Stars));

    createSvg();
    createColors();
    drawPieChart();
    drawLabels();

    function createSvg(): void {
        svg = d3.select(divRef.current)
            .append('svg')
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr(
                "transform",
                "translate(" + width / 2 + "," + height / 2 + ")"
            );
    }

    function createColors(): void {
        colors = d3.scaleOrdinal()
            .domain(data.map(d => d.Stars.toString()))
            .range(["#c7d3ec", "#a5b8db", "#879cc4", "#677795", "#5a6782"]);
    }

    function drawPieChart(): void {
        // Build the pie chart
        svg.selectAll('pieces')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', d3.arc<d3.PieArcDatum<any>>()
                .innerRadius(0)
                .outerRadius(radius)
            )
            .attr('fill', (d: any, i: any) => (colors(i)))
            .attr("stroke", "#121926")
            .style("stroke-width", "1px");
    }

    function drawLabels(): void {
        // Add labels
        const labelLocation = d3.arc()
            .innerRadius(100)
            .outerRadius(radius);

        svg.selectAll('pieces')
            .data(pie(data))
            .enter()
            .append('text')
            .text((d: any) => d.data.Film)
            .attr("transform", (d: any) => "translate(" + labelLocation.centroid(d) + ")")
            .style("text-anchor", "middle")
            .style("font-size", 15);
    }
}

export const PieChart = () => {
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        pieChart(divRef)
    }, [divRef]);

    return (
        <div ref={divRef} />
    )
};