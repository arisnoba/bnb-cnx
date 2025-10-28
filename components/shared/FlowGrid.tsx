'use client';

import { ReactNode } from 'react';

interface FlowGridProps {
	children: ReactNode;
	className?: string;
}

export default function FlowGrid({ children, className = '' }: FlowGridProps) {
	const childrenArray = Array.isArray(children) ? children : [children];

	return (
		<div className={`flow-grid-container w-full max-w-[1000px] mx-auto ${className}`}>
			{childrenArray.map((child, index) => (
				<div key={index} className="flow-grid-item">
					{child}
				</div>
			))}
		</div>
	);
}
