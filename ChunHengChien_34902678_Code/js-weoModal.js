// js/weoModal.js
// Functions for the WEO explanation modal

// Show the WEO explanation modal with data
function showWEOExplanationModal() {
  const weoData = [
    ["NGDP_R", "Gross domestic product, constant prices: National currency (Billions)"],
    ["NGDP_RPCH", "Gross domestic product, constant prices: Percent change (Units)"],
    ["NGDP", "Gross domestic product, current prices: National currency (Billions)"],
    ["NGDPD", "Gross domestic product, current prices: U.S. dollars (Billions)"],
    ["PPPGDP", "Gross domestic product, current prices: Purchasing power parity; international dollars (Billions)"],
    ["NGDP_D", "Gross domestic product, deflator: Index (Units)"],
    ["NGDPRPC", "Gross domestic product per capita, constant prices: National currency (Units)"],
    ["NGDPRPPPPC", "Gross domestic product per capita, constant prices: Purchasing power parity; 2017 international dollar (Units)"],
    ["NGDPPC", "Gross domestic product per capita, current prices: National currency (Units)"],
    ["NGDPDPC", "Gross domestic product per capita, current prices: U.S. dollars (Units)"],
    ["PPPPC", "Gross domestic product per capita, current prices: Purchasing power parity; international dollars (Units)"],
    ["NGAP_NPGDP", "Output gap in percent of potential GDP: Percent of potential GDP (Units)"],
    ["PPPSH", "Gross domestic product based on purchasing-power-parity (PPP) share of world total: Percent (Units)"],
    ["PPPEX", "Implied PPP conversion rate: National currency per current international dollar (Units)"],
    ["NID_NGDP", "Total investment: Percent of GDP (Units)"],
    ["NGSD_NGDP", "Gross national savings: Percent of GDP (Units)"],
    ["PCPI", "Inflation, average consumer prices: Index (Units)"],
    ["PCPIPCH", "Inflation, average consumer prices: Percent change (Units)"],
    ["PCPIE", "Inflation, end of period consumer prices: Index (Units)"],
    ["PCPIEPCH", "Inflation, end of period consumer prices: Percent change (Units)"],
    ["TM_RPCH", "Volume of imports of goods and services: Percent change (Units)"],
    ["TMG_RPCH", "Volume of Imports of goods: Percent change (Units)"],
    ["TX_RPCH", "Volume of exports of goods and services: Percent change (Units)"],
    ["TXG_RPCH", "Volume of exports of goods: Percent change (Units)"],
    ["LUR", "Unemployment rate: Percent of total labor force (Units)"],
    ["LE", "Employment: Persons (Millions)"],
    ["LP", "Population: Persons (Millions)"],
    ["GGR", "General government revenue: National currency (Billions)"],
    ["GGR_NGDP", "General government revenue: Percent of GDP (Units)"],
    ["GGX", "General government total expenditure: National currency (Billions)"],
    ["GGX_NGDP", "General government total expenditure: Percent of GDP (Units)"],
    ["GGXCNL", "General government net lending/borrowing: National currency (Billions)"],
    ["GGXCNL_NGDP", "General government net lending/borrowing: Percent of GDP (Units)"],
    ["GGSB", "General government structural balance: National currency (Billions)"],
    ["GGSB_NPGDP", "General government structural balance: Percent of potential GDP (Units)"],
    ["GGXONLB", "General government primary net lending/borrowing: National currency (Billions)"],
    ["GGXONLB_NGDP", "General government primary net lending/borrowing: Percent of GDP (Units)"],
    ["GGXWDN", "General government net debt: National currency (Billions)"],
    ["GGXWDN_NGDP", "General government net debt: Percent of GDP (Units)"],
    ["GGXWDG", "General government gross debt: National currency (Billions)"],
    ["GGXWDG_NGDP", "General government gross debt: Percent of GDP (Units)"],
    ["NGDP_FY", "Gross domestic product corresponding to fiscal year, current prices: National currency (Billions)"],
    ["BCA", "Current account balance: U.S. dollars (Billions)"],
    ["BCA_NGDPD", "Current account balance: Percent of GDP (Units)"]
  ];

  const tbody = document.querySelector("#weoTable tbody");
  tbody.innerHTML = "";

  weoData.forEach(([code, desc]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${code}</td><td>${desc}</td>`;
    tbody.appendChild(row);
  });

  const modal = document.getElementById("weoModal");
  modal.style.display = "flex";

  document.querySelector(".close-button").onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}

// Setup WEO modal event listeners
function setupWEOModal() {
  // The close button listener is set when the modal is shown
}
