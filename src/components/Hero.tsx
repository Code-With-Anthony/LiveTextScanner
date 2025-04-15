import { Button } from "@/components/ui/button";
import { CheckCircle, ChevronRight, FileText, Scan } from "lucide-react";

const Hero = () => {
  return (
    <div className="hero-gradient section-padding">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Extract text instantly
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Extract Text from <span className="gradient-text">Anything</span>{" "}
              in Real-Time
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              TextPeek's AI-powered scanner extracts text from images,
              documents, and live camera feeds instantly, with industry-leading
              accuracy.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="btn-shine">
                Start Scanning Free <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                See how it works
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                <span>Free tier</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="mr-1 h-3 w-3 text-primary" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] rounded-lg border bg-background p-4 shadow-xl">
              <div className="absolute -top-3 -left-3 rounded-full bg-primary p-2 shadow-lg">
                <Scan className="h-6 w-6 text-white" />
              </div>
              <div className="mb-4 flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <div className="ml-2 text-sm font-medium">TextPeek Scanner</div>
              </div>
              <div className="space-y-3">
                <div className="h-40 rounded-md border-2 border-dashed border-muted-foreground/20 flex items-center justify-center bg-muted/30">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <FileText className="h-10 w-10 mb-2" />
                    <span className="text-sm">
                      Drag & drop or take a picture
                    </span>
                  </div>
                </div>
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="flex justify-end">
                  <Button size="sm" variant="outline" className="mr-2">
                    Cancel
                  </Button>
                  <Button size="sm">Extract Text</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
