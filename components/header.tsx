import Image from 'next/image';

const Logo = () => {
	return (
		<header className="absolute w-full flex items-start flex-col py-10 pl-20 z-50">
			<Image src="/lamdaglogo.png" alt="Lamdag Logo" width={200} height={200} priority />
		</header>
	);
};

export default Logo;
