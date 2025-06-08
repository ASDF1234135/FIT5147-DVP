// js/utils.js
// Utility functions used across the application

// Aggregate QS data by different methods
function aggregate(values, method) {
  values = values.filter(v => !isNaN(v)); 
  if (values.length === 0) return 0;
  
  switch (method) {
    case "mean":
      return d3.mean(values);
    case "median":
      return d3.median(values);
    case "max":
      return d3.max(values);
    case "min":
      return d3.min(values);
    default:
      return 0;
  }
}

// Process data based on variable and group
function getData(value, group, iso = null) {
  let data;
  if (value == 'disabled') return null;

  if (value === 'net_flow') {
    data = netFlowData;
  } else if (value === 'inflow') {
    data = inFlowData;
  } else if (group === 'QS Indicators') {
    data = QSData;
  } else {
    data = WEOData;
  }
  
  // Filter by country if ISO is provided
  if (iso) {
    data = data.filter(d => d.ISO === iso);
  }

  // Process QS data specifically
  if (group === 'QS Indicators') {
    const qsList = [];
    const groupedData = iso 
      ? d3.group(data, d => d.year)
      : d3.group(data, d => d.ISO, d => d.year);
    
    if (iso) {
      // Process for a single country
      groupedData.forEach((entries, year) => {
        const continent = entries[0]?.continent || "Unknown";
        if (value !== "qs_count") {
          let values = entries.map(e => +e[value]);
          qsList.push({
            ISO: iso, 
            year: year, 
            [value]: aggregate(values, d3.select("#aggregateSelect").property("value")), 
            continent: continent
          });
        } else {
          qsList.push({
            ISO: iso, 
            year: year, 
            [value]: entries.length, 
            continent: continent
          });
        }
      });
    } else {
      // Process for all countries
      groupedData.forEach((yearData, countryCode) => {
        yearData.forEach((entries, year) => {
          const continent = entries[0]?.continent || "Unknown";
          const country = entries[0]?.Country || "Unknown";
          if (value !== 'qs_count') {
            let values = entries.map(e => +e[value]);
            qsList.push({
              ISO: countryCode, 
              year: year, 
              [value]: aggregate(values, d3.select("#aggregateSelect").property("value")), 
              continent: continent, 
              Country: country
            });
          } else {
            qsList.push({
              ISO: countryCode, 
              year: year, 
              [value]: entries.length, 
              continent: continent, 
              Country: country
            });
          }
        });
      });          
    }
    data = qsList;
  }
  
  return data;
}

// Compute regression line for scatter plot
function computeRegression(data) {
  const filtered = data.filter(d => activeContinents.has(d.continent));
  const n = filtered.length;
  if (n === 0) return null;

  const sumX = d3.sum(filtered, d => d.x);
  const sumY = d3.sum(filtered, d => d.y);
  const meanX = sumX / n;
  const meanY = sumY / n;

  const covXY = d3.sum(filtered, d => (d.x - meanX) * (d.y - meanY));
  const varX = d3.sum(filtered, d => (d.x - meanX) ** 2);
  const varY = d3.sum(filtered, d => (d.y - meanY) ** 2);

  const slope = covXY / varX;
  const intercept = meanY - slope * meanX;

  const r = covXY / Math.sqrt(varX * varY);

  return {
    slope,
    intercept,
    r
  };
}
