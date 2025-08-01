import { motion } from 'framer-motion';
import { Globe, MapPin, Camera, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import TravelGlobe from './TravelGlobe';

const Travel = () => {
  const travelStats = [
    { icon: Globe, value: '25+', label: 'Countries Visited' },
    { icon: MapPin, value: '100+', label: 'Cities Explored' },
    { icon: Camera, value: '10k+', label: 'Photos Captured' },
    { icon: Users, value: '50+', label: 'Cultures Experienced' }
  ];

  const highlights = [
    {
      title: 'Backpacking through Europe',
      description: 'A month-long adventure exploring 15 countries, from the northern lights in Iceland to the ancient ruins of Greece.',
      countries: ['Iceland', 'Norway', 'Germany', 'France', 'Italy', 'Greece']
    },
    {
      title: 'Asian Cultural Immersion',
      description: 'Deep dive into Asian cultures, staying with local families and participating in traditional ceremonies.',
      countries: ['Japan', 'Thailand', 'Vietnam', 'India', 'Nepal']
    },
    {
      title: 'North American Road Trip',
      description: 'Coast-to-coast journey across the United States, experiencing diverse landscapes and communities.',
      countries: ['USA', 'Canada', 'Mexico']
    }
  ];

  return (
    <section id="travel" className="py-20 px-6 bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-space font-bold text-gradient mb-4">
            My Travel Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore the world through my eyes. Click on the glowing markers to see photos and stories from each destination.
          </p>
        </motion.div>

        {/* Travel Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {travelStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 text-center glass hover:shadow-accent transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="p-6 glass overflow-hidden">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-space font-semibold text-gradient-secondary mb-2">
                Interactive Travel Map
              </h3>
              <p className="text-muted-foreground">
                Rotate, zoom, and click on the markers to explore my journey
              </p>
            </div>
            <TravelGlobe />
          </Card>
        </motion.div>

        {/* Travel Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-space font-semibold text-center text-gradient-secondary mb-8">
            Journey Highlights
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 glass hover:shadow-accent transition-all duration-300 interactive h-full">
                  <h4 className="text-xl font-semibold mb-3 text-gradient">
                    {highlight.title}
                  </h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {highlight.description}
                  </p>
                  <div className="space-y-2">
                    <h5 className="text-sm font-semibold">Countries Visited:</h5>
                    <div className="flex flex-wrap gap-2">
                      {highlight.countries.map((country) => (
                        <span
                          key={country}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="p-8 glass bg-gradient-to-r from-primary/10 to-secondary/10">
            <h4 className="text-2xl font-space font-semibold text-gradient mb-4">
              Ready for the Next Adventure
            </h4>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              The world is vast and full of wonders waiting to be discovered. Every journey teaches us something new about ourselves and the beautiful diversity of our planet.
            </p>
            <div className="text-sm text-muted-foreground">
              🗺️ Next destinations: Antarctica, Madagascar, Mongolia
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Travel;