import { Navigate, Routes, Route, useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import ExecutiveDashboard from '../pages/ExecutiveDashboard';
import PolicyLibrary from '../pages/PolicyLibrary';
import PolicyEditor from '../pages/PolicyEditor';
import RiskRegister from '../pages/RiskRegister';
import RiskProfile from '../pages/RiskProfile';
import ComplianceAssessment from '../pages/ComplianceAssessment';
import MyInbox from '../pages/MyInbox';
import UsersAndRoles from '../pages/UsersAndRoles';
import ResilienceDashboard from '../pages/ResilienceDashboard';
import BiaWizard from '../pages/BiaWizard';
import ContinuityPlanEditor from '../pages/ContinuityPlanEditor';
import ActiveCrisisDashboard from '../pages/ActiveCrisisDashboard';
import LoginPage from '../pages/LoginPage';
import AuditRegister from '../pages/AuditRegister';
import ControlsLibrary from '../pages/ControlsLibrary';
import DrillsPage from '../pages/DrillsPage';
import StrategicGoalsPage from '../pages/StrategicGoalsPage';
import OrgStructurePage from '../pages/OrgStructurePage';
import NotificationsAndTrailPage from '../pages/NotificationsAndTrailPage';
import IntegrationsPage from '../pages/IntegrationsPage';

const withLayout = page => <MainLayout>{page}</MainLayout>;

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <RequireAuth>
            <Routes>
              <Route path="/" element={withLayout(<ExecutiveDashboard />)} />
              <Route path="/bcms" element={withLayout(<ResilienceDashboard />)} />
              <Route path="/bcms/bia" element={withLayout(<BiaWizard />)} />
              <Route path="/bcms/bcp" element={withLayout(<ContinuityPlanEditor />)} />
              <Route path="/bcms/crisis" element={withLayout(<ActiveCrisisDashboard />)} />
              <Route path="/bcms/drills" element={withLayout(<DrillsPage />)} />
              <Route path="/policies" element={withLayout(<PolicyLibrary />)} />
              <Route path="/policies/new" element={withLayout(<PolicyEditor />)} />
              <Route path="/policies/:id" element={withLayout(<PolicyEditor />)} />
              <Route path="/goals" element={withLayout(<StrategicGoalsPage />)} />
              <Route path="/org" element={withLayout(<OrgStructurePage />)} />
              <Route path="/risks" element={withLayout(<RiskRegister />)} />
              <Route path="/risks/:id" element={withLayout(<RiskProfile />)} />
              <Route path="/compliance" element={withLayout(<ComplianceAssessment />)} />
              <Route path="/controls" element={withLayout(<ControlsLibrary />)} />
              <Route path="/audits" element={withLayout(<AuditRegister />)} />
              <Route path="/inbox" element={withLayout(<MyInbox />)} />
              <Route path="/notifications" element={withLayout(<NotificationsAndTrailPage />)} />
              <Route path="/integrations" element={withLayout(<IntegrationsPage />)} />
              <Route path="/users-roles" element={withLayout(<UsersAndRoles />)} />
              <Route path="*" element={withLayout(<ExecutiveDashboard />)} />
            </Routes>
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
