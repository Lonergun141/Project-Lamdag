import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <header className="absolute w-full flex items-start flex-col py-10 pl-20 z-50">
      <Link href="/" passHref>
        <Image
          src="/lamdaglogo.png"
          alt="Lamdag Logo"
          width={200}
          height={200}
          priority
          className="cursor-pointer"
        />
      </Link>
    </header>
  );
};

export default Logo;
