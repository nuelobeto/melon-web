/* eslint-disable @typescript-eslint/no-explicit-any */
import {Button} from '@/components/ui/button';
import {LogoWhite} from '@/components/ui/logo';
import {ScrollArea} from '@/components/ui/scroll-area';
import {ROUTES} from '@/router/routes';
import authServices from '@/services/auth';
import {useMutation} from '@tanstack/react-query';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

export const AccountVerified = () => {
  const navigate = useNavigate();
  const params = useParams();
  const token = params.token;

  const {mutate} = useMutation({
    mutationFn: authServices.verifyBusinessEmail,
  });

  useEffect(() => {
    if (token) {
      mutate(token);
    }
  }, [mutate, token]);

  return (
    <main className="w-screen h-screen bg-[#081623] bg-[url('/images/auth-bg.svg')] bg-no-repeat bg-cover">
      <ScrollArea className="w-full h-full">
        <div className="w-full h-full py-[124px] px-6">
          <LogoWhite className="w-[199.2px] mb-[49px] mx-auto" />

          <div className="w-full max-w-[520px] mx-auto flex flex-col gap-6 px-5 sm:px-[46px] py-[39px] rounded-3xl bg-white">
            <div className="flex flex-col gap-2">
              <div className="w-[114px] h-[114px] rounded-full mx-auto bg-[#FFEFF6] mb-[26px] flex items-center justify-center">
                <img
                  src="/images/confetti.png"
                  alt=""
                  width={66.95}
                  height={70.97}
                />
              </div>
              <h1 className="font-semibold text-3xl lg:text-4xl text-pashBlack-1 text-center">
                Account created successfully
              </h1>
              <p className="text-sm text-pashBlack-4 text-center max-w-[354px] mx-auto">
                Hi Sundry foods, your pash account has been created
                successfully. A member of our sales team would reach out t o you
                and help you with the next steps. For now you can log Into your
                dashboard
              </p>
            </div>

            <Button
              type="submit"
              className="h-12 w-full"
              onClick={() => navigate(ROUTES.login)}
            >
              Log In
            </Button>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};
