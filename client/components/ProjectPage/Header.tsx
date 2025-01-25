import React from "react";

type Props = {
  name: string;
  buttonComponent?: React.ReactNode;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-xl" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>
    </div>
  );
};

export default Header;
