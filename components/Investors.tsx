// import Link from "next/link"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, Phone } from "lucide-react";

export default function InvestorSection() {
  const investors = [
    {
      id: 1,
      name: "Nikhil Sanka",
      image:
        "https://res.cloudinary.com/dqqyuvg1v/image/upload/v1742210980/nikhil_phqtqs.png",
      title: "Advisory Board Member",
    },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-black text-white">
      <div className="container px-4 md:px-6">
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

        {/* Investor Logos */}
        <div
          className={`grid ${
            investors.length <= 1
              ? "grid-cols-1"
              : investors.length <= 2
              ? "grid-cols-1 md:grid-cols-2"
              : investors.length <= 4
              ? "grid-cols-2 md:grid-cols-4"
              : investors.length <= 6
              ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
              : "grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
          } gap-8 md:gap-12 mb-16`}
        >
          {investors.map((investor) => (
            <div
              key={investor.id}
              className="flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-lg"
            >
              <img
                src={`${investor.image}`}
                alt={investor.name}
                width={200}
                height={200}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale-100 hover:grayscale-0"
              />
              <span className="mt-2 font-medium text-zinc-300">
                {investor.name}
              </span>
              {investor.title === " " ? null : (
                <span className="mt-2 font-medium text-zinc-300">
                  {investor.title}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center text-center space-y-4 bg-white text-black p-8 rounded-lg">
          <h3 className="text-2xl font-bold">Open to Capital Ventures</h3>
          <p className="max-w-[600px] text-zinc-700">
            We&apos;re always looking to connect with patrons who share our
            vision and can help us accelerate our growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-zinc-800">
                  Contact Company Relations
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">
                    Investor Relations Team
                  </DialogTitle>
                  <DialogDescription>
                    Reach out to our investor relations team for more
                    information.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Contact Cards */}
                  <div className="space-y-4">
                    <div className="p-4 border border-zinc-200 rounded-lg">
                      <h4 className="font-semibold text-lg">
                        Kavali Deekshith
                      </h4>
                      <p className="text-sm text-zinc-500">CEO</p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-zinc-500" />
                          <a
                            href="mailto:support@nirveonx.com"
                            className="text-sm hover:underline"
                          >
                            support@nirveonx.com
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-zinc-500" />
                          <a
                            href="tel:+91 9491689462"
                            className="text-sm hover:underline"
                          >
                            +91 94916 89462
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-zinc-200 rounded-lg">
                      <h4 className="font-semibold text-lg">
                        Ayush Kumar Sahoo
                      </h4>
                      <p className="text-sm text-zinc-500">Founder</p>
                      <div className="mt-3 space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-zinc-500" />
                          <a
                            href="mailto:ayushgudu04@gmail.com"
                            className="text-sm hover:underline"
                          >
                            ayushgudu04@gmail.com
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-zinc-500" />
                          <a
                            href="tel:+91 9337753561"
                            className="text-sm hover:underline"
                          >
                            +91 93377 53561
                          </a>
                        </div>
                      </div>
                    </div>
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
