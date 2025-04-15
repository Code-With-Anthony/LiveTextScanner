import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { memo } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How accurate is TextPeek's text recognition?",
      answer:
        "TextPeek achieves over 99% accuracy for clear, printed text in good lighting conditions. For handwritten text or challenging conditions, accuracy typically ranges from 85-95%, depending on writing clarity and image quality.",
    },
    {
      question: "Can TextPeek recognize handwritten text?",
      answer:
        "Yes, TextPeek can recognize handwritten text, though accuracy varies based on handwriting clarity. Our Pro and Business plans include enhanced handwriting recognition algorithms for better results.",
    },
    {
      question: "What languages does TextPeek support?",
      answer:
        "TextPeek supports over 100 languages including English, Spanish, French, German, Chinese, Japanese, Arabic, Russian, and many more. Our multi-language detection can automatically identify and process text in mixed-language documents.",
    },
    {
      question: "Does TextPeek work offline?",
      answer:
        "The mobile app includes basic offline functionality for immediate text recognition. For advanced features like handwriting recognition and higher accuracy, an internet connection is recommended.",
    },
    {
      question: "How secure is my data with TextPeek?",
      answer:
        "Your security is our priority. By default, scanned data remains on your device unless you explicitly choose to save or sync it. When you do sync data, we use end-to-end encryption and comply with GDPR, CCPA, and other privacy regulations.",
    },
    {
      question: "Can I integrate TextPeek with other applications?",
      answer:
        "Absolutely! TextPeek offers an API for Business plan subscribers that allows integration with most productivity tools, document management systems, and custom workflows. We also offer direct integrations with popular platforms like Google Drive, Dropbox, and Microsoft Office.",
    },
    {
      question: "Is there a limit to how much text I can scan?",
      answer:
        "Free accounts can scan up to 10 pages or images per day. Pro accounts have unlimited scanning capabilities for individual use. Business accounts include high-volume batch processing designed for enterprise needs.",
    },
    {
      question: "What file formats can TextPeek process?",
      answer:
        "TextPeek supports a wide range of formats including PDF, JPEG, PNG, TIFF, GIF, BMP, and more. The Business plan adds support for specialized formats like DICOM and OCR-ready PDFs.",
    },
  ];

  const FaqItem = memo(
    ({
      index,
      question,
      answer,
    }: {
      index: number;
      question: string;
      answer: string;
    }) => (
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="text-left cursor-pointer">
          <h3 className="text-base md:text-lg font-medium">{question}</h3>
        </AccordionTrigger>
        <AccordionContent>{answer}</AccordionContent>
      </AccordionItem>
    )
  );

  return (
    <section id="faq" className="section-padding bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              FAQ
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Common Questions
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to frequently asked questions about TextPeek
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl pt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </Accordion>
        </div>
        <div className="mt-12">
          <div className="mx-auto max-w-3xl rounded-xl border bg-card p-6 text-center shadow-sm">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="mb-4 text-muted-foreground">
              Our team is ready to help you with any other questions you might
              have.
            </p>
            <div className="inline-flex">
              <a href="#contact" className="text-primary hover:underline">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
