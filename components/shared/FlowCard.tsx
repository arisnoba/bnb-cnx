'use client';

import { ReactNode } from 'react';

interface FlowCardProps {
	variant?: 'primary' | 'secondary';
	title: string | ReactNode;
	description?: string | string[];
	icon?: ReactNode;
	className?: string;
}

export default function FlowCard({ variant = 'secondary', title, description, icon, className = '' }: FlowCardProps) {
	const isPrimary = variant === 'primary';

	return (
		<div
			className={`
        flow-card
        relative flex md:flex-col flex-row justify-between
        overflow-hidden w-full h-full aspect-auto gap-2 md:gap-8
        ${isPrimary ? 'bg-brand-purple text-center md:text-left justify-center md:justify-start' : 'bg-[#f3f3f3]'}
        ${className}
      `}>
			{/* Content */}
			<div className="flex flex-col gap-4 w-full">
				<h3 className={`font-bold ${isPrimary ? 'text-brand-neon' : 'text-[#333333]'}`}>{title}</h3>

				{description && (
					<div className={`flow-card-description font-semibold ${isPrimary ? 'text-white' : 'text-[#666666]'}`}>
						{Array.isArray(description) ? description.map((line, index) => <p key={index}>{line}</p>) : <p className="whitespace-pre-line">{description}</p>}
					</div>
				)}
			</div>

			{/* Icon */}
			{icon && <div className="flex justify-end items-start">{icon}</div>}
		</div>
	);
}
