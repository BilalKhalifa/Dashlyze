export async function analyzeDataset(dataSet) {
    const response = await fetch("http://localhost:4000/analyze", {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ dataset: dataSet })
    });

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Failed to analyze dataset");
    }

    return data;
}