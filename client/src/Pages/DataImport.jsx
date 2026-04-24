import { useState } from "react";
import DataImportCSV from "../Components/common/DataImport.jsx";
import DataImportFromSheets from "../Components/common/DataImportFromSheets.jsx";
import DataPreviewTable from "../Components/import/DataPreviewTable.jsx";

const TABS = [
  { id: "csv", label: "CSV" },
  { id: "sheets", label: "Google Sheets" },
];

function DataImport() {
  const [activeTab, setActiveTab] = useState("csv");
  const [dataset, setDataset] = useState(null);
  const [error, setError] = useState("");

  function handleReset() {
    setDataset(null);
    setError("");
  }

  return (
    <div className="flex flex-col w-full min-h-full px-6 py-8">
      {/* Tab Toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex rounded-xl overflow-hidden border border-violet-500/30 bg-[#1a0a2e]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                handleReset();
              }}
              className={`px-6 py-2 text-sm font-semibold transition-all duration-200
                ${
                  activeTab === tab.id
                    ? "bg-[#7c3aed] text-white shadow-[0_0_16px_rgba(124,58,237,0.4)]"
                    : "text-violet-300/70 hover:text-white hover:bg-violet-500/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mx-6 mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* Import Area */}
      {!dataset ? (
        activeTab === "csv" ? (
          <DataImportCSV setDataset={setDataset} setError={setError} />
        ) : (
          <DataImportFromSheets setDataset={setDataset} setError={setError} />
        )
      ) : (
        <DataPreviewTable dataset={dataset} onReset={handleReset} />
      )}
    </div>
  );
}

export default DataImport;
