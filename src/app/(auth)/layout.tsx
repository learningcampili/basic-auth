import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex justify-center items-center min-h-custom w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
