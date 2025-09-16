import { GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";

import "./App.css";

import LayoutApp from "./components/layout";
import ClientsList from "./pages/comercial/ClientsList";
import FSPList from "./pages/proposals/FSPList";
import BudgetsList from "./pages/comercial/BudgetsList";
import ContactsList from "./pages/comercial/ContactsList";
import SupportList from "./pages/comercial/SupportList";
import CampaignsList from "./pages/marketing/CampaignsList";
import SocialMediaList from "./pages/marketing/SocialMediaList";
import ServicesList from "./pages/proposals/ServicesList";
import ProposalsList from "./pages/proposals/ProposalsList";
import PlanningList from "./pages/execution/PlanningList";
import AssemblyList from "./pages/execution/AssemblyList";
import RecordingList from "./pages/execution/RecordingList";
import ProtocolsList from "./pages/execution/ProtocolsList";
import FinalizedList from "./pages/monitoring/FinalizedList";
import PendingList from "./pages/monitoring/PendingList";
import ProgressList from "./pages/monitoring/ProgressList";
import BillingList from "./pages/finance/BillingList";
import PayableList from "./pages/finance/PayableList";
import ReceivableList from "./pages/finance/ReceivableList";
import HumanResourcesDepartmentList from "./pages/humanresources/HumanResourcesDepartmentList";
import RecruitmentList from "./pages/humanresources/RecruitmentList";
import SuppliersList from "./pages/thirdparties/SuppliersList";
import ThirdPartiesServicesList from "./pages/thirdparties/ThirdPartiesServicesList";
import Util404Page from "./pages/utils/Util404Page";
import DashboardPage from "./pages/dashboard/DashboardPage";

document.title = "SEDI";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
							<Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
								options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "wH24NJ-RUWUbA-hRlTEt",
                }}
              >
                <Routes>
    							<Route element={<LayoutApp />}>
                  	<Route index element={<DashboardPage />} />
                  	<Route path="/clients" element={<ClientsList />} />
                  	<Route path="/budgets" element={<BudgetsList />} />
                  	<Route path="/contacts" element={<ContactsList />} />
                  	<Route path="/support" element={<SupportList />} />
                  	<Route path="/campaigns" element={<CampaignsList />} />
                  	<Route path="/socialmedia" element={<SocialMediaList />} />
                  	<Route path="/fsp" element={<FSPList />} />
                  	<Route path="/services" element={<ServicesList />} />
                  	<Route path="/proposals" element={<ProposalsList />} />
                  	<Route path="/planning" element={<PlanningList />} />
                  	<Route path="/assembly" element={<AssemblyList />} />
                  	<Route path="/recording" element={<RecordingList />} />
                  	<Route path="/protocols" element={<ProtocolsList />} />
                  	<Route path="/progress" element={<ProgressList />} />
                  	<Route path="/pending" element={<PendingList />} />
                  	<Route path="/finalized" element={<FinalizedList />} />
                  	<Route path="/billing" element={<BillingList />} />
                  	<Route path="/payable" element={<PayableList />} />
                  	<Route path="/receivable" element={<ReceivableList />} />
                  	<Route path="/humanresourcesdepartment" element={<HumanResourcesDepartmentList />} />
                  	<Route path="/recruitment" element={<RecruitmentList />} />
                  	<Route path="/suppliers" element={<SuppliersList />} />
                  	<Route path="/thirdpartiesservices" element={<ThirdPartiesServicesList />} />
    								{/* CATCH-ALL 404 */}
                  	<Route path="*" element={<Util404Page />} />
                	</Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
             {/*  <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
