import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="container py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
          Welcome to BNB CNX
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
          Your trusted partner for innovative solutions and exceptional service
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quality Service</CardTitle>
              <CardDescription>
                Exceptional service delivery that exceeds expectations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We are committed to providing the highest quality service to all our clients,
                ensuring satisfaction at every step.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Expert Team</CardTitle>
              <CardDescription>
                Professional and experienced team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our team consists of industry experts with years of experience,
                ready to tackle any challenge.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Customer Focus</CardTitle>
              <CardDescription>
                Your success is our priority
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                We put our customers first, tailoring solutions to meet your specific
                needs and goals.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-lg">
          Contact us today to learn more about how we can help you achieve your goals
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Get in Touch</Link>
        </Button>
      </section>
    </div>
  )
}
