import Papa from 'papaparse';

/**
 * Parse a CSV or plain-text file using PapaParse.
 * Returns { columns, rows, preview, rawText, error }
 */
export function parseCSV(file) {
    return new Promise((resolve) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: (results) => {
                const columns = detectColumnTypes(results.meta.fields, results.data);
                resolve({
                    columns,
                    rows: results.data,
                    preview: results.data.slice(0, 50),   // first 50 rows for AI
                    rawText: buildPreviewText(results.meta.fields, results.data),
                    error: null,
                });
            },
            error: (err) => {
                resolve({ columns: [], rows: [], preview: [], rawText: '', error: err.message });
            },
        });
    });
}

/**
 * Detect the type of each column: 'number' | 'date' | 'string'
 */
function detectColumnTypes(fields = [], rows = []) {
    if (!fields || rows.length === 0) return [];

    return fields.map((field) => {
        const sample = rows
            .slice(0, 20)
            .map((r) => r[field])
            .filter((v) => v !== null && v !== undefined && v !== '');

        const allNumbers = sample.every((v) => typeof v === 'number' && !isNaN(v));
        const allDates   = sample.every((v) => !isNaN(Date.parse(v)));

        return {
            name: field,
            type: allNumbers ? 'number' : allDates ? 'date' : 'string',
        };
    });
}

/**
 * Build a compact plain-text preview to send to the AI
 * (header row + first 10 data rows, tab-separated)
 */
function buildPreviewText(fields = [], rows = []) {
    const header = fields.join('\t');
    const dataRows = rows
        .slice(0, 10)
        .map((r) => fields.map((f) => r[f] ?? '').join('\t'));
    return [header, ...dataRows].join('\n');
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes) {
    if (bytes < 1024)       return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Check if a file type is supported
 */
export function isSupportedFile(file) {
    const supported = ['.csv', '.tsv', '.txt'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    return supported.includes(ext);
}
