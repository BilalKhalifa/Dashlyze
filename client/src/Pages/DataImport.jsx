import { useState } from "react";
import { analyzeDataset } from "../lib/api";
import { parseCSV, isSupportedFile, formatFileSize } from "../lib/csvParser";

function DataImport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedDataset, setParsedDataset] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file) {
    if (!file) return;

    if (!isSupportedFile(file)) {
      setError("Unsupported file type. Please upload CSV, TSV, or TXT.");
      setSelectedFile(null);
      setParsedDataset(null);
      setAnalysisResult(null);
      return;
    }

    setError("");
    setAnalysisResult(null);
    setSelectedFile(file);
    setIsParsing(true);

    const parsed = await parseCSV(file);

    setIsParsing(false);

    if (parsed.error) {
      setError(parsed.error);
      setParsedDataset(null);
      return;
    }

    const dataset = {
      columns: parsed.columns,
      rows: parsed.rows,
      metadata: {
        sourceType: "csv",
        fileName: file.name,
        fileSize: file.size,
      },
      preview: parsed.preview,
      rawText: parsed.rawText,
    };

    setParsedDataset(dataset);
  }

  function handleInputChange(event) {
    const file = event.target.files?.[0];
    handleFile(file);
  }

  function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    handleFile(file);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  async function handleAnalyze() {
    if (!parsedDataset) {
      setError("Please upload and parse a dataset first.");
      return;
    }

    try {
      setError("");
      setIsAnalyzing(true);
      setAnalysisResult(null);

      const result = await analyzeDataset({
        columns: parsedDataset.columns,
        rows: parsedDataset.rows,
        metadata: parsedDataset.metadata,
      });

      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || "Something went wrong during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div style={{ padding: "24px", color: "#fff" }}>
      <h1>Data Import</h1>
      <p>Upload a file, preview the parsed dataset, then send it to the backend.</p>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        style={{
          border: "2px dashed #666",
          borderRadius: "12px",
          padding: "24px",
          marginTop: "20px",
          marginBottom: "20px",
          background: "#1a1a1a",
        }}
      >
        <p>Drag and drop a CSV file here, or choose one manually.</p>
        <input type="file" accept=".csv,.tsv,.txt" onChange={handleInputChange} />
      </div>

      {selectedFile && (
        <div style={{ marginBottom: "16px" }}>
          <strong>Selected file:</strong> {selectedFile.name} (
          {formatFileSize(selectedFile.size)})
        </div>
      )}

      {isParsing && <p>Parsing file...</p>}

      {error && (
        <div style={{ color: "#ff6b6b", marginBottom: "16px" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {parsedDataset && (
        <div style={{ marginTop: "24px" }}>
          <h2>Parsed Dataset</h2>
          <p>
            <strong>Columns:</strong> {parsedDataset.columns.length} |{" "}
            <strong>Rows:</strong> {parsedDataset.rows.length}
          </p>

          <h3>Column Types</h3>
          <ul>
            {parsedDataset.columns.map((col) => (
              <li key={col.name}>
                {col.name} - {col.type}
              </li>
            ))}
          </ul>

          <h3>Preview</h3>
          <div style={{ overflowX: "auto" }}>
            <table
              border="1"
              cellPadding="8"
              style={{ borderCollapse: "collapse", width: "100%" }}
            >
              <thead>
                <tr>
                  {parsedDataset.columns.map((col) => (
                    <th key={col.name}>{col.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {parsedDataset.rows.slice(0, 5).map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {parsedDataset.columns.map((col) => (
                      <td key={col.name}>{String(row[col.name] ?? "")}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            style={{
              marginTop: "20px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Dataset"}
          </button>
        </div>
      )}

      {analysisResult && (
        <div style={{ marginTop: "32px" }}>
          <h2>Backend Response</h2>
          <p>
            <strong>Message:</strong> {analysisResult.message}
          </p>

          {analysisResult.widget && (
            <div>
              <p>
                <strong>Widget Title:</strong> {analysisResult.widget.title}
              </p>
              <p>
                <strong>Widget Type:</strong> {analysisResult.widget.type}
              </p>
              <p>
                <strong>X Field:</strong> {analysisResult.widget.config?.xField}
              </p>
              <p>
                <strong>Y Field:</strong> {analysisResult.widget.config?.yField}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DataImport;
