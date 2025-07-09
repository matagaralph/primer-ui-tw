import { type PropsWithChildren } from "react";
import AppLogoIcon from "@/components/app-logo-icon";
import { Heading } from "@primer/react";

interface Quote {
  message: string;
  author: string;
}

interface AuthLayoutProps {
  title?: string;
  description?: string;
  quote?: Quote;
}

const defaultQuote: Quote = {
  message:
    "Always remember that you are absolutely unique. Just like everyone else.",
  author: "Margaret Mead",
};

export default function AuthLayout({
  children,
  title,
  description,
  quote = defaultQuote,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="tw:relative tw:grid tw:h-dvh tw:flex-col tw:items-center tw:justify-center tw:px-8 tw:sm:px-0 tw:lg:grid-cols-3 tw:lg:max-w-none tw:lg:px-0">
      <div className="tw:bg-muted tw:relative tw:hidden tw:h-full tw:flex-col tw:p-10 tw:text-white tw:lg:flex tw:dark:border-r tw:dark:border-r-default">
        <div className="tw:absolute tw:inset-0 tw:bg-zinc-900" />
        <div className="tw:relative tw:z-20 tw:flex tw:items-center tw:text-lg tw:font-medium">
          <AppLogoIcon className="tw:mr-2 tw:size-8 tw:fill-current tw:text-white" />
          <span>Smoasters</span>
        </div>
        <div className="tw:relative tw:z-20 tw:mt-auto">
          <blockquote className="tw:space-y-2">
            <p className="tw:text-lg">&ldquo;{quote.message}&rdquo;</p>
            <footer className="tw:text-sm tw:text-muted">{quote.author}</footer>
          </blockquote>
        </div>
      </div>
      <div className="tw:w-full tw:lg:p-8 tw:lg:col-span-2">
        <div className="tw:mx-auto tw:flex tw:w-full tw:flex-col tw:justify-center tw:space-y-6 tw:sm:w-[350px]">
          <div className="tw:relative tw:z-20 tw:flex tw:items-center tw:justify-center tw:lg:hidden">
            <AppLogoIcon className="tw:h-10 tw:fill-current tw:text-black tw:sm:h-12" />
          </div>
          <div className="tw:flex tw:flex-col tw:items-start tw:gap-2 tw:text-left tw:sm:items-center tw:sm:text-center">
            <Heading variant="medium">{title}</Heading>
            <p className="tw:text-muted tw:text-sm tw:text-balance">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
