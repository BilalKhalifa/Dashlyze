import {useState} from "react";
import DataImport from "../Components/common/DataImport";
import DataImportFromSheets from "../Components/common/DataImportFromSheets";

function Dashboard() {
    const[activeTab, setactiveTab] = useState("csv");

    return (
        <div>
            <div className="w-full flex justify-center">
                <div className="inline-flex items-center gap-2 border border-2 border-[#9f5cff]/20 rounded-xl !p-1 !mb-6 min-w-min">
                    <button
                    onClick={() => setactiveTab("csv")}
                    className={activeTab === "csv"
                        ? "!px-4 !py-2 rounded-lg bg-[#7c3aed] font-bold transition-colors duration-300 ease-linear"
                        : "!px-4 !py-2 rounded-lg font-bold transition-colors duration-300 ease-linear"}
                    >CSV</button>
                    <button
                    onClick={() => setactiveTab("sheets")}
                    className={activeTab === "sheets"
                        ? "!px-4 !py-2 rounded-lg bg-[#7c3aed] font-bold transition-colors duration-300 ease-linear"
                        : "!px-4 !py-2 rounded-lg font-bold transition-colors duration-300 ease-linear"}
                    >Google Sheets</button>
                </div>
            </div>
            {activeTab === "csv" ? <DataImport /> : <DataImportFromSheets />}
        </div>
    );
}
export default Dashboard;
