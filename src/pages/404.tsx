import {LogoBlack} from '@/components/ui/logo';

export const NotFound = () => {
  return (
    <div className="w-screen h-screen bg-white">
      <header className="w-screen py-12 fixed left-0 top-0 flex items-center justify-center px-5 z-50 bg-white">
        <LogoBlack />
      </header>
      <main className="w-screen h-screen pt-36 flex flex-col items-center justify-center">
        <img
          src="/images/404.jpg"
          alt=""
          width={200}
          height={200}
          className="mb-6"
        />
        <div className="flex flex-col w-full max-w-[350px]">
          <h1 className="font-medium text-2xl text-pashBlack-1 mb-2 text-center">
            404
          </h1>
          <p className="text-pashBlack-5 mb-8 text-center">Page Not Found</p>
          <p className="text-pashBlack-5 mb-8 text-center">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
      </main>
    </div>
  );
};
