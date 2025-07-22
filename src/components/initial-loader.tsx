
import Image from 'next/image';
import Logo from '@/logo.jpg';

export function InitialLoader() {
  return (
    <div id="initial-loader" className="initial-loader">
      <div className="loader-content">
        <Image src={Logo} alt="Piny Bush Logo" width={96} height={96} className="loader-logo" priority unoptimized />
        <span className="loader-app-name font-headline">Piny Bush</span>
      </div>
    </div>
  );
}
