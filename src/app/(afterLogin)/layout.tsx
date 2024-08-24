import { ReactNode } from 'react';
import NavBar from './_components/Navbar';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="px-6">
      {children}
      <NavBar />
    </div>
  );
}
