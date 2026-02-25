import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { ResumeData } from '../types/resume';
import { emptyResume, sampleResume } from '../types/resume';

interface ResumeContextType {
  data: ResumeData;
  setData: (data: ResumeData | ((prev: ResumeData) => ResumeData)) => void;
  loadSample: () => void;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ResumeData>(emptyResume);

  const loadSample = useCallback(() => {
    setData(sampleResume());
  }, []);

  return (
    <ResumeContext.Provider value={{ data, setData, loadSample }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
}
