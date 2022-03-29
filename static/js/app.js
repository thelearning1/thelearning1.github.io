// 1. Use the D3 library to read in the `samples.json`.
const samples_json = "https://raw.githubusercontent.com/thelearning1/thelearning1.github.io/main/static/js/samples.json"
function gimmePlots(id)  {
    d3.json(samples_json).then(dataSamples =>{
        console.log(dataSamples)
        
        //pull the otu ids as a variable
        let ids = dataSamples.samples[0].otu_ids;
        console.log(ids)
        
        //pull the top 10 values to fill the chart with
        let sampleValues = dataSamples.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        
        //pull the top 10 labels to create the hover labels
        let labels = dataSamples.samples[0].otu_labels.slice(0,10);
        console.log (labels)
        
        // get only top 10 otu ids for plot. 
        let top10 = (ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        let OTU_id = top10.map(d => "OTU " + d);
        console.log(`OTU IDS: ${OTU_id}`)
     
        // 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        //create the trace for the plot
        let bar_trace = {
            // * Use `sample_values` as the values for the bar chart.
            x: sampleValues,
            // * Use `otu_ids` as the labels for the bar chart.
            y: OTU_id,
            // * Use `otu_labels` as the hovertext for the chart.
            text: labels,
            marker: {color: 'red'},
            type:"bar",
            orientation: "h",
        };
        // create data variable
        let bar_data = [bar_trace];

        // create layout variable to set plots layout
        let bar_layout = {
            title: "Top OTU Comparison",
            yaxis:{tickmode:"linear",},
            margin: {
                l: 50,
                r: 50,
                t: 50,
                b: 50
            }
        };
    // display the bar chart
    Plotly.newPlot("bar", bar_data, bar_layout);


        // 3. Create a bubble chart that displays each sample.
        let bub_trace = {
            // * Use `otu_ids` for the x values.
            x: dataSamples.samples[0].otu_ids,
            // * Use `sample_values` for the y values.
            y: dataSamples.samples[0].sample_values,
            mode: "markers",
            // * Use `sample_values` for the marker size.
            marker: {
                size: dataSamples.samples[0].sample_values,
                // * Use `otu_ids` for the marker colors.
                color: dataSamples.samples[0].otu_ids
            },
            // * Use `otu_labels` for the text values.
            text:  dataSamples.samples[0].otu_labels

        };

        // make the bubble layout a variable
        let bub_layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        // assign all the data to a variable 
        let bub_data = [bub_trace];

    // create the bubble plot
    Plotly.newPlot("bubble", bub_data, bub_layout); 
    
    });
}

// 4. Display the sample metadata, i.e., an individual's demographic information.
// create the function to get the necessary data for the existing Demographics panel
function gimmeDemog(id) {
// d3.json to read the data
    d3.json(samples_json).then((samplesData)=> {
        // get the metadata index 
        let metadata = samplesData.metadata;

        // sort metadata by the id
        let results = metadata.filter(meta => meta.id.toString() === id)[0];

        // make a variable to d3.select the panel
        let demogData = d3.select("#sample-metadata");
        
        // clean out the panel
        demogData.html("");

    // 5. Display each key-value pair from the metadata JSON object somewhere on the page.
    // grab the necessary demographic data data for the id and append the info to the panel

        Object.entries(results).forEach((key) => {   
            demogData.append("h5").text(key[0] + " - " + key[1] + "\n");    
        });
    });
}

// 6. Update all of the plots any time that a new sample is selected.
// create the function for repopulating the page after changing the dropdown menu option
function optionChanged(id) {
    gimmePlots(id);
    gimmeDemog(id);
}

// Function for initializing page data
function init() {
    // variable to d3.select the dropdown
    let dropdownMenu = d3.select("#selDataset");

    // pull the data in
    d3.json(samples_json).then((samplesData)=> {
        // get the id data to the dropdwown menu
        samplesData.names.forEach(names => 
            dropdownMenu.append("option").text(names).property("value")
        );

        // run the other two functions to populate the page
        gimmePlots(data.names[0]);
        gimmeDemog(data.names[0]);
    });
}


// Run the startup function
init();





