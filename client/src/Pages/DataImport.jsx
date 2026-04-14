import { useState } from "react";
import { analyzeDataset } from "../lib/api";
import { parseCSV, isSupportedFile, formatFileSize } from "../lib/csvParser";
import { CloudUpload  } from "lucide-react";

function DataImport() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedDataset, setParsedDataset] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
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

  function handleDragOver(e){
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave(e){
    e.preventDefault();
    setDragActive(false);
  }

  function handleDrop(e){
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
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
   <label
    htmlFor="fileUpload"
    onDrop={handleDrop}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    className={`mt-6 mb-6 flex min-h-[340px] w-full cursor-pointer flex-col item-center justify-center rounded-[32px] border border-dashed px-6 py-12 text-center transition-all duration-300
   ${
    dragActive ? "border-violet-300 bg-violet-500/10 shadow-[0_0_40px_rgba(168,85,247,0.28)]" 
    : "border-violet-300/40 bg-[#1b0728] shadow-[0_0_32px_rgba(139,92,246,0.14)] hover: border-violet-300/50"
    }`
    }
   >
    <div className = "mb-6 flex h-15 w-15 items-center justify-center rounded-full bg-violet-500/15 shadow-[0_0_24px_rgba(139,92,246,0.25)]">
      <CloudUpload className="h-9 w-9 text-violet-500" />
    </div>

    <h2 className="text-3xl font-semibold tracking-tight  text-white md:text-4xl">
      Initialize New Observation
    </h2>

    
  <p className="mt-4 max-w-2xl text-sm leading-7 text-violet-200/60 md:text-lg">
    Drop your CSV, TSV, or TXT data stream here to begin analysis.
  </p>

  <span className="mt-8 inline-flex rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(168,85,247,0.45)] md:px-10 md:py-4 md:text-lg">
    Upload Files
  </span>

   </label>
  );
}

export default DataImport;
