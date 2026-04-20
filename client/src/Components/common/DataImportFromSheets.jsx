import { useState } from "react";
import { RiLinksLine } from "react-icons/ri";
import Papa from "papaparse";

function extractSheetId(url) {
    const regex = /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function DataImportFromSheets({setDataset, setError}) {
    
    return (
        <div>
            <label
                className={`mt-6 mb-6 flex min-h-[340px] w-full cursor-pointer flex-col gap-6 items-center justify-center rounded-[32px] border border-4 border-dashed px-6 py-12 text-center transition-all duration-300 border-violet-300/40 bg-[#3b1870]/30 hover:shadow-[0_0_32px_rgba(139,92,246,0.14)] hover:border-[#a48ebc]`}
            >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#7c3aed] shadow-[0_0_24px_rgba(139,92,246,0.25)]">
                    <RiLinksLine className="h-9 w-9 text-[#f0e9ff]" />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight  text-white md:text-4xl">
                    Connect Google Sheets
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-violet-200/60 md:text-lg">
                    Paste a view-only Google Sheets link to import your data
                </p>

                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-full max-w-xl">
                        <input
                        type="Text"
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        className="
                        w-full !px-4 !py-3 rounded-2xl 
                        overflow-hidden whitespace-nowrap truncate
                        bg-[#190d25] border border-[#402e58] focus:border-[#9f5cff] focus: outline-none transition-colors duration-300 ease-linear
                        "
                        ></input>
                    </div>
                    <div className=" !mt-2 text-violet-200/60">
                        Make sure sharing is set to "Anyone with the link can view"
                    </div>
                </div>

            </label>
        </div>
    );
}

export default DataImportFromSheets;