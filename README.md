# belly-button-challenge
Module 14 Challenge

Description
As the search for extra-terrestrial life continues, every person's belly button is brimming with life, hosting a wide range of inhabitants. While communication with the belly button world is limited, there is no shortage of data on the biodiversity. The challenge takes a dataset on samples from belly buttons to create and deploy an interactive website with three distinct visualizations. Static websites are effective in disseminating information, but dynamic websites open up a level of interactivty for the flowing human mind. Using Javascript and the d3 and Plotly libraries, users can swap test subjects and display the corresponding data.

In this repository, there is a static folder containing two Javascript files as well as a HTML file in the root directory. The repository also contains the dataset as a json file. The app.js makes a d3 call to retrieve the dataset and creates two graphs with Plotly: a bar graph and a bubble chart of the samples in the test subject's navel. It also fills out a dropdown menu of all the test subjects and populates a panel with the currently displayed test subject. Upon changing the dropdown, the browser updates the panel information and visualizations.

The bonus.js mirrors much of app.js, but includes additional code for a gauge meter for wash frequency. The script contains two different approaches to the gauge meter. The first adapts and uses Plotly's gauge chart. The second uses Plotly's pie chart, which is currently commented out. Both seem to work fine, the tricky part was using some light trigonometry to create the needle to point at the approriate scrubbing value. The bonus.js defaults to the gauge chart instead of the pie chart to avoid layout issues.

The index.html puts it altogether to display the website. For completeness, index.html points to bonus.js to fill out the website. The code was subsequently deployed to GitHub Page.

Visuals
Dropdown and Panel Information

image

Bar Graph of Top Ten OTUs

image

Bubble Chart of OTUs

image

Gauge Meter of Wash Frequency

image
