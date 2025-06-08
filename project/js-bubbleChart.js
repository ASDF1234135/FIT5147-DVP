// js/bubbleChart.js
// Functions for the bubble chart visualization

// Update bubble chart data and redraw
function updateBubbleChart() {
  // Get all properties
  const xVar = d3.select("#xSelect").property("value");
  const xGroup = d3.select("#xSelect").node().selectedOptions[0].parentNode.label;
  const yVar = d3.select("#ySelect").property("value");
  const yGroup = d3.select("#ySelect").node().selectedOptions[0].parentNode.label;
  const sizeVar = d3.select("#sizeSelect").property("value");
  const sizeGroup = d3.select("#sizeSelect").node().selectedOptions[0].parentNode.label;
  
  // Get data for each axis and size
  let xSelectData = getData(xVar, xGroup);
  let ySelectData = getData(yVar, yGroup);
  let sizeSelectData = getData(sizeVar, sizeGroup);

  let rScale;

  // Set up size scale
  if (sizeVar !== "disabled") {
    const validRValues = sizeSelectData
      .filter(d => !isNaN(d[sizeVar]))
      .map(d => +d[sizeVar]);

    if (validRValues.length > 0) {
      const rExtent = d3.extent(validRValues); // [min, max]

      rScale = d3.scaleLinear()
        .domain(rExtent)
        .range([6, 40]);
    }
  }

  // Merge x-axis and y-axis data
  const mergedData = ySelectData.map(d => {
    const match = xSelectData.find(w => w.ISO === d.ISO && w.year === d.year);
    if (!match) return null;
    
    const sizeEntry = sizeSelectData ? sizeSelectData.find(w => w.ISO === d.ISO) : null;
    const sizeValue = sizeEntry ? sizeEntry[sizeVar] : null;
    
    let r = 6;
    if (sizeVar !== "disabled" && sizeValue !== undefined && rScale) {
      r = rScale(sizeValue);
    }
    
    const item = {
      ISO: d.ISO,
      year: d.year,
      x: match[xVar],
      y: d[yVar],
      r,
      sizeValue,
      country: d.Country,
      continent: d.continent
    };
    
    return item;
  }).filter(d => d && !isNaN(d.x) && !isNaN(d.y));

  drawBubbleChart(mergedData, xVar, yVar, sizeVar);
}

