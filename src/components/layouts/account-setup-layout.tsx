import {ScrollArea} from '../ui/scroll-area';
import {RiErrorWarningFill} from 'react-icons/ri';

export const AccountSetUpLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-screen h-screen">
      <header className="w-full h-16 bg-mountainAsh-7 border-b border-mountainAsh-6 flex items-center px-5">
        <p className="font-medium text-xl text-pashBlack-1">
          Complete business registration
        </p>
      </header>
      <div className="flex h-[calc(100%-64px)] bg-mountainAsh-10">
        {children}
      </div>
    </div>
  );
};

export const SideBar = ({children}: {children: React.ReactNode}) => {
  return (
    <aside className="w-64 h-full hidden md:block bg-[url('/images/authBg.png')] bg-no-repeat bg-contain bg-bottom">
      <ScrollArea className="w-full h-full">
        <div className="w-full p-5">{children}</div>
      </ScrollArea>
    </aside>
  );
};

export const Main = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="grow h-full md:p-6">
      <div className="w-full h-full md:rounded-lg bg-white md:border border-mountainAsh-6">
        <ScrollArea className="w-full h-full md:p-7">
          <div className="md:hidden pb-10">{children}</div>
          <div className="hidden md:block">{children}</div>
        </ScrollArea>
      </div>
    </main>
  );
};

export const PageHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="flex flex-col gap-1 pt-3 pb-8">
      <div className="flex items-start gap-2">
        <h1 className="font-semibold text-3xl sm:text-4xl text-pashBlack-1">
          {title}
        </h1>
        <RiErrorWarningFill className="w-6 h-6 mt-[7px]" />
      </div>
      <p className="text-sm text-pashBlack-7">{subtitle}</p>
    </div>
  );
};
