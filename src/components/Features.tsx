import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Camera, FileText, Languages, Zap, Cloud, Lock } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Live Camera Scanning",
      description:
        "Point your camera at any text and watch it get extracted in real-time. Perfect for quick scans on the go.",
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Document Processing",
      description:
        "Extract text from PDFs, images, and documents with high precision, preserving original formatting.",
    },
    {
      icon: <Languages className="h-8 w-8 text-primary" />,
      title: "Multi-language Support",
      description:
        "Recognize and extract text in over 100 languages with support for mixed-language documents.",
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Blazing Fast Speed",
      description:
        "Our optimized algorithms deliver results in milliseconds, even for complex documents.",
    },
    {
      icon: <Cloud className="h-8 w-8 text-primary" />,
      title: "Cloud Sync",
      description:
        "Access your extracted text across all your devices with automatic cloud synchronization.",
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Secure & Private",
      description:
        "Your data never leaves your device unless you choose to save it. Enterprise-grade encryption.",
    },
  ];

  return (
    <section className="section-padding bg-white" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need for Text Extraction
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our powerful features make text extraction simpler, faster, and
              more accurate than ever before.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {features.map((feature, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
