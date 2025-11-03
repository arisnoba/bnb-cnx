import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
	/**
	 * Optional CSS class name to apply custom styles
	 */
	className?: string;
	/**
	 * Whether to reverse the animation direction
	 * @default false
	 */
	reverse?: boolean;
	/**
	 * Whether to pause the animation on hover
	 * @default false
	 */
	pauseOnHover?: boolean;
	/**
	 * Content to be displayed in the marquee
	 */
	children: ReactNode;
	/**
	 * Whether to animate vertically instead of horizontally
	 * @default false
	 */
	vertical?: boolean;
	/**
	 * Number of times to repeat the content
	 * @default 4
	 */
	repeat?: number;
	/**
	 * Animation duration in seconds
	 * @default 40
	 */
	duration?: number;
	/**
	 * Gap between repeated marquee items. Accepts any CSS length value.
	 * @default '1rem'
	 */
	gap?: string | number;
}

export function Marquee({
	className,
	reverse = false,
	pauseOnHover = false,
	children,
	vertical = false,
	repeat = 4,
	duration = 40,
	gap = '1rem',
	style,
	...props
}: MarqueeProps) {
	const resolvedGap = typeof gap === 'number' ? `${gap}px` : gap;
	const loops = Math.max(1, repeat);

	const rootStyle = {
		'--gap': resolvedGap,
		gap: resolvedGap,
		...style,
	} as CSSProperties;

	const itemStyle: CSSProperties = {
		gap: resolvedGap,
		animationName: vertical ? 'marquee-vertical' : 'marquee',
		animationDuration: `${duration}s`,
		animationTimingFunction: 'linear',
		animationIterationCount: 'infinite',
		animationDirection: reverse ? 'reverse' : 'normal',
	};

	return (
		<div
			{...props}
			style={rootStyle}
			className={cn(
				'marquee-root flex overflow-hidden p-2',
				vertical ? 'flex-col' : 'flex-row',
				pauseOnHover && 'marquee-root--pause-on-hover',
				className
			)}>
			{Array.from({ length: loops }).map((_, index) => (
				<div
					key={index}
					className={cn('marquee-item flex justify-around shrink-0', vertical ? 'flex-col' : 'flex-row')}
					style={itemStyle}>
					{children}
				</div>
			))}
		</div>
	);
}
