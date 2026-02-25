import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';

export type TemplateId = 'classic' | 'modern' | 'minimal';

const STORAGE_KEY = 'resumeBuilderTemplate';

function loadTemplate(): TemplateId {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === 'classic' || raw === 'modern' || raw === 'minimal') return raw;
  } catch {
    // ignore
  }
  return 'classic';
}

interface TemplateContextType {
  template: TemplateId;
  setTemplate: (t: TemplateId) => void;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [template, setTemplateState] = useState<TemplateId>(loadTemplate);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, template);
    } catch {
      // ignore
    }
  }, [template]);

  const setTemplate = useCallback((t: TemplateId) => setTemplateState(t), []);

  return (
    <TemplateContext.Provider value={{ template, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplate() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplate must be used within TemplateProvider');
  return ctx;
}
