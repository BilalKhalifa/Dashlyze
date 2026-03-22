import { useState, useCallback } from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import FileDropzone       from '../Components/import/FileDropzone';
import DataPreviewTable   from '../Components/import/DataPreviewTable';
import AnalysisTypeSelector from '../Components/import/AnalysisTypeSelector';
import { parseCSV }       from '../lib/csvParser';

// Import steps
const STEP = { DROP: 'drop', PREVIEW: 'preview', ANALYZING: 'analyzing' };

function DataImport({ onDashboardReady }) {
    const [step, setStep]             = useState(STEP.DROP);
    const [isParsing, setIsParsing]   = useState(false);
    const [fileInfo, setFileInfo]     = useState(null);    // { name, size, columns, rows, rawText }
    const [analysisTypes, setAnalysisTypes] = useState(['auto']);
    const [analyzeError, setAnalyzeError]   = useState(null);

    /* ── Handle file drop ───────────────────────────────── */
    const handleFile = useCallback(async (file) => {
        setIsParsing(true);
        setAnalyzeError(null);

        const result = await parseCSV(file);

        if (result.error) {
            setIsParsing(false);
            return;
        }

        setFileInfo({
            name:    file.name,
            size:    file.size,
            columns: result.columns,
            rows:    result.rows,
            preview: result.preview,
            rawText: result.rawText,
        });

        setIsParsing(false);
        setStep(STEP.PREVIEW);
    }, []);

    /* ── Reset ──────────────────────────────────────────── */
    const handleReset = () => {
        setStep(STEP.DROP);
        setFileInfo(null);
        setAnalysisTypes(['auto']);
        setAnalyzeError(null);
    };

    /* ── Send to AI ─────────────────────────────────────── */
    const handleAnalyze = async () => {
        setStep(STEP.ANALYZING);
        setAnalyzeError(null);

        // Will be wired to Claude API in next session
        // For now: simulate a 2-second delay + pass data up
        setTimeout(() => {
            if (typeof onDashboardReady === 'function') {
                onDashboardReady({
                    fileInfo,
                    analysisTypes,
                    // dashboardConfig will come from AI
                });
            }
        }, 2000);
    };

    const canAnalyze = analysisTypes.length > 0;

    return (
        <div className="import-page">

            {/* ── Step: DROP ─────────────────────────────── */}
            {step === STEP.DROP && (
                <div className="import-drop-screen">
                    <div className="import-headline">
                        <h1 className="import-title">Drop your data,<br />get instant insights</h1>
                        <p className="import-subtitle">
                            Upload a CSV file and AI will analyze it and build
                            a custom interactive dashboard — in seconds.
                        </p>
                    </div>

                    <FileDropzone onFileParsed={handleFile} isParsing={isParsing} />
                </div>
            )}

            {/* ── Step: PREVIEW ──────────────────────────── */}
            {step === STEP.PREVIEW && fileInfo && (
                <div className="import-preview-screen">
                    <div className="import-preview-top">
                        <div>
                            <h2 className="import-preview-title">Your data looks great</h2>
                            <p className="import-preview-sub">
                                Review the preview, then choose your analysis type.
                            </p>
                        </div>
                        <button className="btn-ghost btn-sm" onClick={handleReset}>
                            <RotateCcw size={14} />
                            Change file
                        </button>
                    </div>

                    <DataPreviewTable
                        columns={fileInfo.columns}
                        rows={fileInfo.rows}
                        fileName={fileInfo.name}
                        rowCount={fileInfo.rows.length}
                    />

                    <AnalysisTypeSelector
                        selected={analysisTypes}
                        onChange={setAnalysisTypes}
                    />

                    {analyzeError && (
                        <div className="import-error">{analyzeError}</div>
                    )}

                    <button
                        className={`btn-analyze ${canAnalyze ? '' : 'btn-analyze--disabled'}`}
                        onClick={handleAnalyze}
                        disabled={!canAnalyze}
                    >
                        <Sparkles size={18} strokeWidth={1.5} />
                        Analyze with AI
                    </button>
                </div>
            )}

            {/* ── Step: ANALYZING ────────────────────────── */}
            {step === STEP.ANALYZING && (
                <div className="import-analyzing-screen">
                    <AnalyzingLoader fileName={fileInfo?.name} />
                </div>
            )}
        </div>
    );
}

/* ── Analyzing animation component ─────────────────────────── */
const MESSAGES = [
    'Reading your data…',
    'Detecting patterns…',
    'Choosing the best charts…',
    'Building your dashboard…',
];

function AnalyzingLoader({ fileName }) {
    const [msgIdx, setMsgIdx] = useState(0);

    // Cycle through messages every 1.8s
    useState(() => {
        const id = setInterval(() => {
            setMsgIdx((i) => (i + 1) % MESSAGES.length);
        }, 1800);
        return () => clearInterval(id);
    });

    return (
        <div className="analyzing-loader">
            <div className="analyzing-orb">
                <div className="analyzing-orb-inner" />
                <div className="analyzing-orb-ring" />
                <div className="analyzing-orb-ring analyzing-orb-ring--2" />
            </div>
            <p className="analyzing-message">{MESSAGES[msgIdx]}</p>
            {fileName && (
                <p className="analyzing-file">{fileName}</p>
            )}
        </div>
    );
}

export default DataImport;
