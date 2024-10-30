import {ScrollArea} from '@/components/ui/scroll-area';
import {Header} from './header';
import {SideBar} from './sidebar';

type Props = {
  children: React.ReactNode;
  pageTitle: React.ReactNode;
};

export const DashboardLayout = ({children, pageTitle}: Props) => {
  return (
    <div className="w-screen h-screen flex">
      <SideBar />
      <div className="w-full min-[900px]w-[calc(100vw-256px)] h-full">
        <Header pageTitle={pageTitle} />
        <main className="w-full h-[calc(100%-64px)]">
          <ScrollArea className="w-full h-full">{children}</ScrollArea>
        </main>
      </div>
    </div>
  );
};
