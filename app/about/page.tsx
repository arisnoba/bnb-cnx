import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function About() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">About BNB CNX</h1>
          <p className="text-xl text-muted-foreground">
            Learn more about our mission, vision, and values
          </p>
        </div>

        {/* Company Story */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>How we got started and where we're going</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Founded with a vision to deliver exceptional service and innovative solutions,
              BNB CNX has been at the forefront of industry excellence. Our journey began
              with a simple belief: that quality and customer satisfaction should never be compromised.
            </p>
            <p className="text-muted-foreground">
              Today, we continue to uphold these values while embracing new technologies and
              methodologies that allow us to serve our clients better. Our team of dedicated
              professionals works tirelessly to ensure that every project we undertake meets
              the highest standards of quality and excellence.
            </p>
          </CardContent>
        </Card>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To provide innovative solutions and exceptional service that empower our
                clients to achieve their goals and exceed their expectations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading provider in our industry, recognized for our commitment
                to quality, innovation, and customer satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <Card>
          <CardHeader>
            <CardTitle>Our Values</CardTitle>
            <CardDescription>The principles that guide everything we do</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Integrity</h3>
              <p className="text-sm text-muted-foreground">
                We conduct our business with honesty and transparency, building trust
                with our clients and partners.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Excellence</h3>
              <p className="text-sm text-muted-foreground">
                We strive for excellence in everything we do, continuously improving
                our processes and services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                We embrace new technologies and creative solutions to stay ahead of
                industry trends and deliver cutting-edge services.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Customer Focus</h3>
              <p className="text-sm text-muted-foreground">
                Our clients are at the heart of everything we do. We listen to their
                needs and tailor our solutions accordingly.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
