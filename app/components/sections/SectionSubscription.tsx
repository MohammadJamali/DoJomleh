import { BellIcon, InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { Dictionary } from "@/lib/dictionary-types";

interface SectionSubscriptionProps {
  localization: Dictionary;
}

export default function SectionSubscription({ localization }: SectionSubscriptionProps) {
  return (
    <section
      id="subscription"
      aria-labelledby="subscription-heading"
      className="bg-[#f7f7f9] flex flex-col items-center gap-8 w-full mx-auto py-24 x-4"
    >
      <div
        role="status"
        aria-label={localization.subscription.title}
        className="text-[#7478f8] flex flex-row items-center gap-4"
      >
        <InboxArrowDownIcon
          className="bg-[#f1f1f8] p-2 rounded-lg w-10 h-10 text-[#7478f8]"
          aria-hidden="true"
        />
        <span>{localization.subscription.title}</span>
      </div>

      <h2
        id="subscription-heading"
        className="text-center text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.3] max-w-2xl mx-auto text-[#1a1a1a]"
      >
        {localization.subscription.description}
      </h2>

      <div
        className={`flex flex-row rounded-[2rem] w-full max-w-md transition-shadow focus-within:shadow-[0_0_0_3px_rgba(116,120,248,0.2)]`}
        style={{
          backgroundColor: "#7478f8",
          paddingTop: "0.5rem",
          paddingBottom: "0.5rem",
          paddingLeft: localization.rtl ? "0.5rem" : "1rem",
          paddingRight: localization.rtl ? "1rem" : "0.5rem",
        }}
      >
        <input
          type="email"
          placeholder={localization.subscription.enterEmail}
          aria-label={localization.subscription.enterEmail}
          required
          className="flex-1 bg-transparent border-0 text-white text-base placeholder-white/80 focus:outline-none"
          style={{ caretColor: "white" }}
        />
        <button
          type="submit"
          aria-label={localization.subscription.submit}
          className="flex items-center justify-center bg-white rounded-full w-12 h-12 cursor-pointer transition-transform hover:scale-105 focus:outline-none focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-2 text-[#7478f8]"
        >
          <BellIcon className="w-6 h-6" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
