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
        relative flex flex-col justify-between
        overflow-hidden w-full
        ${isPrimary ? 'bg-brand-purple' : 'bg-[#f3f3f3]'}
        ${className}
      `}>
			{/* Content */}
			<div className="flex flex-col gap-4">
				<h3 className={`font-black ${isPrimary ? 'text-brand-neon' : 'text-[#333333]'}`}>{title}</h3>

				{description && (
					<div className={`flow-card-description font-semibold ${isPrimary ? 'text-white' : 'text-[#666666]'}`}>
						{Array.isArray(description) ? description.map((line, index) => <p key={index}>{line}</p>) : <p className="whitespace-pre-line">{description}</p>}
					</div>
				)}
			</div>

			{/* Icon */}
			{icon && <div className="flex justify-end items-center">{icon}</div>}
		</div>
	);
}
