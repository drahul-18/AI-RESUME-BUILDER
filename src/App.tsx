import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ArtifactProvider } from './context/ArtifactContext';
import { StepPage } from './pages/rb/StepPage';
import { Proof } from './pages/rb/Proof';
import { StepGuard } from './components/StepGuard';
import './App.css';

function App() {
  return (
    <ArtifactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />
          <Route path="/rb/proof" element={<Proof />} />
          <Route
            path="/rb/:stepId"
            element={
              <StepGuard>
                <StepPage />
              </StepGuard>
            }
          />
          <Route path="*" element={<Navigate to="/rb/01-problem" replace />} />
        </Routes>
      </BrowserRouter>
    </ArtifactProvider>
  );
}

export default App;
