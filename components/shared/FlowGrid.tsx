'use client';

import { ReactNode, useMemo, useRef } from 'react';
import { BlurFade } from '@/components/ui/blur-fade';
import { useInView } from 'motion/react';

interface FlowGridProps {
	children: ReactNode;
	className?: string;
}

export default function FlowGrid({ children, className = '' }: FlowGridProps) {
	const childrenArray = Array.isArray(children) ? children : [children];

	return (
		<div className={`flow-grid-container w-full max-w-[1000px] mx-auto ${className}`}>
			{childrenArray.map((child, index) => {
				const wrapperRef = useRef<HTMLDivElement | null>(null);
				const isVisible = useInView(wrapperRef, { once: true, margin: '-50px' });
				const arrowDelay = useMemo(() => 0.15 * index + 0.04, [index]);
				return (
					<div
						key={index}
						ref={wrapperRef}
						className={`flow-grid-item ${isVisible ? 'is-visible' : ''}`}
						style={{ ['--flow-arrow-delay' as any]: `${arrowDelay}s`, ['--flow-arrow-duration' as any]: '0.4s' }}>
						<BlurFade inView delay={0.15 * index} className="h-full w-full">
							{child}
						</BlurFade>
					</div>
				);
			})}
		</div>
	);
}
