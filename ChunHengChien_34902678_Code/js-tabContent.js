// js/tabContent.js
// Content and functionality for the tabs in the description section

// Tab content definitions
const tabContents = {
  intro: {
    title: "Introduction",
    paragraphs: [
      `This project explores the relationship between <strong>QS university rankings,
      international student mobility and national economic indicators</strong>.`,

      `By comparing countries that export and import international students,
      the study aims to uncover how educational quality and economic conditions
      influence global student movement patterns.
      The findings could inform more effective international education policies.`,

      `The target audience of this project includes governments, educational institutions, and students around the world.
      The main findings aim to provide inspiration and insights, 
      while the highly interactive design allows audiences from different backgrounds to explore the content according to their interests,
      catering to the diverse needs of all user groups.`,

      `This project adopts a hybrid-driven approach. While the data story highlights the key findings, it also supports user-driven exploration.
      We hope that users can discover previously unnoticed correlations or patterns through the dashboard. For detailed usage instructions, please refer to the <strong>"How to use it?"</strong> page.`,
      
      `The data story is mainly divided into three parts: <strong>Student Mobility and QS Ranking, Student Mobility and Economic Indicators</strong>, and Focus on Continents.
      Each section explores international student mobility from different perspectives, identifying the most impactful or relevant indicators,
      or highlighting regional differences in data distribution. You can access each section via the tabs above.`
    ],
    button: null
  },
  qs: {
    title: "Student Mobility and QS Ranking",
    paragraphs: [
      `In this section, we explore how student mobility correlates with key indicators from the QS World University Rankings across different countries. 
      Through visual comparisons and data-driven insights, we highlight several notable patterns.`,

      `<strong>QS-Ranked University Count</strong>`,
      `This figure illustrates a clear trend: countries with a higher number of QS-ranked universities tend to attract more international students. 
      This pattern holds consistently across all continents, indicating that the presence of prestigious institutions plays a significant role in a country's ability to draw students from abroad. 
      In other words, the QS-Ranked University Count emerges as a critical factor when assessing a country's attractiveness in the global education landscape.`,

      `<strong>International Student Ratio</strong>`,
      `We examine the relationship between student net flow and the international student ratio. 
      While this relationship is not as strong as the one observed in the previous analysis, a general upward trend can still be observed. 
      Notably, this trend is more pronounced in regions outside of Asia, suggesting that a higher proportion of international students within universities may still contribute positively to a country's overall student mobility profile.`
    ],
    buttons: [
      {
        text: "View QS-Ranked University Count",
        onClick: () => {
          activeContinents = new Set(["Asia", "Europe", "Africa", "Oceania", "Americas"]);
          d3.select("#ySelect").property("value", "inflow").dispatch("change");
          d3.select("#xSelect").property("value", "qs_count").dispatch("change");
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      },
      {
        text: "View International Student Ratio",
        onClick: () => {
          activeContinents = new Set(["Europe", "Africa", "Oceania", "Americas"])
          d3.select("#ySelect").property("value", "net_flow").dispatch("change");
          d3.select("#xSelect").property("value", "isr_score").dispatch("change");
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    ]
  },
  econ: {
    title: "Student Mobility and Economy Indicators",
    paragraphs: [
      `In this section, we examine how student mobility correlates with national economic performance. 
      While educational quality is a known factor influencing international student flows, 
      we hypothesised that a country's economic strength might also play a crucial role. 
      By comparing student inflow data with key economic indicators, we identified several compelling patterns.`,

      `<strong>GDP and Student Inflow</strong>`,

      `Unsurprisingly, GDP-related indicators emerged as strong predictors of international student inflow. 
      Countries with higher Gross Domestic Product, whether measured by GDP based on purchasing-power-parity (PPPSH) or GDP: US-dollars (NGDPD), tend to attract more international students.`,

      `This finding suggests that economic strength not only reflects a country's ability to fund high-quality educational institutions, 
      but also signals broader factors that influence students' decisions, such as quality of life, employment opportunities, and visa accessibility. 
      For instance, students may view wealthier countries as offering more stable and promising environments for both study and post-graduate career development.`,

      `Moreover, this trend appears across multiple regions, reinforcing the global nature of this pattern. 
      While there are some exceptions, the overall positive correlation between GDP and student inflow highlights how economic development and educational attractiveness often go hand in hand.`
    ],
    buttons: [
      {
        text: "View PPPSH",
        onClick: () => {
          activeContinents = new Set(["Asia", "Europe", "Africa", "Oceania", "Americas"]);
          d3.select("#ySelect").property("value", "inflow").dispatch("change");
          d3.select("#xSelect").property("value", "PPPSH").dispatch("change");
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      },
      {
        text: "View NGDPD",
        onClick: () => {
          activeContinents = new Set(["Asia", "Europe", "Africa", "Oceania", "Americas"]);
          d3.select("#ySelect").property("value", "inflow").dispatch("change");
          d3.select("#xSelect").property("value", "NGDPD").dispatch("change");
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    ]
  },
  continent: {
    title: "Focus on Continents",
    paragraphs: [
      `In this section, we zoom out from individual countries to examine how different regions — specifically Asia, the Americas, and Europe — compare across various student mobility and QS ranking indicators. 
      By separating the data by continent, we aim to uncover broader geographic trends that might otherwise be obscured in global-level analyses.`,

      `<strong>Key Insights</strong>`,

      `When comparing Asia, the Americas, and Europe — the three continents with the richest data coverage — a striking pattern emerges. Both Europe and the Americas display similar distributions across student net flow and QS-related indicators. 
      Specifically, student net flow shows a negative correlation with average university ranking (i.e., a better [lower] ranking corresponds with higher student net flow), and positive correlations with other QS metrics such as number of ranked universities and academic reputation. 
      This suggests that higher-ranked institutions in these regions are more likely to attract international students than lower-ranked ones.`,

      `Asia, however, presents a more complex picture. At the continental level, 
      there appears to be no strong positive or negative correlation between student net flow and the QS indicators. 
      Upon closer inspection, this ambiguity can largely be explained by the presence of two major outliers: 
      China and India — both countries are prominent sources of outbound international students, and their massive student outflows skew the overall regional trend.`,

      `Interestingly, when we narrow our focus to student inflow (i.e., the number of incoming international students), the differences between Asia, the Americas, and Europe become less pronounced. 
      Across all three continents, the correlation between student inflow and QS indicators remains relatively consistent, suggesting that regardless of region, countries with stronger QS performance tend to attract more international students.`,

      `This comparison highlights the importance of considering both directionality (inflow vs. net flow) and regional outliers when interpreting student mobility trends on a global scale.`
    ],
    button: {
      text: "View the Data",
      onClick: () => {
        activeContinents = new Set(["Europe", "Asia", "Americas"])
        d3.select("#ySelect").property("value", "inflow").dispatch("change");
        d3.select("#xSelect").property("value", "rank_display").dispatch("change");
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  },
  info: {
    title: "Data Information",
    paragraphs: [
      `To understand the dynamics of international student mobility and its potential influencing factors, we integrated and explored three major datasets. 
      These datasets span education statistics, global university rankings, and macroeconomic indicators. 
      Below is a detailed breakdown of each dataset, including its structure, coverage, and purpose within the project.`,

      `<strong>1. UNESCO – Inbound International Mobile Students (1998–2024)</strong><br/>
      <em>Source:</em> UNESCO Data Browser<br/>
      <em>Shape:</em> 9,681 rows × 5 columns<br/>
      <em>Columns:</em><br/>
      • <code>IndicatorId</code>: Identifies whether the data row refers to student net flow or student inbound<br/>
      • <code>geoUnit</code>: Country or region code (includes ISO3C and UNESCO region codes)<br/>
      • <code>value</code>: The actual count of students<br/>
      • <code>qualifier</code>: Indicates data quality or availability status<br/>
      • <code>magnitude</code>: Reflects adjustments (e.g., estimates or aggregated values)<br/>
      <em>Dataset Structure:</em><br/>
      • Student Net Flow: 2,026 rows<br/>
      • Student Inbound: 7,655 rows<br/><br/>
      This dataset is central to our analysis of student mobility trends across countries. 
      We used only data from 2022 to 2024, focusing on country-level data using standardized ISO3C country codes. 
      UNESCO-defined regional codes (e.g., "AIMS") were excluded to ensure consistency in comparisons.`,

      `<strong>2. QS World University Rankings (2022–2024)</strong><br/>
      <em>Source:</em> Kaggle – QS Ranking Dataset<br/>
      <em>Shape:</em> 4,221 rows × 16 columns<br/>
      <em>Key Fields:</em><br/>
      • <code>university_name</code>, <code>location</code>, <code>rank_display</code>, <code>score</code>, <code>size</code>, <code>focus</code>, etc.<br/>
      • QS sub-scores and sub-rankings such as Academic Reputation (AR), Employer Reputation (ER), and International Faculty Ratio (IFR)<br/><br/>
      This dataset includes detailed ranking information for over 4,000 universities worldwide. 
      Each entry corresponds to a university in a given year (2022–2024), and includes both overall and component scores.<br/><br/>
      To ensure consistency with other datasets, all country codes were converted from ISO2C to ISO3C. 
      The <code>rank_display</code> field — which contains ranks in varied formats (e.g., 52, 601–700, 1400+) — was standardized into a single numeric value 
      to support quantitative analysis. A histogram of rank distribution was also generated to validate the transformation logic, 
      revealing a natural clustering in the lower-ranked range due to how QS reports ranks beyond position 800.`,

      `<strong>3. International Monetary Fund – World Economic Outlook (1980–2029)</strong><br/>
      <em>Source:</em> IMF WEO October 2024 Database<br/>
      <em>Shape:</em> 8,625 rows × 60 columns<br/>
      <em>Key Fields:</em><br/>
      • <code>ISO</code>: ISO3C country code<br/>
      • <code>WEO.Subject.Code</code>: Economic indicator (e.g., GDP, inflation)<br/>
      • <code>Country</code>, <code>Subject.Descriptor</code>, <code>Units</code>, <code>Scale</code><br/>
      • <code>X2022</code>, <code>X2023</code>, <code>X2024</code>: Year-specific values for each indicator<br/><br/>
      This dataset provides country-level economic statistics and forecasts. 
      For this project, we extracted three years (2022–2024) of economic indicators such as Nominal GDP (NGDPD) 
      and Purchasing Power Parity per capita (PPPSH). These values were used to investigate potential correlations between 
      a country's economic strength and its attractiveness to international students.<br/><br/>
      To maintain data integrity, we filtered out incomplete or inconsistent entries (e.g., blank cells or "n/a" values) 
      and validated that economic indicators used the same currency and unit across countries.`
    ],
    button: {
      text: "View Details of WEO Subject Code",
      onClick: () => showWEOExplanationModal()
    }
  }
};

// Render tab content
function renderTab(tabKey) {
  const content = tabContents[tabKey];
  const descriptionContent = document.getElementById("descriptionContent");
  
  if (!content) return;

  let html = `<h2>${content.title}</h2>`;
  
  content.paragraphs.forEach(p => {
    html += `<p>${p}</p>`;
  });

  if (Array.isArray(content.buttons)) {
    html += `<div class="action-button-group">`;
    content.buttons.forEach(btn => {
      html += `<button class="action-button">${btn.text}</button>`;
    });
    html += `</div>`;
    descriptionContent.innerHTML = html;

    const actionButtons = document.querySelectorAll(".action-button");
    actionButtons.forEach((el, i) => {
      el.onclick = content.buttons[i].onClick;
    });
  } else if (content.button) {
    html += `<button class="action-button">${content.button.text}</button>`;
    descriptionContent.innerHTML = html;
    document.querySelector(".action-button").onclick = content.button.onClick;
  } else {
    descriptionContent.innerHTML = html;
  }
}

// Setup tab functionality
function setupTabs() {
  const buttons = document.querySelectorAll(".tab-button");
  
  buttons.forEach(btn => {
    if (btn.dataset.tab) { // Skip the "How to Use?" button which uses onclick directly
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTab(btn.dataset.tab);
      });
    }
  });

  // Initialize with intro tab
  renderTab("intro");
}
