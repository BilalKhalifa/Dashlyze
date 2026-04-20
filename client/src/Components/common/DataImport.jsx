import { useState } from "react";
import { parseCSV, isSupportedFile } from "../../lib/csvParser";
import { CloudUpload  } from "lucide-react";

function DataImport({ setDataset , setError }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("idle");

  async function handleFile(file) {
    if (!file) return;

    if (!isSupportedFile(file)) {
      setError("Unsupported file type. Please upload CSV, TSV, or TXT.");
      setSelectedFile(null);
      return;
    }

  try {
      // 2) Start run
      setError("");
      setSelectedFile(file);
      setIsParsing(true);

      setStatus("reading");
      setProgress(10);
      await sleep(120);

      // 3) Move into parsing stage
      setStatus("parsing");
      setProgress(35);
      await sleep(120);

      const parsed = await parseCSV(file);

      setProgress(80);
      await sleep(100);

      // 4) Handle parse result
      if (parsed.error) {
        setError(parsed.error);
        setStatus("error");
        setProgress(0);
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

      setDataset(dataset);

      setProgress(100);
      setStatus("success");
    } catch (err) {
      setError(err?.message || "Failed to process file.");
      setStatus("error");
      setProgress(0);
    } finally {
      setIsParsing(false);
    }
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
    
    <input
      id="fileUpload"
      type="file"
      accept=".csv,.tsv,.txt"
      className="hidden"
      onChange={handleInputChange}
    />
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
