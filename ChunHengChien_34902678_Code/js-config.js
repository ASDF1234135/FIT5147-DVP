// js/config.js
// Configuration and constants for the application

// Global variables
let inFlowData = [];
let netFlowData = [];
let WEOData = [];
let QSData = [];
let countryList = [];
let activeContinents = new Set(["Asia", "Europe", "Africa", "Oceania", "Americas"]);
let selectedCountryCode = 'AUS';

// Define the color for continents
const continentColorMap = {
  "Asia": "#1f77b4",
  "Europe": "#ff7f0e",
  "Africa": "#2ca02c",
  "Oceania": "#d62728",
  "Americas": "#9467bd"
};

// Display indicator names
const sizeLegendLabel = {
  "net_flow": "International Student Net Flow",
  "inflow": "International Student Inflow",
  "rank_display": "Average University Rank",
  "ar_score": "Academic Reputation",
  "er_score": "Employer Reputation",
  "fsr_score": "Faculty Student Ratio",
  "cpf_score": "Citations per Faculty",
  "ifr_score": "International Faculty Ratio",
  "isr_score": "International Student Ratio",
  "irn_score": "International Research Network",
  "ger_score": "Employment Outcomes",
  "Overall_Score": "QS Overall Score"
};

// Setup tooltip
const tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("position", "absolute")
  .style("visibility", "hidden")
  .style("background", "rgba(0,0,0,0.7)")
  .style("color", "#fff")
  .style("padding", "5px 10px")
  .style("border-radius", "5px")
  .style("font-size", "12px");