// Draw the bubble chart visualization
function drawBubbleChart(data, xLabel, yLabel, sizeLabel) {
  const container = d3.select("#bubbleChartWrapper").node();
  const { width, height } = container.getBoundingClientRect();

  // Set up margin
  const margin = { top: 30, right: 150, bottom: 30, left: 60 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  d3.select("#bubbleChart").selectAll("*").remove();
  
  const labelVisibility = d3.select("#toggleLabels").property("checked");

  // Set up axis scale
  const xExtent = d3.extent(data, d => d.x);
  const yExtent = d3.extent(data, d => d.y);
  const xPadding = (xExtent[1] - xExtent[0]) * 0.2;
  const yPadding = (yExtent[1] - yExtent[0]) * 0.2;
  
  const xScale = d3.scaleLinear()
    .domain([xExtent[0] - xPadding, xExtent[1] + xPadding])
    .range([0, innerWidth]);
    
  const yScale = d3.scaleLinear()
    .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
    .range([innerHeight, 0]);

  // Start drawing
  const svg = d3.select("#bubbleChart")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${width} ${height}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const chartTitle = `${yLabel.toUpperCase()} vs ${xLabel.toUpperCase()}`;

  svg.append("text")
    .attr("x", width * 0.4)
    .attr("y", margin.top / 3)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .attr("font-weight", "bold")
    .text(chartTitle);

  // Drawing bubbles
  svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", d => d.r)
    .attr("fill", d => continentColorMap[d.continent])
    .attr("display", d => activeContinents.has(d.continent) ? "" : "none")
    .attr("opacity", 0.7)
    .on("mouseover", function(event, d) {
      const xLabelText = d3.select("#xSelect").property("value");
      const yLabelText = d3.select("#ySelect").property("value");
      const sizeLabelText = d3.select("#sizeSelect").property("value");

      if (sizeLabelText !== "disabled") {
        tooltip.style("visibility", "visible")
          .html(`
            <strong>${d.country} - ${d.year}</strong><br/>
            ${xLabelText}: ${Math.round(d.x * 10000) / 10000}<br/>
            ${yLabelText}: ${Math.round(d.y * 10000) / 10000}<br/>
            ${sizeLabelText}: ${Math.round(d.sizeValue * 10000) / 10000}
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY + 10) + "px");
      } else {
        tooltip.style("visibility", "visible")
          .html(`
            <strong>${d.country} - ${d.year}</strong><br/>
            ${xLabelText}: ${Math.round(d.x * 10000) / 10000}<br/>
            ${yLabelText}: ${Math.round(d.y * 10000) / 10000}
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY + 10) + "px");
      }

      d3.select(this)
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    })
    .on("mousemove", function(event) {
      tooltip.style("top", (event.pageY + 10) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function() {
      tooltip.style("visibility", "hidden");
      d3.select(this).attr("stroke-width", 0);
    })
    .on("click", function(event, d) {
      updateBarLineChart(d.ISO);
      selectedCountryCode = d.ISO;
    });

  // Drawing axis
  svg.append("g")
    .attr("transform", `translate(0, ${innerHeight})`)
    .call(d3.axisBottom(xScale));
    
  svg.append("g")
    .call(d3.axisLeft(yScale));

  // Add country tags
  if (labelVisibility) {
    svg.selectAll(".label-text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "label-text")
      .attr("display", d => activeContinents.has(d.continent) ? "" : "none")
      .attr("x", d => xScale(d.x))
      .attr("y", d => yScale(d.y))
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "black")
      .style("pointer-events", "none")
      .text(d => `${d.country} ${d.year}`);
  }

  // Add legend
  const legendPadding = 10;
  const legend = svg.append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${innerWidth +30}, ${legendPadding})`);

  const continents = Object.keys(continentColorMap);

  continents.forEach((continent, i) => {
    const legendItem = legend.append("g")
      .attr("class", "legend-item")
      .attr("transform", `translate(0, ${i * 22})`)
      .style("cursor", "pointer")
      .on("click", function() {
        if (activeContinents.has(continent)) {
          activeContinents.delete(continent);
        } else {
          activeContinents.add(continent);
        }
        updateBubbleChart(); 
      });

    legendItem.append("circle")
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", 6)
      .style("fill", activeContinents.has(continent) ? continentColorMap[continent] : "#ccc");

    legendItem.append("text")
      .attr("x", 10)
      .attr("y", 4)
      .text(continent)
      .style("font-size", "12px")
      .attr("alignment-baseline", "middle");
  });
  
  // Add size legend
  const rValues = d3.extent(data, d => d.sizeValue);
  const [minR, maxR] = rValues;
  const meanR = (minR + maxR) / 2;

  const sizeData = [
    { label: "Max", value: maxR },
    { label: "Mean", value: meanR },
    { label: "Min", value: minR }
  ];
  
  const sizes = [40, 23, 6];
  
  const legendSizeGroup = svg.append("g")
    .attr("class", "size-legend")
    .attr("transform", `translate(${innerWidth + 20}, ${legendPadding + 250})`);

  legendSizeGroup.append("text")
    .text("Bubble Size")
    .attr("x", 0)
    .attr("y", -80)
    .attr("alignment-baseline", "middle")
    .style("font-size", "12px")
    .style("font-weight", "bold");

  sizeData.forEach((d, i) => {
    const yOffset = i * 17;

    legendSizeGroup.append("circle")
      .attr("cx", 35)
      .attr("cy", yOffset)
      .attr("r", sizes[i])
      .attr("fill", "none")
      .attr("stroke", "#333");

    if (sizeLabel !== "disabled") {
      legendSizeGroup.append("text")
        .attr("x", 20)
        .attr("y", yOffset - sizes[i]/2)
        .attr("alignment-baseline", "middle")
        .style("font-size", "12px")
        .text(`${Math.round(d.value * 10000) / 10000}`);
    }
  });
  
  // Calculate and draw regression line
  const regression = computeRegression(data);
  if (regression) {
    const { slope, intercept, r } = regression;

    const xMin = d3.min(data, d => d.x);
    const xMax = d3.max(data, d => d.x);

    const yMin = Math.max(slope * xMin + intercept, d3.min(data, d => d.y));
    const yMax = Math.min(slope * xMax + intercept, d3.max(data, d => d.y));

    svg.selectAll(".regression-line").remove();

    svg.append("line")
      .attr("class", "regression-line")
      .attr("x1", xScale(xMin))
      .attr("y1", yScale(yMin))
      .attr("x2", xScale(xMax))
      .attr("y2", yScale(yMax))
      .attr("stroke", "red")
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "5,5");

    svg.selectAll(".correlation-label").remove();

    svg.append("text")
      .attr("class", "correlation-label")
      .attr("x", xScale(xMax)+20)
      .attr("y", yScale(yMax)-20)
      .style("fill", "red")
      .style("font-size", "14px")
      .text(`r = ${regression.r.toFixed(3)}`);
  }
}

// Set up event listeners for chart controls
function setupBubbleChartControls() {
  d3.select("#xSelect").on("change", function() {
    updateBubbleChart();
    updateBarLineChart(selectedCountryCode);
  });
  
  d3.select("#ySelect").on("change", function() {
    updateBubbleChart();
    updateBarLineChart(selectedCountryCode);
  });
  
  d3.select("#sizeSelect").on("change", function() {
    updateBubbleChart();
    updateBarLineChart(selectedCountryCode);
  });
  
  d3.select("#aggregateSelect").on("change", function() {
    updateBubbleChart();
    updateBarLineChart(selectedCountryCode);
  });
  
  d3.select("#toggleLabels").on("change", function() {
    updateBubbleChart();
  });
}
