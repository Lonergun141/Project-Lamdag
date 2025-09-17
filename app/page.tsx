import Image from 'next/image';

export default function Home() {
	return (
		<div className="flex min-h-screen justify-center items-center flex-col gap-12">
		 <h1 className="font-[family-name:var(--font-pacifico)] text-9xl text-[color:var(--primary)]">Lamdag</h1>
     <p className='font-[family-name:var(--font-crimson)]'>Crimson text</p>
        <p className='font-[family-name:var(--font-pd)]'>Playfair display</p>
		</div>
	);
}
