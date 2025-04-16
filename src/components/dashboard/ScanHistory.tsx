import { useState, useEffect } from "react";
import { Clock, Copy, Trash2, Loader2, Check, Search } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { format } from "date-fns";

type ScanItem = {
  id: string;
  scan_text: string;
  scan_source: string;
  created_at: string;
};

export default function ScanHistory() {
  const { user } = useAuth();
  const [scans, setScans] = useState<ScanItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchScanHistory();
    }
  }, [user]);

  const fetchScanHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("scan_history")
        .select("*")
        .is("deleted_at", null)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setScans(data || []);
    } catch (error) {
      console.error("Error fetching scan history:", error);
      toast.error("Error", {
        description: "Failed to load your scan history",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteScan = async (id: string) => {
    try {
      // Soft delete by updating the deleted_at field
      const { error } = await supabase
        .from("scan_history")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setScans(scans.filter((scan) => scan.id !== id));

      toast.success("Deleted", {
        description: "Scan removed from your history",
      });
    } catch (error) {
      console.error("Error deleting scan:", error);
      toast("Error", {
        description: "Failed to delete the scan",
      });
    }
  };

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    toast.info("Copied!", {
      description: "Text copied to clipboard",
    });

    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredScans = searchQuery
    ? scans.filter((scan) =>
        scan.scan_text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : scans;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Scan History</CardTitle>
            <CardDescription>
              View and manage your previous text scans
            </CardDescription>
          </div>
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search scans..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">
              Loading your scan history...
            </p>
          </div>
        ) : filteredScans.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            {searchQuery ? (
              <p className="text-muted-foreground">
                No results found for "{searchQuery}"
              </p>
            ) : (
              <>
                <h3 className="text-lg font-medium mb-1">No scans yet</h3>
                <p className="text-muted-foreground">
                  Your scan history will appear here
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredScans.map((scan) => (
              <Card key={scan.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          scan.scan_source === "camera"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {scan.scan_source.charAt(0).toUpperCase() +
                          scan.scan_source.slice(1)}
                      </span>
                      <span className="text-xs text-muted-foreground ml-3">
                        {format(
                          new Date(scan.created_at),
                          "MMM d, yyyy • h:mm a"
                        )}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => copyText(scan.id, scan.scan_text)}
                      >
                        {copiedId === scan.id ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => deleteScan(scan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-md mt-2 max-h-[200px] overflow-y-auto">
                    <p className="whitespace-pre-wrap break-words text-sm">
                      {scan.scan_text}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
