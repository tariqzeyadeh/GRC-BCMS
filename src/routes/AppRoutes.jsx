import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
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

const withLayout = page => <MainLayout>{page}</MainLayout>;

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={withLayout(<ExecutiveDashboard />)} />
      <Route path="/bcms" element={withLayout(<ResilienceDashboard />)} />
      <Route path="/bcms/bia" element={withLayout(<BiaWizard />)} />
      <Route path="/bcms/bcp" element={withLayout(<ContinuityPlanEditor />)} />
      <Route path="/bcms/crisis" element={withLayout(<ActiveCrisisDashboard />)} />
      <Route path="/policies" element={withLayout(<PolicyLibrary />)} />
      <Route path="/policies/new" element={withLayout(<PolicyEditor />)} />
      <Route path="/policies/:id" element={withLayout(<PolicyEditor />)} />
      <Route path="/risks" element={withLayout(<RiskRegister />)} />
      <Route path="/risks/:id" element={withLayout(<RiskProfile />)} />
      <Route path="/compliance" element={withLayout(<ComplianceAssessment />)} />
      <Route path="/inbox" element={withLayout(<MyInbox />)} />
      <Route path="/users-roles" element={withLayout(<UsersAndRoles />)} />
      <Route path="*" element={withLayout(<ExecutiveDashboard />)} />
    </Routes>
  );
};

export default AppRoutes;
