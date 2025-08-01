import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Experience = () => {
  const experiences = [
    {
      role: 'Senior Engineer',
      company: 'Angiras Rasayan',
      location: 'India',
      period: 'May 2024 - Present (1 year 4 months)',
      description: 'Leading process design and optimization initiatives with a strong focus on spray drying technology and chemical engineering principles.',
      skills: ['Process Design', 'Spray Drying', 'Process Optimization', 'Chemical Engineering'],
      achievements: [
        'Commissioned spray dryers for international projects',
        'Optimized process efficiency in challenging environments',
        'Applied expertise in theoretical knowledge to practical insights'
      ]
    },
    {
      role: 'Trainee Process Engineer',
      company: 'Indian Farmers Fertiliser Coop Ltd',
      location: 'India',
      period: 'May 2023 - June 2023 (2 months)',
      description: 'Gained valuable hands-on experience in fertilizer production processes and large-scale chemical operations.',
      skills: ['Process Monitoring', 'Production Support', 'Large-scale Operations', 'Fertilizer Production'],
      achievements: [
        'Acquired basic understanding of fertilizer production processes',
        'Gained valuable hands-on experience in monitoring and supporting the production process',
        'Understood the importance of precision and efficiency in large-scale production environments'
      ]
    },
    {
      role: 'Sales/Process Engineer',
      company: 'Aksh Engineering Systems Private Limited - India',
      location: 'India',
      period: 'July 2021 - August 2022 (1 year 2 months)',
      description: 'Handled both sales and process engineering responsibilities, providing technical solutions to clients.',
      skills: ['Technical Sales', 'Process Engineering', 'Client Relations', 'Engineering Solutions'],
      achievements: [
        'Successfully managed technical sales and client relationships',
        'Provided process engineering solutions to various clients',
        'Enhanced technical and commercial understanding of engineering systems'
      ]
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Technology - B.Tech, Chemical Engineering',
      school: 'Pandit Deendayal Energy University',
      location: 'India',
      period: '2020 - 2024',
      gpa: 'Graduated with honors',
      highlights: [
        'Specialized in Process Design and Optimization',
        'Strong foundation in Chemical Engineering principles',
        'Developed expertise in spray drying and fertilizer production processes'
      ]
    },
    {
      degree: 'Diploma of Education, Chemical Engineering',
      school: 'Government Polytechnic Gandhinagar',
      location: 'India',
      period: 'August 2018 - July 2021',
      gpa: 'Distinction',
      highlights: [
        'Built strong foundation in chemical engineering fundamentals',
        'Hands-on experience with industrial processes',
        'Developed technical and analytical skills'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-br from-muted/20 via-background to-accent/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-space font-bold text-gradient mb-4">
            Experience & Education
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        {/* Experience Section */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-space font-semibold mb-8 text-gradient-secondary"
          >
            Professional Experience
          </motion.h3>

          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 glass hover:shadow-accent transition-all duration-300 interactive">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="flex flex-wrap items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-foreground">{exp.role}</h4>
                          <p className="text-lg text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="w-4 h-4" />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {exp.description}
                      </p>

                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold mb-2">Key Achievements:</h5>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-semibold mb-2">Technologies:</h5>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-space font-semibold mb-8 text-gradient-secondary"
          >
            Education
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 glass hover:shadow-accent transition-all duration-300 interactive">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="text-primary font-medium">{edu.school}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {edu.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {edu.period}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">GPA: {edu.gpa}</p>
                    </div>

                    <div>
                      <h5 className="text-sm font-semibold mb-2">Highlights:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {edu.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;