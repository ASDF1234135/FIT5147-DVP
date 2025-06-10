// js/main.js
// Main initialization script

// Initialize all components when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Load data from sources
  loadAllData();
  
  // Set up UI components
  setupBubbleChartControls();
  setupSearchDropdown();
  setupTabs();
  setupWEOModal();
  setupTourGuide();
});
