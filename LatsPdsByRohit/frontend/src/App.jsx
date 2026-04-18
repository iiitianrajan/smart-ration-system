import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import {
  ALLOCATIONS_ROUTE,
  DASHBOARD_ALLOCATIONS_ROUTE,
  DASHBOARD_GRIEVANCES_ROUTE,
  DASHBOARD_HISTORY_ROUTE,
  DASHBOARD_OVERVIEW_ROUTE,
  DASHBOARD_PROFILE_ROUTE,
  DASHBOARD_SETTINGS_ROUTE,
  FAIR_PRICE_SHOPS_ROUTE,
  HOME_ROUTE,
  OTP_VERIFICATION_ROUTE,
  PUBLIC_LEDGER_ROUTE,
  REGISTER_ROUTE,
  SIGN_IN_ROUTE,
  TRANSPARENCY_REPORTS_ROUTE,
} from './constants/routes'
import DashboardLayout from './dashboard/DashboardLayout'
import GrievancesPage from './dashboard/pages/GrievancesPage'
import MyAllocationsPage from './dashboard/pages/MyAllocationsPage'
import ProfilePage from './dashboard/pages/ProfilePage'
import SettingsPage from './dashboard/pages/SettingsPage'
import DashboardOverviewPage from './dashboard/pages/DashboardOverviewPage'
import TransactionHistoryPage from './dashboard/pages/TransactionHistoryPage'
import PublicLayout from './layouts/PublicLayout'
import AllocationsPage from './pages/AllocationsPage'
import FairPriceShopsPage from './pages/FairPriceShopsPage'
import HomePage from './pages/HomePage'
import OtpVerificationPage from './pages/OtpVerificationPage'
import PublicLedgerPage from './pages/PublicLedgerPage'
import RegisterPage from './pages/RegisterPage'
import SignInPage from './pages/SignInPage'
import TransparencyReportsPage from './pages/TransparencyReportsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={HOME_ROUTE} />} />

      <Route element={<PublicLayout />}>
        <Route path={HOME_ROUTE} element={<HomePage />} />
        <Route path={PUBLIC_LEDGER_ROUTE} element={<PublicLedgerPage />} />
        <Route path={FAIR_PRICE_SHOPS_ROUTE} element={<FairPriceShopsPage />} />
        <Route path={ALLOCATIONS_ROUTE} element={<AllocationsPage />} />
        <Route path={TRANSPARENCY_REPORTS_ROUTE} element={<TransparencyReportsPage />} />
      </Route>

      <Route path={SIGN_IN_ROUTE} element={<SignInPage />} />
      <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
      <Route path={OTP_VERIFICATION_ROUTE} element={<OtpVerificationPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate replace to={DASHBOARD_OVERVIEW_ROUTE} />} />
          <Route path="overview" element={<DashboardOverviewPage />} />
          <Route path="allocations" element={<MyAllocationsPage />} />
          <Route path="history" element={<TransactionHistoryPage />} />
          <Route path="grievances" element={<GrievancesPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate replace to={HOME_ROUTE} />} />
    </Routes>
  )
}
