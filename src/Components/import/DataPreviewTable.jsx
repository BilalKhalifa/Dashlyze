import { Hash, Type, Calendar } from 'lucide-react';

const TYPE_ICON = {
    number: <Hash size={11} />,
    date:   <Calendar size={11} />,
    string: <Type size={11} />,
};

const TYPE_LABEL = {
    number: 'Number',
    date:   'Date',
    string: 'Text',
};

function DataPreviewTable({ columns, rows, fileName, rowCount }) {
    const preview = rows.slice(0, 8);

    return (
        <div className="preview-wrapper">
            <div className="preview-header">
                <div className="preview-meta">
                    <span className="preview-filename">{fileName}</span>
                    <span className="preview-stats">
                        {rowCount.toLocaleString()} rows · {columns.length} columns
                    </span>
                </div>
                <span className="preview-badge">Preview — first 8 rows</span>
            </div>

            <div className="preview-scroll">
                <table className="preview-table">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.name} className="preview-th">
                                    <div className="preview-th-inner">
                                        <span className={`col-type-badge col-type-badge--${col.type}`}>
                                            {TYPE_ICON[col.type]}
                                            {TYPE_LABEL[col.type]}
                                        </span>
                                        <span className="preview-col-name">{col.name}</span>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {preview.map((row, i) => (
                            <tr key={i} className="preview-tr">
                                {columns.map((col) => (
                                    <td key={col.name} className="preview-td">
                                        <span className={`preview-cell preview-cell--${col.type}`}>
                                            {row[col.name] !== null && row[col.name] !== undefined
                                                ? String(row[col.name])
                                                : <span className="preview-null">null</span>
                                            }
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DataPreviewTable;
