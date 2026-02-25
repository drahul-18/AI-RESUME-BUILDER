import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData;
}

export function LivePreview({ data }: Props) {
  return (
    <div className="live-preview">
      <div className="live-preview-paper">
        <header className="preview-header">
          <h1>{data.personal.name || 'Your Name'}</h1>
          <div className="preview-contact">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.location && <span>{data.personal.location}</span>}
          </div>
        </header>

        {data.summary && (
          <section className="preview-section">
            <h2>Summary</h2>
            <p>{data.summary}</p>
          </section>
        )}

        {data.education.length > 0 && (
          <section className="preview-section">
            <h2>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="preview-entry">
                <div className="preview-entry-header">
                  <strong>{edu.degree} {edu.field}</strong>
                  <span>{edu.institution}</span>
                  <span className="preview-meta">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="preview-section">
            <h2>Experience</h2>
            {data.experience.map((exp) => (
              <div key={exp.id} className="preview-entry">
                <div className="preview-entry-header">
                  <strong>{exp.role}</strong>
                  <span>{exp.company}</span>
                  <span className="preview-meta">
                    {exp.startDate} – {exp.endDate} · {exp.location}
                  </span>
                </div>
                {exp.description && <p>{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.projects.length > 0 && (
          <section className="preview-section">
            <h2>Projects</h2>
            {data.projects.map((proj) => (
              <div key={proj.id} className="preview-entry">
                <div className="preview-entry-header">
                  <strong>{proj.name}</strong>
                  {proj.url && <a href={proj.url} target="_blank" rel="noreferrer">{proj.url}</a>}
                </div>
                {proj.description && <p>{proj.description}</p>}
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="preview-section">
            <h2>Skills</h2>
            <p>{data.skills.join(', ')}</p>
          </section>
        )}

        {(data.links.github || data.links.linkedin) && (
          <section className="preview-section">
            <h2>Links</h2>
            <div className="preview-links">
              {data.links.github && <a href={data.links.github} target="_blank" rel="noreferrer">GitHub</a>}
              {data.links.linkedin && <a href={data.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
