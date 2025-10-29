'use client';

import { ReactNode } from 'react';
import { BlurFade } from '@/components/ui/blur-fade';

interface FlowGridProps {
	children: ReactNode;
	className?: string;
}

export default function FlowGrid({ children, className = '' }: FlowGridProps) {
	const childrenArray = Array.isArray(children) ? children : [children];

	return (
		<div className={`flow-grid-container w-full max-w-[1000px] mx-auto ${className}`}>
			{childrenArray.map((child, index) => (
				<BlurFade key={index} className="flow-grid-item" inView delay={0.15 * index}>
					{child}
				</BlurFade>
			))}
		</div>
	);
}
