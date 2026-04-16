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
    className={`mt-6 mb-6 flex min-h-[340px] w-full cursor-pointer flex-col gap-6 items-center justify-center rounded-[32px] border border-4 border-dashed px-6 py-12 text-center transition-all duration-300
   ${
    dragActive ? "border-violet-300 bg-[#3b1870]/50 shadow-[0_0_40px_rgba(168,85,247,0.28)]" 
    : "border-violet-300/40 bg-[#3b1870]/30 shadow-[0_0_32px_rgba(139,92,246,0.14)] hover: border-violet-300/50"
    }`
    }
   >
    <div className = "mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#7c3aed] shadow-[0_0_24px_rgba(139,92,246,0.25)]">
      <CloudUpload className="h-9 w-9 text-[#f0e9ff]" />
    </div>

    <h2 className="text-3xl font-semibold tracking-tight  text-white md:text-4xl">
      Initialize New Observation
    </h2>

    <p className="mt-4 max-w-2xl text-sm leading-7 text-violet-200/60 md:text-lg">
      Drop your CSV, TSV, or TXT data stream here to begin analysis.
    </p>

    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[#7c3aed] to-[#9f5cff] text-sm font-medium text-[#f0e9ff] !px-6 !py-2 hover:from-[#9f5cff] hover:to-[#7c3aed] transition-colors duration-300 cursor-pointer">
      Upload Files
    </span>


   </label>
  );
}

export default DataImport;
