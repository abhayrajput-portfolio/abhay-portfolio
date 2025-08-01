import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Heart, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import profilePhoto from '@/assets/profile-photo.jpg';

const About = () => {
  const interests = [
    { icon: MapPin, title: 'Travel', description: 'Exploring new cultures and destinations across USA, Germany, Dubai & India' },
    { icon: Heart, title: 'Process Engineering', description: 'Optimizing chemical processes and spray drying systems' },
    { icon: Coffee, title: 'Innovation', description: 'Applying engineering principles to solve complex challenges' }
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold text-gradient mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know the person behind the adventures
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-30 animate-pulse-slow" />
              <img
                src={profilePhoto}
                alt="Profile"
                className="relative z-10 w-full rounded-2xl shadow-premium"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-secondary rounded-full blur-xl opacity-50" />
            </div>
          </motion.div>

          {/* Bio Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-space font-semibold">
              Hello! I'm Abhaysingh Rajput
            </h3>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a Senior Chemical Engineer at Angiras Rasayan with a strong focus on process design and optimization. I've had the opportunity to commission spray dryers for international projects and optimize process efficiency in challenging environments.
              </p>
              <p>
                My dedication to improving operational efficiency and my aptitude for maximizing complex systems have consistently led to innovative solutions. I've been part of dynamic teams looking for opportunities to apply my skills in new contexts and further develop my proficiency.
              </p>
              <p>
                When I'm not optimizing chemical processes, you'll find me exploring new countries and cultures. I believe travel enhances creativity and provides valuable insights that benefit both personal and professional growth.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                className="bg-gradient-primary text-white"
                onClick={() => window.open('https://www.linkedin.com/in/abhayrajput1901', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open('mailto:abhayrajput1901@gmail.com', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Email Me
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Interests Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 glass hover:shadow-accent transition-all duration-300 interactive">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <interest.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{interest.title}</h4>
                  <p className="text-muted-foreground">{interest.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;