// js/barLineChart.js
// Functions for the bar and line chart visualization

// Update bar line chart for a specific country
function updateBarLineChart(countryCode) {
  // Get properties
  const xVar = d3.select("#xSelect").property("value");
  const xGroup = d3.select("#xSelect").node().selectedOptions[0].parentNode.label;
  const yVar = d3.select("#ySelect").property("value");
  const yGroup = d3.select("#ySelect").node().selectedOptions[0].parentNode.label;

  // Get data for each axis
  const xSelectData = getData(xVar, xGroup, countryCode);
  const ySelectData = getData(yVar, yGroup, countryCode);

  // Combining data for the three years
  const combined = [2022, 2023, 2024].map(year => {
    const yData = ySelectData.find(d => +d.year === year);
    const xData = xSelectData.find(d => +d.year === year);
    return {
      year: year.toString(),
      yValue: yData ? Math.round(yData[yVar] * 10000) / 10000 : null,
      xValue: xData ? Math.round(xData[xVar] * 10000) / 10000 : null
    };
  });
  
  // Starting drawing
  const container = d3.select("#barLineChartContainer").node();
  const { width, height } = container.getBoundingClientRect();

  // Set up margin
  const margin = { top: 40, right: 50, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const barLineSvg = d3.select("#barLineChart")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("preserveAspectRatio", "xMidYMid meet");

  barLineSvg.selectAll("*").remove();
  
  const g = barLineSvg
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(combined.map(d => d.year))
    .range([0, innerWidth])
    .padding(0.2);

  // Calculate domains for the two y-axes
  const y1Max = d3.max(combined, d => d.yValue);
  const y2Max = d3.max(combined, d => d.xValue);
  const y1Min = d3.min(combined, d => d.yValue);
  const y2Min = d3.min(combined, d => d.xValue);
  const y1diff = y1Max - y1Min;
  const y2diff = y2Max - y2Min;
  
  const y1Scale = d3.scaleLinear()
    .domain([y1Min - 0.1 * y1diff, y1Max + 0.1 * y1diff])
    .range([innerHeight, 0]);
    
  const y2Scale = d3.scaleLinear()
    .domain([y2Min - 0.1 * y2diff, y2Max + 0.1 * y2diff])
    .range([innerHeight, 0]);

  // Add chart title
  const countryName = countryList.find(w => w.ISO === countryCode).Country;
  const chartTitle = `${yVar.toUpperCase()} vs ${xVar.toUpperCase()} in ${countryName}`;

  barLineSvg.append("text")
    .attr("x", width / 2)
    .attr("y", margin.top / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .text(chartTitle);

  // Draw axes
  g.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));
    
  g.append("g")
    .call(d3.axisLeft(y1Scale).ticks(6));
    
  g.append("text")
    .attr("class", "y1-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", -60)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .text(yVar in sizeLegendLabel ? sizeLegendLabel[yVar] : yVar);
    
  g.append("g")
    .attr("transform", `translate(${innerWidth}, 0)`)
    .call(d3.axisRight(y2Scale).ticks(6));
    
  g.append("text")
    .attr("class", "y2-axis-label")
    .attr("transform", "rotate(-90)")
    .attr("x", -innerHeight / 2)
    .attr("y", innerWidth + 60)
    .attr("text-anchor", "middle")
    .style("font-weight", "bold")
    .text(xVar in sizeLegendLabel ? sizeLegendLabel[xVar] : xVar);

  // Draw bars
  g.selectAll(".bar")
    .data(combined)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.year) + xScale.bandwidth() / 4)
    .attr("y", d => y1Scale(d.yValue))
    .attr("width", xScale.bandwidth() / 2)
    .attr("height", d => innerHeight - y1Scale(d.yValue))
    .attr("fill", "#69b3a2")
    .on("mouseover", function(event, d) {
      tooltip
        .style("visibility", "visible")
        .html(`
          <strong>Year:</strong> ${d.year}<br/>
          ${yVar}: ${d.yValue != null ? d.yValue : "NO DATA"}<br/>
          ${xVar}: ${d.xValue != null ? d.xValue : "NO DATA"}
        `);
      d3.select(this).attr("fill", "#2a5673");
    })
    .on("mousemove", function(event) {
      tooltip
        .style("top", (event.pageY + 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("fill", "#69b3a2");
    });

  // Create line
  const line = d3.line()
    .x(d => xScale(d.year) + xScale.bandwidth() / 2)
    .y(d => y2Scale(d.xValue));

  // Draw line and dots
  g.append("path")
    .datum(combined)
    .attr("fill", "none")
    .attr("stroke", "#ff6347")
    .attr("stroke-width", 2)
    .attr("d", line);

  g.selectAll(".dot")
    .data(combined.filter(d => d.xValue != null))
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.year) + xScale.bandwidth() / 2)
    .attr("cy", d => d.xValue != null ? y2Scale(d.xValue) : y2Scale(0))
    .attr("r", 4)
    .attr("fill", "#ff6347")
    .on("mouseover", function(event, d) {
      tooltip
        .style("visibility", "visible")
        .html(`
          <strong>Year:</strong> ${d.year}<br/>
          ${yVar}: ${d.yValue != null ? d.yValue : "NO DATA"}<br/>
          ${xVar}: ${d.xValue != null ? d.xValue : "NO DATA"}
        `);
      d3.select(this).attr("r", 6).attr("fill", "#d8721d");
    })
    .on("mousemove", function(event) {
      tooltip
        .style("top", (event.pageY + 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("r", 4).attr("fill", "#ff6347");
    });
}
