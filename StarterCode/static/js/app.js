//Define function to build Metadata
function buildMetaData(sampleNumber) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var sample = metadata.filter(d => d.id == sampleNumber);
      var sample = sample[0]
      var metadata_object = d3.select("#sample-metadata");
      metadata_object.html("")
      Object.entries(sample).forEach(([key, value]) => {
        metadata_object.append("h6").text(`${key.toUpperCase()}: ${value}`);
      })
    })
  };
  
  //Define Function to build Charts
  function buildCharts(sampleNumber) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      var sample = samples.filter(d => d.id == sampleNumber);
      sample = sample[0]
      var otu_ids = sample.otu_ids;
      var otu_labels = sample.otu_labels;
      var sample_values = sample.sample_values;
      var metadata = data.metadata;
      var sample = metadata.filter(d => d.id == sampleNumber);
      var sample = sample[0]
      var wfreq = sample.wfreq;

//Bar Chart  
      barTrace = {
        y: otu_ids.slice(0, 10).map(otu => `OTU ${otu}`).reverse(),
        x: sample_values.slice(0, 10).reverse(),
        marker: {
          color: ["red", "orange", "yellow", "green", "blue", "purple", "grey", "pink", "teal", "peru"],
          opacity: 0.75
        },
        type: "bar",
        text: otu_labels.slice(0, 10).reverse(),
        orientation: "h"
      }
      var layout = {
        title: "Bar",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU IDs" }
      };
      Plotly.newPlot("bar", [barTrace], layout);

//Pie Chart
      var data = [{
        values: otu_ids.slice(0, 10),
        labels: sample_values,
        type: 'pie',
        marker: {
          color: ["red", "orange", "yellow", "green", "blue", "purple", "grey", "pink", "teal", "peru"],
        }
      }];
      var layout = {
        title: "Pie"
      };

      Plotly.newPlot('pie', data, layout);

//Bubble Trace Chart
      var bubbleTrace = {
        x: otu_ids,
        y: sample_values,
        mode: 'markers',
        marker: {
          colorscale: 'Blackbody',
          color: sample_values,
          opacity: 0.6,
          size: sample_values
        },
        text: otu_labels
      };
      var data = [bubbleTrace];
      var layout = {
        title: 'Bubbles',
        showlegend: false,
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" }
      };
      Plotly.newPlot('bubble', data, layout);
    })
  };
  
  //Initialize function
  function init() {
    var dropdown = d3.select("#selDataset");
    d3.json("samples.json").then((d) => {
      var samplenames = d.names;
      samplenames.forEach((sample) => {
        dropdown.append("option").text(sample).property("value", sample);
      })
      var firstsample = samplenames[0];
      buildMetaData(firstsample);
      buildCharts(firstsample);
    });
  }
  init();
  function optionChanged(sampleNumber) {
    buildMetaData(sampleNumber);
    buildCharts(sampleNumber);
  };


  //Notes
//Charts are all in one loop
//One section graphs
//One section initializing function along with dd menu
//Separate function for metadata



//Data is a dictionary with 3 items
//Names
//Metadata
//Samples