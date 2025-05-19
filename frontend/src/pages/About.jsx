import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Utensils, Coffee, Clock, Users, Award, Phone } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'Head Chef',
      image: 'https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'With 15 years of culinary experience, Alex brings expertise in international cuisine and a passion for local ingredients.'
    },
    {
      name: 'Samantha Lee',
      role: 'Kitchen Manager',
      image: 'https://images.pexels.com/photos/3771119/pexels-photo-3771119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Samantha ensures that our kitchen operations run smoothly and efficiently, maintaining our high standards.'
    },
    {
      name: 'Michael Torres',
      role: 'Pastry Chef',
      image: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      bio: 'Michael crafts our delectable desserts with creativity and precision, bringing sweetness to every meal.'
    }
  ];

  const values = [
    {
      icon: Utensils,
      title: 'Culinary Excellence',
      description: 'We strive for perfection in every dish, using premium ingredients and meticulous preparation techniques.'
    },
    {
      icon: Coffee,
      title: 'Freshness Guaranteed',
      description: 'All our meals are prepared fresh daily, ensuring the highest quality and nutritional value.'
    },
    {
      icon: Clock,
      title: 'Timely Service',
      description: 'We understand the importance of punctuality in meal delivery and maintain strict adherence to schedules.'
    },
    {
      icon: Users,
      title: 'Collaborative Spirit',
      description: 'Our team works together seamlessly, sharing ideas and expertise to deliver exceptional dining experiences.'
    },
    {
      icon: Award,
      title: 'Quality Standards',
      description: 'We maintain rigorous quality control procedures at every step of food preparation and delivery.'
    },
    {
      icon: Phone,
      title: 'Responsive Support',
      description: 'Our administrative team is always available to address any concerns or special requirements.'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#1a120b] via-[#3c2a21] to-[#1a120b] text-amber-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl font-dancing bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-500 mb-4">
              About Our Cloud Kitchen
            </h1>
            <p className="text-lg sm:text-xl text-amber-100/80 max-w-3xl mx-auto">
              We're dedicated to providing exceptional culinary experiences through innovation, quality, and teamwork.
            </p>
          </div>

          {/* Our Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-amber-400 mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-amber-900/20 p-6 rounded-lg border border-amber-800/30 hover:border-amber-600/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full inline-flex mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-300 mb-2">{value.title}</h3>
                  <p className="text-amber-100/80 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-amber-400 mb-8 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-amber-900/20 rounded-lg overflow-hidden border border-amber-800/30 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:border-amber-600/50"
                >
                  <div className="h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-amber-300 mb-1">{member.name}</h3>
                    <p className="text-amber-400/90 text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-amber-100/80 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-400 mb-4">Ready to Connect?</h2>
            <p className="text-amber-100/80 mb-6 max-w-2xl mx-auto">
              Whether you have questions about our services or want to discuss special requirements, our team is here to help.
            </p>
            <Link to="/contact">
              <Button variant="primary" size="lg">
                Contact Us Today
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
