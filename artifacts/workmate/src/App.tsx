import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Profile from "@/pages/profile";
import CheckIn from "@/pages/checkin";
import Feedback from "@/pages/feedback";
import Matched from "@/pages/matched";

const queryClient = new QueryClient();

function AppRoutes() {
  return (
    <Layout>
      <Switch>
        <Route path="/app" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/profile" component={Profile} />
        <Route path="/checkin" component={CheckIn} />
        <Route path="/feedback" component={Feedback} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/matched" component={Matched} />
      <Route path="/app" component={AppRoutes} />
      <Route path="/chat" component={AppRoutes} />
      <Route path="/profile" component={AppRoutes} />
      <Route path="/checkin" component={AppRoutes} />
      <Route path="/feedback" component={AppRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
