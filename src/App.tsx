import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthProvider';
import { ToastProvider, Loading } from './components/ui';
import { LoginPage } from './pages/LoginPage';
import { ParticipantSessionsPage } from './pages/participant/ParticipantSessionsPage';
import { ParticipantSessionHome } from './pages/participant/ParticipantSessionHome';
import { WorkshopPage } from './pages/participant/WorkshopPage';
import { PortfolioPage } from './pages/participant/PortfolioPage';
import { ActionPlanPage } from './pages/participant/ActionPlanPage';
import { MyDataPage } from './pages/participant/MyDataPage';
import { ResourcesPage } from './pages/shared/ResourcesPage';
import { ToolsPage } from './pages/shared/ToolsPage';
import { TrainerSessionsPage } from './pages/trainer/TrainerSessionsPage';
import { SessionPreparePage } from './pages/trainer/SessionPreparePage';
import { SessionLivePage } from './pages/trainer/SessionLivePage';
import { SubmissionReviewPage } from './pages/trainer/SubmissionReviewPage';
import { PresentationPage } from './pages/trainer/PresentationPage';
import { ProgramPage } from './pages/trainer/ProgramPage';
import { WorkshopTemplateEditorPage } from './pages/trainer/WorkshopTemplateEditorPage';
import { SessionWorkshopEditPage } from './pages/trainer/SessionWorkshopEditPage';
import { ReportPage } from './pages/trainer/ReportPage';
import { SettingsPage } from './pages/trainer/SettingsPage';

function RequireAuth({ children, role }: { children: React.ReactElement; role?: 'trainer' | 'participant' }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/connexion" state={{ from: location.pathname }} replace />;
  if (!profile) return <Loading label="Chargement du profil…" />;
  if (role && profile.role !== role) return <Navigate to={profile.role === 'trainer' ? '/t/sessions' : '/p'} replace />;
  return children;
}

function Home() {
  const { user, profile, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/connexion" replace />;
  if (!profile) return <Loading />;
  return <Navigate to={profile.role === 'trainer' ? '/t/sessions' : '/p'} replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<LoginPage />} />
          <Route path="/ressources" element={<RequireAuth><ResourcesPage /></RequireAuth>} />
          <Route path="/outils" element={<RequireAuth><ToolsPage /></RequireAuth>} />
          <Route path="/mes-donnees" element={<RequireAuth><MyDataPage /></RequireAuth>} />

          <Route path="/p" element={<RequireAuth role="participant"><ParticipantSessionsPage /></RequireAuth>} />
          <Route path="/p/sessions/:sessionId" element={<RequireAuth role="participant"><ParticipantSessionHome /></RequireAuth>} />
          <Route path="/p/sessions/:sessionId/ateliers/:workshopId" element={<RequireAuth role="participant"><WorkshopPage /></RequireAuth>} />
          <Route path="/p/sessions/:sessionId/portfolio" element={<RequireAuth role="participant"><PortfolioPage /></RequireAuth>} />
          <Route path="/p/sessions/:sessionId/plan" element={<RequireAuth role="participant"><ActionPlanPage /></RequireAuth>} />

          <Route path="/t/sessions" element={<RequireAuth role="trainer"><TrainerSessionsPage /></RequireAuth>} />
          <Route path="/t/sessions/:sessionId/preparer" element={<RequireAuth role="trainer"><SessionPreparePage /></RequireAuth>} />
          <Route path="/t/sessions/:sessionId/animer" element={<RequireAuth role="trainer"><SessionLivePage /></RequireAuth>} />
          <Route path="/t/sessions/:sessionId/productions/:submissionId" element={<RequireAuth role="trainer"><SubmissionReviewPage /></RequireAuth>} />
          <Route path="/t/sessions/:sessionId/presentation" element={<RequireAuth role="trainer"><PresentationPage /></RequireAuth>} />
          <Route path="/t/sessions/:sessionId/ateliers/:workshopId/modifier" element={<RequireAuth role="trainer"><SessionWorkshopEditPage /></RequireAuth>} />
          <Route path="/t/sessions/:sessionId/rapport" element={<RequireAuth role="trainer"><ReportPage /></RequireAuth>} />
          <Route path="/t/programme" element={<RequireAuth role="trainer"><ProgramPage /></RequireAuth>} />
          <Route path="/t/programme/:versionId" element={<RequireAuth role="trainer"><ProgramPage /></RequireAuth>} />
          <Route path="/t/programme/:versionId/ateliers/:templateId" element={<RequireAuth role="trainer"><WorkshopTemplateEditorPage /></RequireAuth>} />
          <Route path="/t/outils" element={<RequireAuth role="trainer"><ToolsPage /></RequireAuth>} />
          <Route path="/t/parametres" element={<RequireAuth role="trainer"><SettingsPage /></RequireAuth>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
