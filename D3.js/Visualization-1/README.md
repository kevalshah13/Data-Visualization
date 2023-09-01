# D3 Simple - Interactive Lollipop Chart Project

## Project Overview

This project involves creating an interactive lollipop chart using D3.js to visualize female and male employment rates for selected countries over the years 1991 to 2022. The chart will enable users to dynamically change the country being visualized and observe the relationship between male and female employment rates.

## Project Steps

### HTML Setup

- Create an HTML file with a designated area for the visualization.

### SVG Setup

- Inside the designated visualization area, create an SVG element with a width of 1000 px and a height of 600 px.

### Dropdown and Data Loading

- Create a select dropdown element listing 5 countries from the dataset.
- Implement an event listener or onchange event that triggers the chart update when the country selection changes.

### Data Loading and Wrangling

- Load the `females_data.csv` and `males_data.csv` datasets from data folder.
- Convert the data attributes from string to numeric format for the selected countries.

### Axis Creation

- Create x- and y-axes using `d3.scaleTime` and `d3.scaleLinear`.
- Configure the ranges and domains for both axes.

### Lollipop Chart Creation

- For each year in the dataset, create lollipop chart elements for male and female employment rates.
- Offset the lollipops slightly to prevent overlap.
- Use different colors for male and female lollipops.

### Legend and Labels

- Add a legend in the upper right corner of the chart.
- Include colored squares with labels for "Female Employment Rate" and "Male Employment Rate."
- Add axis labels: "Year" for the x-axis and "Employment Rate" for the y-axis.

### Interactivity

- Implement interactivity that redraws the chart based on the selected country from the dropdown.
- Update the visualization to show the values for the newly selected country.

### Testing and Finalization

- Test the chart with various country selections to ensure proper functionality.
- Ensure that the visualization resembles the provided example screenshot.

### Example Image
![Reload](https://github.com/kevalshah13/Data-Visualization/blob/main/D3.js/Visualization-1/img/completed.png)

## Project Outcome

Upon completing this project, you will have developed an interactive lollipop chart using D3.js. The chart will offer insights into female and male employment rates over time, allowing users to explore and compare employment trends across different countries.

