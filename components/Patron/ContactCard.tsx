import { ContactPerson } from "@/types/patron";
import { Mail, Phone } from "lucide-react";

export const ContactCard = ({ person }: { person: ContactPerson }) => (
  <div className="p-3 md:p-4 border border-zinc-200 rounded-lg">
    <h4 className="font-semibold text-base md:text-lg">{person.name}</h4>
    <p className="text-xs md:text-sm text-zinc-500">{person.title}</p>
    <div className="mt-2 md:mt-3 space-y-1 md:space-y-2">
      <div className="flex items-center">
        <Mail className="h-3 w-3 md:h-4 md:w-4 mr-2 text-zinc-500 flex-shrink-0" />
        <a
          href={`mailto:${person.email}`}
          className="text-xs md:text-sm truncate hover:underline"
        >
          {person.email}
        </a>
      </div>
      <div className="flex items-center">
        <Phone className="h-3 w-3 md:h-4 md:w-4 mr-2 text-zinc-500 flex-shrink-0" />
        <a
          href={`tel:${person.phone}`}
          className="text-xs md:text-sm truncate hover:underline"
        >
          {person.phone}
        </a>
      </div>
    </div>
  </div>
);