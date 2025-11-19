'use client';

import { SiProtonmail } from "react-icons/si";

const CopyComponent = () => {
 const email = "0xslyv@proton.me";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
  };

  return (
    <a href="#" onClick={handleClick} className="cursor-pointer">
      <SiProtonmail className="icon" />
    </a>
  )
}

export default CopyComponent