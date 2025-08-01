import { motion } from 'framer-motion';
import { Award, Trophy, Star, Medal, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const achievements = [
    {
      icon: Trophy,
      title: 'Outstanding Graduate Award',
      category: 'Academic',
      year: '2020',
      organization: 'Stanford University',
      description: 'Recognized for exceptional academic performance and research contributions in Computer Science.',
      details: 'Graduated with highest honors, maintaining a 3.8 GPA while conducting groundbreaking research in Natural Language Processing. Led a team of 10 students in developing an AI-powered language translation tool.',
      color: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: Award,
      title: 'Innovation Excellence Award',
      category: 'Professional',
      year: '2023',
      organization: 'Tech Innovations Inc.',
      description: 'Awarded for developing a revolutionary machine learning algorithm that improved system performance by 40%.',
      details: 'Spearheaded the development of a cutting-edge ML algorithm that revolutionized our data processing pipeline. The innovation resulted in significant cost savings and performance improvements across the organization.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Star,
      title: 'Best Travel Photographer',
      category: 'Creative',
      year: '2022',
      organization: 'National Geographic',
      description: 'Selected as one of the top 100 travel photographers worldwide for stunning landscape captures.',
      details: 'Featured in National Geographic for exceptional travel photography showcasing the beauty of remote locations. The portfolio included breathtaking shots from 15 countries across 4 continents.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Medal,
      title: 'Hackathon Champion',
      category: 'Competition',
      year: '2021',
      organization: 'Global Developer Challenge',
      description: 'First place winner in international coding competition with 5000+ participants.',
      details: 'Led a team of 4 developers to victory in a 48-hour hackathon, creating an innovative solution for sustainable urban planning. The project was later adopted by three major cities.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Award,
      title: 'Community Leadership Award',
      category: 'Social Impact',
      year: '2019',
      organization: 'Berkeley Community Foundation',
      description: 'Recognized for establishing a coding bootcamp for underprivileged youth.',
      details: 'Founded and led a free coding bootcamp that has trained over 200 students from underserved communities. 85% of graduates found employment in tech within 6 months.',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Trophy,
      title: 'Research Excellence Grant',
      category: 'Research',
      year: '2018',
      organization: 'National Science Foundation',
      description: 'Recipient of $50,000 research grant for AI ethics and responsible technology development.',
      details: 'Conducted pioneering research on ethical AI development frameworks. Published 3 papers that have been cited over 500 times and influenced industry standards.',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];

  const categories = ['All', 'Academic', 'Professional', 'Creative', 'Competition', 'Social Impact', 'Research'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredAchievements = activeCategory === 'All' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === activeCategory);

  return (
    <section id="achievements" className="py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-accent/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold text-gradient mb-4">
            Achievements & Recognition
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milestones and recognition earned throughout my journey
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`cursor-pointer px-4 py-2 transition-all duration-300 hover:scale-105 ${
                activeCategory === category ? 'bg-gradient-primary text-white' : ''
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              layout
            >
              <Card 
                className="p-6 glass hover:shadow-accent transition-all duration-300 interactive cursor-pointer h-full"
                onClick={() => setSelectedAchievement(achievement)}
              >
                <div className="space-y-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${achievement.color} rounded-full flex items-center justify-center mx-auto`}>
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">{achievement.title}</h3>
                    <div className="flex justify-center items-center gap-2 mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {achievement.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{achievement.year}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {achievement.organization}
                    </p>
                    <p className="text-sm leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  <div className="text-center">
                    <Button variant="outline" size="sm" className="mt-2">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Achievement Modal */}
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-card rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-space font-bold text-gradient">
                  {selectedAchievement.title}
                </h3>
                <button
                  onClick={() => setSelectedAchievement(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${selectedAchievement.color} rounded-full flex items-center justify-center`}>
                    <selectedAchievement.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <Badge variant="secondary">{selectedAchievement.category}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedAchievement.organization} • {selectedAchievement.year}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="leading-relaxed">{selectedAchievement.details}</p>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setSelectedAchievement(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="p-8 glass bg-gradient-to-r from-primary/10 to-secondary/10">
            <h4 className="text-2xl font-space font-semibold text-gradient mb-4">
              Recognition Summary
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-gradient-secondary">{achievements.length}</div>
                <div className="text-sm text-muted-foreground">Total Awards</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-secondary">6</div>
                <div className="text-sm text-muted-foreground">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-secondary">5</div>
                <div className="text-sm text-muted-foreground">Years Active</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gradient-secondary">200+</div>
                <div className="text-sm text-muted-foreground">Lives Impacted</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;