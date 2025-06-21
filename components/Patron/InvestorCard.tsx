import { Investor } from "@/types/patron";


export const InvestorCard = ({ investor }: { investor: Investor }) => (
    <div
      key={investor.id}
      className="flex flex-col items-center justify-center rounded-lg"
    >
      <img
        src={investor.image}
        alt={investor.name}
        width={400}
        height={400}
        className="opacity-70 rounded-lg hover:opacity-100 transition-opacity duration-300 "
      />
      <span className="mt-2 text-2xl font-bold text-zinc-300">{investor.name}</span>
      {investor.title && (
        <span className="mt-2 font-bold text-xl text-zinc-300">{investor.title}</span>
      )}
    </div>
  );