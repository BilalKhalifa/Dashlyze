function analyzeDataSet(req, res){
    const  dataset  = req.body?.dataset;

    if(!dataset || !Array.isArray(dataset.rows) || !Array.isArray(dataset.columns)){
        return res.status(400).json({message : "Invalid Dataset format. Expected { rows: [], columns: [] }"});
    }

    return res.status(200).json({
        message : "Mock Analysis Complete",
        widget : {
            "id" : "w1",
            "type" : "bar_chart",
            "title" : "Sample Bar Chart",
            "layout" : { "x": 0, "y": 0, "w": 6, "h": 4 },
            "config": {
                xField : dataset.columns[0]?.name || "x",
                yField : dataset.columns[1]?.name || "y",
            }
        }
    })
}

module.exports = { analyzeDataSet };