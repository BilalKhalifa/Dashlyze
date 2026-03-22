import { useState, useRef, useCallback } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { isSupportedFile, formatFileSize } from '../../lib/csvParser';

function FileDropzone({ onFileParsed, isParsing }) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError]           = useState(null);
    const inputRef = useRef(null);

    const handleFile = useCallback((file) => {
        setError(null);
        if (!file) return;

        if (!isSupportedFile(file)) {
            setError(`"${file.name}" is not supported. Please upload a CSV, TSV, or TXT file.`);
            return;
        }

        if (file.size > 20 * 1024 * 1024) {
            setError('File is too large. Maximum size is 20 MB.');
            return;
        }

        onFileParsed(file);
    }, [onFileParsed]);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }, [handleFile]);

    const onDragOver = (e) => { e.preventDefault(); setIsDragging(true);  };
    const onDragLeave = ()  => setIsDragging(false);
    const onInputChange = (e) => handleFile(e.target.files[0]);

    return (
        <div className="dropzone-wrapper">
            <div
                className={`dropzone ${isDragging ? 'dropzone--active' : ''} ${isParsing ? 'dropzone--parsing' : ''}`}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={() => !isParsing && inputRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
                aria-label="Upload file"
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".csv,.tsv,.txt"
                    onChange={onInputChange}
                    style={{ display: 'none' }}
                />

                <div className="dropzone-icon">
                    {isParsing
                        ? <div className="dropzone-spinner" />
                        : <Upload size={32} strokeWidth={1.5} />
                    }
                </div>

                <div className="dropzone-text">
                    {isParsing ? (
                        <span className="dropzone-headline">Reading your file…</span>
                    ) : (
                        <>
                            <span className="dropzone-headline">
                                {isDragging ? 'Drop it here' : 'Drag & drop your file here'}
                            </span>
                            <span className="dropzone-sub">
                                or <span className="dropzone-link">browse to upload</span>
                            </span>
                            <span className="dropzone-hint">Supports CSV · TSV · TXT — up to 20 MB</span>
                        </>
                    )}
                </div>

                {/* Animated corner decorations */}
                <span className="dropzone-corner dropzone-corner--tl" />
                <span className="dropzone-corner dropzone-corner--tr" />
                <span className="dropzone-corner dropzone-corner--bl" />
                <span className="dropzone-corner dropzone-corner--br" />
            </div>

            {error && (
                <div className="dropzone-error">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}

            <div className="dropzone-formats">
                {['.csv', '.tsv', '.txt'].map((fmt) => (
                    <span key={fmt} className="format-badge">
                        <FileText size={11} />
                        {fmt}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default FileDropzone;
