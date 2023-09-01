# D3 - Interactive Donut and Bar Chart using TextBox

## Usage Instructions

1. Clone the repository to your local machine.
2. Launch a local server and open the `index.html` page in a web browser.
3. Input text into the `textarea` and click `Submit` to generate visualizations.
4. Interact with the charts to analyze character distribution and counts.

## Project Overview

The purpose of this homework is to provide hands-on experience in building and linking interactive visualizations using D3.js. By completing this assignment, you will gain proficiency in the following skills:

- Dynamically creating and parsing a string dataset in JavaScript
- Plotting values in a donut chart
- Plotting values in a bar chart
- Dynamically updating a chart based on user interactions
- Adding interactive tooltips to enhance user insights

The screenshot below offers a glimpse of the expected final interface:

![Example Interface](https://github.com/asu-cse578-f2022/homework-3-kevalshah13/blob/main/imgs/interface.png)

## Project Steps

### Step 0: Starting Code

Begin by setting up the initial codebase. You will find three panels on the `index.html` page. The top panel features a `textarea` HTML element and a `submit` button. Users can input text and click the button to generate visualizations. Don't forget to personalize the top section with your name and email.

### Step 1: Displaying a Donut Chart

Upon clicking the `Submit` button, you'll create a donut chart with three arcs that illustrate the distribution of grammar characters from the entered text. These arcs will represent the percentage of consonants, vowels, and punctuation in the text. Implement the following:

- Dynamically read and store the entered text from the `textarea`.
- Clear and recreate the necessary data structures when the submit button is pressed.
- Center the donut chart within the `#pie_div` SVG.
- Choose an appropriate categorical D3 color scale for the chart.
- Emphasize the currently hovered arc by increasing its border thickness from 1 to 4 pixels.
- Display the count of the selected character type inside the donut, ensuring legibility and fit within the inner ring.

### Step 2: Displaying a Linked Bar Chart

Clicking on a donut chart arc should trigger the creation of a bar chart in the bottom right panel. This bar chart will show the counts of characters based on the selected arc type. Implement the following:

- Center the bar chart within the panel, maintaining a reasonable margin.
- Give the bars in the bar chart the same color as the clicked arc in the donut chart.
- If the user clicks on a different arc, re-load the bar chart with the appropriate color.
- Recompute the axes for the new selection.
- Clear the bar chart if the `submit` text button is clicked.

### Step 3: Adding a Hover Tooltip to the Bar Chart

Enhance the user experience by integrating hover tooltips into the bar chart. When users hover over a bar, display the exact count for that character. Implement the following:

- Create a tooltip that shows the hovered character's count.
- Style the tooltip with a white background and black rounded border (width of 2 pixels).
- Ensure the tooltip follows the user's mouse movements along the bar.
- Hide the tooltip when the mouse is no longer over the bar.

![Reload](https://github.com/asu-cse578-f2022/homework-3-kevalshah13/blob/main/imgs/tooltip.gif)

### Testing and Finalization

- Test the chart with various country selections to ensure proper functionality.
- Ensure that the visualization resembles the provided example screenshot.

## Data Description

The data for your visualizations will come from the text entered into the `textarea` element. The characters will fall into three categories: consonants, vowels, and punctuation (period, comma, question mark, exclamation mark, colon, and semi-colon). Ignore other characters, including spaces and symbols.

## Project Outcome

Upon completing this interactive D3.js data visualization assignment, you will achieve the following project outcomes:

- **Dynamic Data Visualization:** You will gain the ability to dynamically create and parse datasets of characters from user-inputted text using JavaScript. These datasets will be visualized through interactive charts.
- **Donut Chart:** You will successfully implement a donut chart that visually depicts the distribution of different character types (consonants, vowels, punctuation) within the submitted text. Users can interact with the chart to gain insights into the composition of characters.
- **Bar Chart Linking:** By clicking on specific arcs in the donut chart, you will trigger the generation of a linked bar chart. This bar chart will display character counts based on the selected arc, offering users a comprehensive view of character frequency.
- **User Interaction:** The interface will empower users to explore and analyze the entered text by engaging with the interactive charts. Hovering over arcs and bars will provide additional information, enriching the user experience.
- **Tooltips:** You will successfully integrate interactive tooltips into the bar chart, enabling users to view precise character counts as they hover over individual bars. This feature will significantly enhance the usability of the interface.

