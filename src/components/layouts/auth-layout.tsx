import {ScrollArea} from '@/components/ui/scroll-area';
import {LogoBlack, LogoWhite} from '../ui/logo';

export const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex w-screen h-screen">
      <header className="w-screen h-16 fixed left-0 top-0 flex items-center px-5 z-50 bg-white min-[950px]:px-6 min-[950px]:bg-transparent">
        <LogoBlack className="min-[950px]:hidden" />
        <LogoWhite className="hidden min-[950px]:block" />
      </header>
      {children}
    </div>
  );
};

export const SideBar = ({children}: {children: React.ReactNode}) => {
  return (
    <aside className="w-[550px] h-full bg-pashBlack-1 hidden min-[1000px]:block bg-[url('/images/authBg.png')] bg-no-repeat bg-contain bg-bottom">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full pt-32 px-6 pb-6">{children}</div>
      </ScrollArea>
    </aside>
  );
};

export const Main = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="grow h-full bg-white">
      <ScrollArea className="w-full h-full">
        <div className="w-full max-w-[500px] pt-32 px-5 pb-20 mx-auto">
          {children}
        </div>
      </ScrollArea>
    </main>
  );
};
