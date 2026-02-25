import { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { useTemplate } from '../context/TemplateContext';
import { TemplateTabs } from '../components/builder/TemplateTabs';
import { resumeToPlainText, isResumeIncomplete } from '../utils/exportResume';
import type { ResumeData } from '../types/resume';

function PreviewResume({ data }: { data: ResumeData }) {
  const { template } = useTemplate();

  return (
    <article className={`preview-page-resume preview-page-resume--${template}`} data-template={template}>
      <header className="preview-resume-header">
        <h1>{data.personal.name || 'Your Name'}</h1>
        <div className="preview-resume-contact">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.location && <span>{data.personal.location}</span>}
        </div>
      </header>

      {data.summary && (
        <section>
          <h2>Summary</h2>
          <p>{data.summary}</p>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <h2>Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="preview-resume-entry">
              <div className="preview-resume-entry-head">
                <strong>{edu.degree} {edu.field}</strong>
                <span>{edu.institution}</span>
                <span className="preview-resume-meta">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {data.experience.length > 0 && (
        <section>
          <h2>Experience</h2>
          {data.experience.map((exp) => (
            <div key={exp.id} className="preview-resume-entry">
              <div className="preview-resume-entry-head">
                <strong>{exp.role}</strong>
                <span>{exp.company}</span>
                <span className="preview-resume-meta">
                  {exp.startDate} – {exp.endDate} · {exp.location}
                </span>
              </div>
              {exp.description && <p>{exp.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.projects.length > 0 && (
        <section>
          <h2>Projects</h2>
          {data.projects.map((proj) => (
            <div key={proj.id} className="preview-resume-entry">
              <div className="preview-resume-entry-head">
                <strong>{proj.name}</strong>
                {proj.url && <a href={proj.url} target="_blank" rel="noreferrer">{proj.url}</a>}
              </div>
              {proj.description && <p>{proj.description}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2>Skills</h2>
          <p>{data.skills.join(', ')}</p>
        </section>
      )}

      {(data.links.github || data.links.linkedin) && (
        <section>
          <h2>Links</h2>
          <div className="preview-resume-links">
            {data.links.github && <a href={data.links.github} target="_blank" rel="noreferrer">GitHub</a>}
            {data.links.linkedin && <a href={data.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          </div>
        </section>
      )}
    </article>
  );
}

export function Preview() {
  const { data } = useResume();
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);

  const handlePrint = () => {
    if (isResumeIncomplete(data)) setShowIncompleteWarning(true);
    window.print();
  };

  const handleCopyText = async () => {
    if (isResumeIncomplete(data)) setShowIncompleteWarning(true);
    const text = resumeToPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
  };

  return (
    <div className="preview-page">
      <div className="preview-page-header no-print">
        <TemplateTabs />
        <div className="preview-export-actions">
          {showIncompleteWarning && (
            <span className="preview-incomplete-warning">
              Your resume may look incomplete.
            </span>
          )}
          <button type="button" onClick={handlePrint} className="btn-export">
            Print / Save as PDF
          </button>
          <button type="button" onClick={handleCopyText} className="btn-export">
            Copy Resume as Text
          </button>
        </div>
      </div>
      <div className="preview-page-inner" id="resume-print-area">
        <PreviewResume data={data} />
      </div>
    </div>
  );
}
