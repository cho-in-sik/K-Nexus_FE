import { ReactNode } from 'react';
import NavBar from './_components/Navbar';
import TokenHandler from './_components/TokenHandler';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="px-6">
      <TokenHandler />
      {children}
      <NavBar />
    </div>
  );
}
