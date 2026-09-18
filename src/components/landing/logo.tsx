import Image from 'next/image';

/** KalyChain coin logo + two-tone wordmark, shared by the nav and the footer. */
export function Logo({ size, textClassName }: { size: number; textClassName: string }) {
	return (
		<>
			<Image
				src='/images/landing/klc-logo.png'
				alt='KalyChain logo'
				width={size}
				height={size}
				className='rounded-full'
			/>
			<span className={`font-display font-bold tracking-tight ${textClassName}`}>
				<span className='text-white'>Kaly</span>
				<span className='text-gold'>Chain</span>
			</span>
		</>
	);
}
