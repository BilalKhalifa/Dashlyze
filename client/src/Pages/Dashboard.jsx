import {useState} from "react";
import DataImport from "../components/common/DataImport";
import DataImportFromSheets from "../components/common/DataImportFromSheets";

function Dashboard() {
    const[activeTab, setactiveTab] = useState("csv");
    const [dataset, setDataset] = useState(null);
    const [error,setError] = useState("");

    return (
        <div className="w-full">
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
            {activeTab === "csv" 
            ? <DataImport 
                setDataset = {setDataset}
                setError={setError}
            /> 
            : <DataImportFromSheets 
                setDataset = {setDataset}
                setError={setError}
            />}
        </div>
    );
}
export default Dashboard;
