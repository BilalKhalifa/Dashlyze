import { TrendingUp, BarChart2, PieChart, LayoutDashboard, Sparkles } from 'lucide-react';

const ANALYSIS_TYPES = [
    {
        id: 'trends',
        icon: <TrendingUp size={22} strokeWidth={1.5} />,
        label: 'Trends',
        description: 'Track how values change over time',
    },
    {
        id: 'comparison',
        icon: <BarChart2 size={22} strokeWidth={1.5} />,
        label: 'Comparison',
        description: 'Compare categories or groups side by side',
    },
    {
        id: 'distribution',
        icon: <PieChart size={22} strokeWidth={1.5} />,
        label: 'Distribution',
        description: 'See how data is spread or segmented',
    },
    {
        id: 'summary',
        icon: <LayoutDashboard size={22} strokeWidth={1.5} />,
        label: 'Summary',
        description: 'KPIs, totals, and key metrics at a glance',
    },
    {
        id: 'auto',
        icon: <Sparkles size={22} strokeWidth={1.5} />,
        label: 'Auto (AI picks)',
        description: 'Let AI choose the best analysis for your data',
        highlighted: true,
    },
];

function AnalysisTypeSelector({ selected, onChange }) {
    const toggle = (id) => {
        if (id === 'auto') {
            onChange(['auto']);
            return;
        }
        // Remove 'auto' if a manual option is picked
        const withoutAuto = selected.filter((s) => s !== 'auto');
        if (withoutAuto.includes(id)) {
            onChange(withoutAuto.filter((s) => s !== id));
        } else {
            onChange([...withoutAuto, id]);
        }
    };

    return (
        <div className="analysis-selector">
            <div className="analysis-selector-label">
                What kind of analysis do you want?
                <span className="analysis-selector-hint"> Pick one or more</span>
            </div>

            <div className="analysis-type-grid">
                {ANALYSIS_TYPES.map((type) => {
                    const isSelected = selected.includes(type.id);
                    return (
                        <button
                            key={type.id}
                            className={`analysis-card
                                ${isSelected         ? 'analysis-card--selected'     : ''}
                                ${type.highlighted   ? 'analysis-card--highlighted'  : ''}
                            `}
                            onClick={() => toggle(type.id)}
                            type="button"
                        >
                            <span className="analysis-card-icon">{type.icon}</span>
                            <span className="analysis-card-label">{type.label}</span>
                            <span className="analysis-card-desc">{type.description}</span>

                            {isSelected && (
                                <span className="analysis-card-check">✓</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default AnalysisTypeSelector;
