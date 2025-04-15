import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "TextPeek has transformed how I handle documents. The accuracy is impressive, and it saves me hours every week.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      avatar: "SJ",
      company: "Creative Solutions",
    },
    {
      quote:
        "The real-time scanning feature is a game-changer for our research team. We can digitize text instantly during fieldwork.",
      author: "Michael Chen",
      role: "Research Scientist",
      avatar: "MC",
      company: "Innovate Labs",
    },
    {
      quote:
        "As a student with dyslexia, TextPeek helps me convert printed materials to digital text that I can use with my reading tools.",
      author: "Emma Rodriguez",
      role: "Graduate Student",
      avatar: "ER",
      company: "University of Technology",
    },
    {
      quote:
        "Our legal team processes thousands of documents monthly. TextPeek's batch processing and accuracy has cut our processing time by 70%.",
      author: "James Wilson",
      role: "Legal Operations Manager",
      avatar: "JW",
      company: "Wilson & Partners",
    },
    {
      quote:
        "The multi-language support is exceptional. We use it for our international clients' documents without any accuracy issues.",
      author: "Sophia Park",
      role: "Translation Services Lead",
      avatar: "SP",
      company: "Global Connect",
    },
    {
      quote:
        "TextPeek integrates perfectly with our existing workflow. The API is well-documented and easy to implement.",
      author: "Alex Thompson",
      role: "CTO",
      avatar: "AT",
      company: "DataFlow Systems",
    },
  ];

  const renderStars = () => {
    return (
      <div className="flex mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
    );
  };

  return (
    <section id="testimonials" className="section-padding bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Thousands
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users have to say about TextPeek
            </p>
          </div>
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 pt-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              {renderStars()}
              <blockquote className="mb-4 italic text-muted-foreground">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
