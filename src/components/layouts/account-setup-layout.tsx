import {ScrollArea} from '../ui/scroll-area';

export const AccountSetUpLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="w-screen h-screen">
      <header className="w-full h-16 bg-mountainAsh-7"></header>
      <div className="flex h-[calc(100%-64px)] bg-mountainAsh-10">
        {children}
      </div>
    </div>
  );
};

export const SideBar = ({children}: {children: React.ReactNode}) => {
  return (
    <aside className="w-64 h-full hidden min-[1000px]:block bg-[url('/images/authBg.png')] bg-no-repeat bg-contain bg-bottom">
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
        <div className="w-full h-full pt-32 px-5 pb-20 mx-auto">{children}</div>
      </ScrollArea>
    </main>
  );
};
