import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  Truck, 
  Award, 
  Users, 
  Calendar,
  MapPin,
  Target,
  Heart,
  User
} from 'lucide-react';


const About: React.FC = () => {
  const stats = [
    { icon: Users, label: 'Happy Customers', value: '10,000+' },
    { icon: Calendar, label: 'Years in Business', value: '18+' },
    { icon: Award, label: 'Products Sold', value: '500K+' },
    { icon: MapPin, label: 'Locations Served', value: '30+ States' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We source only the highest quality OEM and aftermarket parts from trusted manufacturers.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same-day shipping on most orders with nationwide coverage and tracking.',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our team of automotive experts is here to help you find the right parts.',
    },
    {
      icon: Heart,
      title: 'Customer Care',
      description: 'Your satisfaction is our priority. We stand behind every product we sell.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-poppins font-bold text-5xl mb-6">
              About Garutech
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For over 20 years, we've been the trusted partner for automotive professionals 
              and enthusiasts nationwide, providing premium parts and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ icon: Icon, label, value }, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <div className="font-bold text-3xl mb-2 text-primary">{value}</div>
                <p className="text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-poppins font-bold text-4xl mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Garu Technologies was founded in 2003 by an automotive enthusiast
                    who recognized the need for a reliable source of high-quality auto parts. 
                    What started as a small operation in a single warehouse has grown into 
                    a nationwide network serving thousands of customers.
                  </p>
                  <p>
                    Our journey began when our founder, a veteran mechanic with over 20 years 
                    of experience, struggled to find quality parts for his customers. 
                    He decided to source parts directly from manufacturers, ensuring 
                    authenticity and reliability.
                  </p>
                  <p>
                    Today, we continue that tradition of excellence, working with leading 
                    manufacturers and maintaining strict quality standards. Every part that 
                    leaves our warehouse is guaranteed to meet or exceed OEM specifications.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 p-8 rounded-lg">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary p-3 rounded-lg">
                      <Target className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Our Mission</h3>
                      <p className="text-muted-foreground text-sm">
                        To provide automotive professionals and enthusiasts with 
                        the highest quality parts and exceptional service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent p-3 rounded-lg">
                      <Award className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Our Vision</h3>
                      <p className="text-muted-foreground text-sm">
                        To be the most trusted name in automotive parts, 
                        known for quality, reliability, and customer satisfaction.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl mb-4">Our Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              These core principles guide everything we do and drive our commitment 
              to excellence in the automotive parts industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, description }, index) => (
              <Card key={index} className=" text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-xl mb-4">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-poppins font-bold text-4xl mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our experienced team combines decades of automotive knowledge with 
              a passion for customer service excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: 'Lukman Lawal Garu',
                role: 'Founder & CEO',
                bio: '25+ years in automotive industry, ASE certified master technician.',
              },
              {
                name: 'Semiu Adegboyega',
                role: 'Manager',
                bio: 'Expert in supply chain management and quality assurance.',
              },
              {
                name: 'Ibrahim Lawal',
                role: 'Technical Specialist',
                bio: 'Automotive engineer with expertise in performance parts.',
              },
            ].map((member, index) => (
              <Card key={index} className=" text-center">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <img src="" alt="" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Quality Commitment */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card >
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="bg-primary/10 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-10 w-10 text-primary" />
                  </div>
                  <h2 className="font-poppins font-bold text-3xl mb-4">
                    Quality Commitment
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Rigorous Testing</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Every part undergoes comprehensive quality inspection
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Performance testing to ensure reliability
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Compatibility verification for proper fit
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Warranty Protection</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Comprehensive warranty on all products
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        Hassle-free return and exchange policy
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        24/7 customer support for warranty claims
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;