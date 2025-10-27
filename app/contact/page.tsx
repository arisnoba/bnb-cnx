import ContactForm from '@/components/ContactForm';

export default function Contact() {
	return (
		<div className="container p-10 space-y-10">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-12">
					<h1 className="text-4xl font-bold tracking-tight mb-4">문의하기</h1>
					<p className="text-xl text-muted-foreground">궁금하신 사항이 있으시면 언제든지 문의해 주세요.</p>
				</div>

				{/* Contact Form */}
				<ContactForm />
			</div>
		</div>
	);
}
