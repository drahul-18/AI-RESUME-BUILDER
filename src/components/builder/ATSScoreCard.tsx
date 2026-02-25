import { computeATSScore, getATSSuggestions, getTopImprovements } from '../../utils/atsScore';
import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export function ATSScoreCard({ data }: Props) {
  const score = computeATSScore(data);
  const suggestions = getATSSuggestions(data);
  const improvements = getTopImprovements(data);

  return (
    <div className="ats-score-card">
      <h3 className="ats-score-label">ATS Readiness Score</h3>
      <div className="ats-score-meter">
        <div
          className="ats-score-fill"
          style={{ width: `${score}%` }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="ats-score-value">{score}/100</div>
      {suggestions.length > 0 && (
        <ul className="ats-suggestions">
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
      {improvements.length > 0 && (
        <div className="ats-improvements">
          <h4 className="ats-improvements-label">Top 3 Improvements</h4>
          <ul className="ats-improvements-list">
            {improvements.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
