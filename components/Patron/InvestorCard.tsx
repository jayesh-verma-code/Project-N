import { Investor } from "@/types/patron";


export const InvestorCard = ({ investor }: { investor: Investor }) => (
    <div
      key={investor.id}
      className="flex flex-col items-center justify-center p-4 bg-zinc-900 rounded-lg"
    >
      <img
        src={investor.image}
        alt={investor.name}
        width={200}
        height={200}
        className="opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale-100 hover:grayscale-0 active:grayscale-0"
      />
      <span className="mt-2 font-medium text-zinc-300">{investor.name}</span>
      {investor.title && (
        <span className="mt-2 font-medium text-zinc-300">{investor.title}</span>
      )}
    </div>
  );