import { RotateCcw, Download } from "lucide-react";

function DataPreviewTable({ dataset, onReset }) {
  if (!dataset) return null;

  const { columns, preview, metadata } = dataset;

  function handleDownload() {
    const header = columns.join(",");
    const rows = preview.map((row) => columns.map((col) => row[col] ?? "").join(","));
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = metadata?.fileName || "export.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-6 flex flex-col gap-4">
      {/* Meta bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1a0a2e] border border-violet-500/20">
        <div className="flex items-center gap-4 text-sm text-violet-300/70">
          <span>
            <span className="text-white font-medium">{metadata?.fileName}</span>
          </span>
          <span>·</span>
          <span>
            <span className="text-white font-medium">{dataset.rows?.length ?? 0}</span> rows
          </span>
          <span>·</span>
          <span>
            <span className="text-white font-medium">{columns.length}</span> columns
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-violet-300 border border-violet-500/30 hover:bg-violet-500/10 transition-colors"
          >
            <Download size={14} />
            Export
          </button>
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium text-white bg-[#7c3aed] hover:bg-[#9f5cff] transition-colors"
          >
            <RotateCcw size={14} />
            New Import
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-violet-500/20 bg-[#1a0a2e] overflow-auto max-h-[60vh]">
        <table className="w-full text-sm text-left">
          <thead className="sticky top-0 bg-[#200c35] border-b border-violet-500/20">
            <tr>
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-violet-300/80 font-semibold whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, i) => (
              <tr
                key={i}
                className="border-b border-violet-500/10 hover:bg-violet-500/5 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col}
                    className="px-4 py-2.5 text-violet-100/80 whitespace-nowrap max-w-[200px] overflow-hidden text-ellipsis"
                  >
                    {row[col] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-violet-300/40 text-center">
        Showing first {preview.length} of {dataset.rows?.length ?? 0} rows
      </p>
    </div>
  );
}

export default DataPreviewTable;
