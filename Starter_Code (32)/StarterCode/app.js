//Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    console.log(data);
});


// Function to fetch and handle the data
function dropMenu() {
    d3.json(url).then(data => {

        // Populate dropdown with sample IDs
        let names = data.names;
        let dropdownMenu = d3.select("#selDataset");
        names.forEach(name => {
            dropdownMenu.append("option").text(name).property("value", name);
        });


        // Initial plots with the first sample
        let firstSample = names[0];

        barChart(firstSample, data);
        bubbleChart(firstSample, data);
        metaData(firstSample, data);
        gaugeChart(firstSample, data);
    });
}

dropMenu()

// Function to populate the bar chart
function barChart(sample, data) {
        let samples = data.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
        let y_ticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let trace = {
            y: y_ticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h'
    };


        // Create the layout for the bar chart
        let barLayout = {
        title: `Top 10 OTUs for Sample ${sample}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
    };

        Plotly.newPlot("bar", [trace], barLayout);

}
    

    
// Function to populate the bubble chart
function bubbleChart(sample) {
    d3.json(url).then((data) => {
        let samples = data.samples;
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let sample_values = result.sample_values;
        let otu_labels = result.otu_labels;

        let bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        }];
        // Create the layout for the bubble chart
        let bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            xaxis: { title: "OTU ID" },
            hovermode: 'closest',
        };

        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    });
}
// Function to display the sample metadata
function metaData(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        // Select the panel to put data
        let panel = d3.select("#sample-metadata");

        // Clear existing data
        panel.html("");

        // Append new data
        Object.entries(result).forEach(([key, value]) => {
            panel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
// Function to populate the gaugechart
function gaugeChart(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];

        let wfreq = result.wfreq;

        // Gauge Chart
        let gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                type: "indicator",
                mode: "gauge+number",
                value: wfreq,
                title: { text: "Belly Button Washing Frequency" },
                gauge: {
                    axis: { range: [null, 9] },
                    bar: { color: "darkblue" },
                    steps: [
                        { range: [0, 1], color: 'rgba(232, 226, 202, .5)' },
                        { range: [1, 2], color: 'rgba(210, 206, 145, .5)' },
                        { range: [2, 3], color: 'rgba(202, 209, 95, .5)' },
                        { range: [3, 4], color: 'rgba(170, 202, 42, .5)' },
                        { range: [4, 5], color: 'rgba(110, 154, 22, .5)' },
                        { range: [5, 6], color: 'rgba(14, 127, 0, .5)' },
                        { range: [6, 7], color: 'rgba(10, 120, 22, .5)' },
                        { range: [7, 8], color: 'rgba(0, 105, 11, .5)' },
                        { range: [8, 9], color: 'rgba(0, 105, 11, .5)' }
                    ],
                    threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.75,
                        value: wfreq
                    }

                }
            }
        ];
        // Create the layout for the gauge chart
        let gaugeLayout = {
            width: 500,
            height: 400,
            margin: { t: 0, b: 0 },
        };

        Plotly.newPlot("gauge", gaugeData, gaugeLayout);
    });
}
// Dropdown change event handler
function optionChanged(newSample) {
    d3.json(url).then(data => barChart(newSample, data));
    d3.json(url).then(data => bubbleChart(newSample, data));
    d3.json(url).then(data => metaData(newSample, data));
    d3.json(url).then(data => gaugeChart(newSample, data));
}

// Initialize the dashboard
dropMenu();

// Fetch the JSON data and console log it
d3.json(url).then(function (data) {
    console.log(data);
}); 