import React from "react";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-64px-80px)] w-full">
      {children}
    </div>
  );
};

export default AuthLayout;
