import type { ProjectEntry } from '../../types/resume';

interface Props {
  entries: ProjectEntry[];
  onChange: (entries: ProjectEntry[]) => void;
}

function newEntry(): ProjectEntry {
  return {
    id: crypto.randomUUID(),
    name: '',
    description: '',
    url: '',
  };
}

export function ProjectsForm({ entries, onChange }: Props) {
  const add = () => onChange([...entries, newEntry()]);
  const remove = (id: string) => onChange(entries.filter((e) => e.id !== id));
  const update = (id: string, updates: Partial<ProjectEntry>) =>
    onChange(
      entries.map((e) => (e.id === id ? { ...e, ...updates } : e))
    );

  return (
    <section className="form-section">
      <div className="form-section-header">
        <h3>Projects</h3>
        <button type="button" onClick={add} className="btn-add">
          Add
        </button>
      </div>
      {entries.map((entry) => (
        <div key={entry.id} className="form-block">
          <div className="form-grid">
            <div className="form-field">
              <label>Project Name</label>
              <input
                value={entry.name}
                onChange={(e) => update(entry.id, { name: e.target.value })}
                placeholder="Project name"
              />
            </div>
            <div className="form-field">
              <label>URL</label>
              <input
                value={entry.url}
                onChange={(e) => update(entry.id, { url: e.target.value })}
                placeholder="https://..."
              />
            </div>
            <div className="form-field form-field-full">
              <label>Description</label>
              <textarea
                value={entry.description}
                onChange={(e) => update(entry.id, { description: e.target.value })}
                placeholder="Brief description"
                rows={2}
              />
            </div>
          </div>
          <button type="button" onClick={() => remove(entry.id)} className="btn-remove">
            Remove
          </button>
        </div>
      ))}
    </section>
  );
}
