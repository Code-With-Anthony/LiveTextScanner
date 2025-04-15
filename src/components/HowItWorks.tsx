import { Camera, Copy, FileSearch } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Camera className="h-12 w-12 text-primary" />,
      title: "Capture or Upload",
      description:
        "Point your camera at text or upload images and documents containing text you want to extract.",
    },
    {
      icon: <FileSearch className="h-12 w-12 text-primary" />,
      title: "Automatic Detection",
      description:
        "Our AI instantly detects and processes all visible text, regardless of orientation or font.",
    },
    {
      icon: <Copy className="h-12 w-12 text-primary" />,
      title: "Copy & Use Anywhere",
      description:
        "Copy the extracted text to your clipboard or save it directly to your preferred app.",
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Text Extraction Made Simple
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              TextPeek works in three simple steps to get you from text in the
              real world to digital text you can use.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 pt-12">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <div className="rounded-xl border bg-card p-6 shadow-sm max-w-4xl w-full">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="rounded-lg bg-muted p-2 md:w-1/2">
                <div className="h-40 bg-slate-200 rounded flex items-center justify-center text-muted-foreground">
                  Document or Camera Preview
                </div>
              </div>
              <div className="md:w-1/2 space-y-3 w-full">
                <div className="h-6 w-3/4 bg-slate-200 rounded"></div>
                <div className="h-6 w-full bg-slate-200 rounded"></div>
                <div className="h-6 w-5/6 bg-slate-200 rounded"></div>
                <div className="h-6 w-full bg-slate-200 rounded"></div>
                <div className="h-6 w-1/2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
