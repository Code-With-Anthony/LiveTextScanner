import { useState, useRef, ChangeEvent } from "react";
import { Camera, Image, Copy, Loader2, Check, AlertCircle } from "lucide-react";
import Tesseract from "tesseract.js";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";

export default function TextScanner() {
  const { user } = useAuth();
  const [scanText, setScanText] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanSource, setScanSource] = useState<"image" | "camera" | null>(null);
  const [reachedLimit, setReachedLimit] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check if user has reached scan limit
  const checkScanLimit = async () => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.rpc("check_scan_limit", {
        user_uuid: user.id,
      });

      if (error) throw error;

      // If false, user has reached their limit
      if (data === false) {
        setReachedLimit(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error checking scan limit:", error);
      return false;
    }
  };

  // Handle file input change
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const hasReachedLimit = await checkScanLimit();
    if (hasReachedLimit) return;

    const file = files[0];
    processImage(file, "image");
  };

  // Process image with Tesseract
  const processImage = async (
    file: File | Blob,
    source: "image" | "camera"
  ) => {
    setScanSource(source);
    setIsScanning(true);
    setScanText("");

    try {
      const result = await Tesseract.recognize(file, "eng");
      const extractedText = result.data.text;
      setScanText(extractedText);

      // Save scan to history
      if (user && extractedText.trim()) {
        await saveScanToHistory(extractedText, source);
      }
    } catch (error) {
      console.error("Error scanning text:", error);
      toast.error("Scan Failed", {
        description:
          "We couldn't extract text from the image. Please try again.",
      });
    } finally {
      setIsScanning(false);
    }
  };

  // Save scan to history
  const saveScanToHistory = async (
    text: string,
    source: "image" | "camera"
  ) => {
    try {
      const { error } = await supabase.from("scan_history").insert({
        user_id: user!.id,
        scan_text: text,
        scan_source: source,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error saving scan to history:", error);
    }
  };

  // Start camera
  const startCamera = async () => {
    const hasReachedLimit = await checkScanLimit();
    if (hasReachedLimit) return;

    try {
      setScanSource("camera");
      setScanText("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Camera Error", {
        description: "Couldn't access your camera. Please check permissions.",
      });
      setScanSource(null);
    }
  };

  // Capture from camera
  const captureFromCamera = () => {
    if (!videoRef.current || !canvasRef.current || !streamRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(
      (blob) => {
        if (blob) {
          // Stop camera stream
          streamRef.current?.getTracks().forEach((track) => track.stop());
          streamRef.current = null;

          // Process the captured image
          processImage(blob, "camera");
        }
      },
      "image/jpeg",
      0.9
    );
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setScanSource(null);
  };

  // Copy text to clipboard
  const copyText = () => {
    if (!scanText.trim()) return;

    navigator.clipboard.writeText(scanText);
    setIsCopied(true);

    toast.info("Copied!", {
      description: "Text copied to clipboard",
    });

    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Scan Text</CardTitle>
          <CardDescription>
            Take a photo or upload an image to extract text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {reachedLimit ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Scan Limit Reached</AlertTitle>
              <AlertDescription>
                You've reached your monthly scan limit. Upgrade your plan to
                continue scanning.
                <div className="mt-4">
                  <Button className="mt-2">Upgrade Plan</Button>
                </div>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-6">
              {scanSource === "camera" && !isScanning ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button variant="secondary" onClick={stopCamera}>
                      Cancel
                    </Button>
                    <Button onClick={captureFromCamera}>Capture & Scan</Button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-full gap-4">
                        <Image className="h-12 w-12 text-muted-foreground" />
                        <div className="text-center">
                          <h3 className="font-medium">Upload Image</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Upload a photo containing text
                          </p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isScanning}
                        >
                          Choose File
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center justify-center h-full gap-4">
                        <Camera className="h-12 w-12 text-muted-foreground" />
                        <div className="text-center">
                          <h3 className="font-medium">Use Camera</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Take a photo to extract text
                          </p>
                        </div>
                        <Button onClick={startCamera} disabled={isScanning}>
                          Open Camera
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}

          {isScanning && (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <h3 className="font-medium">Scanning Text...</h3>
              <p className="text-sm text-muted-foreground mt-1">
                This may take a moment
              </p>
            </div>
          )}

          {scanText && (
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Extracted Text</CardTitle>
                  <Button
                    size="sm"
                    className="h-8"
                    onClick={copyText}
                    disabled={!scanText.trim()}
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-md whitespace-pre-wrap break-words">
                  {scanText}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
