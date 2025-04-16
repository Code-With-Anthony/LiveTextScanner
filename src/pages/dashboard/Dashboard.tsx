import { Camera, Clock, Settings } from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ScanHistory from "@/components/dashboard/ScanHistory";
import TextScanner from "@/components/dashboard/TextScanner";
import UserProfile from "@/components/dashboard/UserProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("scan");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <DashboardLayout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="scan">
            <Camera className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Scan Text</span>
          </TabsTrigger>
          <TabsTrigger value="history">
            <Clock className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">History</span>
          </TabsTrigger>
          <TabsTrigger value="profile">
            <Settings className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="scan" className="space-y-4">
          <TextScanner />
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <ScanHistory />
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <UserProfile />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
