import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ContactButton() {
	return (
		<div className="flex relative z-40 justify-center cta-button-section">
			<Button className="h-auto btn-primary hover:bg-brand-purple" asChild>
				<Link href="/contact">문의하기</Link>
			</Button>
		</div>
	);
}
