import Image from 'next/image';

const Logo = () => {
	return (
		<header className="w-full flex items-center flex-col py-10">
			<Image src="/lamdaglogo.png" alt="Lamdag Logo" width={400} height={400} priority />
		</header>
	);
};

export default Logo;
