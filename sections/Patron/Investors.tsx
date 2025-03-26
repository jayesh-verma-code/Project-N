import { InvestorCard } from "@/components/Patron/InvestorCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactCard } from "@/components/Patron/ContactCard";
import { contactTeam, investors } from "@/contents/patron";

export default function InvestorSection() {


  // Determine grid layout based on number of investors
  const getGridClassName = (count: number): string => {
    if (count <= 1) return "grid-cols-1";
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count <= 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4";
    if (count <= 6)
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6";
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Our Patrons
            </h2>
            <p className="max-w-[700px] text-zinc-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Backed by our Patrons who believe in our vision to transform the
              industry.
            </p>
          </div>
        </div>

        {/* Investor Grid */}
        <div
          className={`grid ${getGridClassName(
            investors.length
          )} gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-10 md:mb-16`}
        >
          {investors.map((investor) => (
            <InvestorCard key={investor.id} investor={investor} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center text-center space-y-3 md:space-y-4 bg-white text-black p-4 sm:p-6 md:p-8 rounded-lg">
          <h3 className="text-xl sm:text-2xl font-bold">
            Open to Capital Ventures
          </h3>
          <p className="max-w-[600px] text-sm md:text-base text-zinc-700">
            We&apos;re always looking to connect with patrons who share our
            vision and can help us accelerate our growth.
          </p>

          {/* Contact Dialog */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-zinc-800">
                  Contact Company Relations
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] md:max-w-[500px] bg-white text-black max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Investor Relations Team
                  </DialogTitle>
                  <DialogDescription className="text-sm md:text-base">
                    Reach out to our investor relations team for more
                    information.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-3 md:py-4">
                  {/* Contact Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contactTeam.map((person, index) => (
                      <ContactCard key={index} person={person} />
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </section>
  );
}
