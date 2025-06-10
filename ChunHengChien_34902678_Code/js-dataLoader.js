// js/dataLoader.js
// Functions for loading and processing data

// Load all data from sources
function loadAllData() {
  Promise.all([
    d3.csv("https://raw.githubusercontent.com/ASDF1234135/FIT5147-DVP/main/data/inbound.csv", d => ({ 
      ISO: d.geoUnit, 
      Country: d.country, 
      continent: d.continent, 
      year: +d.year, 
      inflow: +d.value 
    })),
    d3.csv("https://raw.githubusercontent.com/ASDF1234135/FIT5147-DVP/main/data/net_flow.csv", d => ({ 
      ISO: d.geoUnit, 
      Country: d.country, 
      continent: d.continent, 
      year: +d.year, 
      net_flow: +d.value 
    })),
    d3.csv("https://raw.githubusercontent.com/ASDF1234135/FIT5147-DVP/main/data/WEO_cleaned.csv", d => {
      const obj = { ISO: d.ISO, Country: d.Country, continent: d.continent };
      Object.keys(d).forEach(key => {
        if (key !== "ISO" && key !== "Country" && key !== "continent") {
          obj[key] = +d[key];
        }
      });
      return obj;
    }),
    d3.csv("https://raw.githubusercontent.com/ASDF1234135/FIT5147-DVP/main/data/QS_cleaned.csv", d => {
      const obj = {institution: d.institution, ISO: d.location_code, Country: d.location, continent: d.continent}
      Object.keys(d).forEach(key => {
        if (key !== "institution" && key !== "location_code" && key !== "location" && key !== "continent") {
          obj[key] = +d[key];
        }
      })
      return obj;
    })
  ]).then(([inFlow, netFlow, weo, qs]) => {
    inFlowData = inFlow;
    netFlowData = netFlow;
    WEOData = weo;
    QSData = qs;

    countryList = Array.from(
      new Map(WEOData.map(d => [d.ISO, d.Country])).entries()
    ).map(([ISO, Country]) => ({ ISO, Country })).sort((a, b) => a.Country.localeCompare(b.Country));

    // Initialize charts
    updateBubbleChart();
    updateBarLineChart(selectedCountryCode);
    
    // Initialize dropdown with countries
    populateDropdown();
  });
}
