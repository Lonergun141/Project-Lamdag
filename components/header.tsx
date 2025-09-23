import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <header className="absolute w-full flex items-start flex-col py-6 sm:py-8 md:py-10 pl-6 sm:pl-12 md:pl-20 z-50">
      <Link href="/" passHref>
        <Image
          src="/lamdaglogo.png"
          alt="Lamdag Logo"
          width={200}
          height={200}
          priority
          className="cursor-pointer w-24 sm:w-32 md:w-40 lg:w-48 h-auto"
        />
      </Link>
    </header>
  );
};

export default Logo;
