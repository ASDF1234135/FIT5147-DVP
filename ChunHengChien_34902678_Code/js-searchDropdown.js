// js/searchDropdown.js
// Functions for the country search dropdown

// Populate the dropdown list with countries
function populateDropdown(filter = "") {
  const dropdown = document.getElementById("dropdownList");
  dropdown.innerHTML = "";
  
  const filtered = countryList.filter(c => c.Country.toLowerCase().startsWith(filter.toLowerCase()));
  
  filtered.forEach(country => {
    const li = document.createElement("li");
    li.textContent = country.Country;
    li.textOverflow = 'ellipsis';
    li.addEventListener("click", () => {
      document.getElementById("searchDropdownInput").value = country.Country;
      dropdown.style.display = "none";
      selectedCountryCode = countryList.filter(c => c.Country == country.Country)[0].ISO;
      updateBarLineChart(selectedCountryCode);
    });
    dropdown.appendChild(li);
  });
  
  dropdown.style.display = filtered.length ? "block" : "none";
}

// Set up event listeners for the search dropdown
function setupSearchDropdown() {
  const input = document.getElementById("searchDropdownInput");
  const dropdown = document.getElementById("dropdownList");

  // Search handler
  input.addEventListener("input", () => {
    populateDropdown(input.value);
  });

  // Hide dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!document.querySelector(".dropdown-container").contains(e.target)) {
      dropdown.style.display = "none";
    }
  });
}
