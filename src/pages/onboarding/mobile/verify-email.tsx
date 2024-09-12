export const VerifyEmailMobile = () => {
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center px-5">
      <div className="flex flex-col items-center">
        <img
          src="/images/success.png"
          alt=""
          width={100}
          height={100}
          className="mb-6"
        />
        <div className="w-full max-w-[241px]">
          <h1 className="font-medium text-2xl text-pashBlack-1 text-center mb-2">
            Email Address verified
          </h1>
          <p className="text-pashBlack-5 text-center">
            Your email address has been successfully verified
          </p>
        </div>
      </div>
    </div>
  );
};
