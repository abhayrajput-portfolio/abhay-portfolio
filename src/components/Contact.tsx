import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Linkedin, Github, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or reach out via email directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'abhay@example.com',
      href: 'mailto:abhay@example.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com/?q=San+Francisco,CA'
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/abhay',
      color: 'hover:text-blue-600'
    },
    {
      icon: Github,
      name: 'GitHub',
      href: 'https://github.com/abhay',
      color: 'hover:text-gray-900'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      href: 'https://instagram.com/abhay',
      color: 'hover:text-pink-600'
    },
    {
      icon: Twitter,
      name: 'Twitter',
      href: 'https://twitter.com/abhay',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold text-gradient mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, want to collaborate, or just want to say hi? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 glass">
              <h3 className="text-2xl font-space font-semibold text-gradient-secondary mb-6">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, question, or just say hello..."
                    rows={6}
                    className="w-full resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary text-white hover:scale-105 transition-all duration-300"
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info & Social */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <Card className="p-8 glass">
              <h3 className="text-2xl font-space font-semibold text-gradient-secondary mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      <p className="text-muted-foreground">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </Card>

            {/* Social Media */}
            <Card className="p-8 glass">
              <h3 className="text-2xl font-space font-semibold text-gradient-secondary mb-6">
                Follow My Journey
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-all duration-300 group ${social.color}`}
                  >
                    <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </Card>

            {/* Call to Action */}
            <Card className="p-8 glass bg-gradient-to-r from-primary/10 to-secondary/10">
              <h4 className="text-xl font-space font-semibold text-gradient mb-3">
                Let's Collaborate!
              </h4>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                I'm always open to interesting conversations and new opportunities. Whether you have a project in mind, want to discuss travel experiences, or just want to connect, feel free to reach out!
              </p>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span>💼 Open to work</span>
                <span>•</span>
                <span>🌍 Travel buddy</span>
                <span>•</span>
                <span>☕ Coffee chats</span>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-16 pt-8 border-t border-border"
      >
        <p className="text-muted-foreground">
          © 2024 Abhay. Built with love using React, TypeScript, and Tailwind CSS.
        </p>
      </motion.div>
    </section>
  );
};

export default Contact;