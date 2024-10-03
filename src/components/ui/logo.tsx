import {cn} from '@/lib/utils';

export const LogoWhite = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('w-36 aspect-[6.45/1]', className)}>
      <img
        src="/images/melonLogoWhite.png"
        alt=""
        width={238.73}
        height={37}
        className="block w-full h-full object-contain"
      />
    </div>
  );
};

export const LogoBlack = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('w-36 aspect-[6.45/1]', className)}>
      <img
        src="/images/melonLogoBlack.png"
        alt=""
        width={238.73}
        height={37}
        className="block w-full h-full object-contain"
      />
    </div>
  );
};
