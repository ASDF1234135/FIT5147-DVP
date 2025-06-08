// js/tourGuide.js
// Functions for the tour guide feature

// Define tour steps
const tourSteps = [
  {
    element: "#bubbleChartWrapper",
    text: `Here is the main bubble chart, which can be used to analyze the relationships between different indicators. 
          The continent legend serves as a filter option.`,
    position: "right"
  },
  {
    element: "#xSelect",
    text: "This is selector for x axis, you can select an indicator you want to show on x axis",
    position: "right"
  },
  {
    element: "#ySelect",
    text: "This is selector for y axis, you can select an indicator you want to show on y axis",
    position: "right"
  },
  {
    element: "#toggleLabelsElement",
    text: "This is a checkbox for displaying the country labels on bubble chart",
    position: "top"
  },
  {
    element: "#sizeSelect",
    text: "This is selector for bubble size, you can select an indicator you want to show on bubble size",
    position: "top"
  },  
  {
    element: "#dropdownInline",
    text: "This is selector for QS indicator aggregation method, you can select a method you want.",
    position: "top"
  },
  {
    element: "#barLineChartContainer",
    text: "This is bar chart with line (2 y-axis). It shows the data changes over time in a specific country",
    position: "left"
  },
  {
    element: "#dropdownContainer",
    text: "This is a search box. You can search the country you preferred, the result will be shown on the Bar Chart above",
    position: "top"
  }
];

// Tour state variables
let currentStep = 0;
let currentTarget = null;

// Start the tour
function startTour() {
  window.scrollTo({
    top: 100,
    behavior: "smooth"
  });

  const overlay = document.getElementById("tourOverlay");
  const dialog = document.getElementById("tourDialog");
  const text = document.getElementById("tourText");
  const prevBtn = document.getElementById("tourPrev");
  const nextBtn = document.getElementById("tourNext");
  const endBtn = document.getElementById("tourEnd");

  function positionDialog(target, position) {
    const rect = target.getBoundingClientRect();
    const margin = 10;
    const dialogWidth = dialog.offsetWidth;
    const dialogHeight = dialog.offsetHeight;

    let top = 0, left = 0;

    switch (position) {
      case "top":
        top = rect.top - dialogHeight - margin;
        left = rect.left + (rect.width - dialogWidth) / 2;
        break;
      case "bottom":
        top = rect.bottom + margin;
        left = rect.left + (rect.width - dialogWidth) / 2;
        break;
      case "right":
        top = rect.top + (rect.height - dialogHeight) / 2;
        left = rect.right + margin;
        break;
      case "left":
        top = rect.top + (rect.height - dialogHeight) / 2;
        left = rect.left - dialogWidth - margin;
        break;
      default:
        top = rect.top + margin;
        left = rect.left + margin;
    }

    const maxLeft = window.scrollX + window.innerWidth - dialogWidth - margin;
    const maxTop = window.scrollY + window.innerHeight - dialogHeight - margin;

    left = Math.max(window.scrollX + margin, Math.min(left, maxLeft));
    top = Math.max(window.scrollY + margin, Math.min(top, maxTop));

    dialog.style.top = `${top}px`;
    dialog.style.left = `${left}px`;
  }

  function showStep(index) {
    const step = tourSteps[index];
    const target = document.querySelector(step.element);
    if (!target) return;

    document.querySelectorAll(".tour-highlight").forEach(el =>
      el.classList.remove("tour-highlight")
    );
    target.classList.add("tour-highlight");
    text.innerText = step.text;

    currentTarget = target;

    // Scroll to the target element
    target.scrollIntoView({ behavior: "smooth", block: "center" });

    // Track scrolling until stable before positioning dialog
    let lastY = null;
    let stableFrames = 0;

    function waitForScrollSettle() {
      const currentY = target.getBoundingClientRect().top;

      if (lastY !== null && Math.abs(currentY - lastY) < 2) {
        stableFrames++;
      } else {
        stableFrames = 0;
      }

      lastY = currentY;

      if (stableFrames >= 10) {
        // When position has minimal change for 10 frames, consider scrolling complete
        positionDialog(target, step.position);
        overlay.style.display = "block";
        prevBtn.style.display = index === 0 ? "none" : "inline-block";
        nextBtn.style.display = index === tourSteps.length - 1 ? "none" : "inline-block";
      } else {
        requestAnimationFrame(waitForScrollSettle);
      }
    }

    requestAnimationFrame(waitForScrollSettle);
  }

  function endTour() {
    overlay.style.display = "none";
    document.querySelectorAll(".tour-highlight").forEach(el =>
      el.classList.remove("tour-highlight")
    );
    window.removeEventListener("scroll", syncPosition);
    window.removeEventListener("resize", syncPosition);
  }

  function syncPosition() {
    if (currentTarget && tourSteps[currentStep]) {
      positionDialog(currentTarget, tourSteps[currentStep].position);
    }
  }

  // Set up event listeners
  prevBtn.onclick = () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  };

  nextBtn.onclick = () => {
    if (currentStep < tourSteps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  };

  endBtn.onclick = endTour;

  window.addEventListener("scroll", syncPosition);
  window.addEventListener("resize", syncPosition);

  // Start with the first step
  showStep(currentStep);
}

// Set up tour guide event listeners
function setupTourGuide() {
  // Tour is started by the "How to Use?" button which calls startTour directly
}
