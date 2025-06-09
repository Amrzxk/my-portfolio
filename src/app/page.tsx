'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProjectCard from '@/components/ProjectCard'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: 'Cloud Infrastructure Automation',
      description: 'Automated AWS infrastructure deployment using Terraform and Ansible, implementing Infrastructure as Code best practices.',
      image: '/projects/cloud-infra.jpg',
      technologies: [
        { name: 'AWS', color: 'bg-orange-100 text-orange-800' },
        { name: 'Terraform', color: 'bg-purple-100 text-purple-800' },
        { name: 'Ansible', color: 'bg-red-100 text-red-800' },
      ],
      repoUrl: 'https://github.com/yourusername/cloud-infra',
    },
    {
      title: 'DevOps Pipeline Automation',
      description: 'Built CI/CD pipelines using Jenkins and GitHub Actions for automated testing and deployment.',
      image: '/projects/devops.jpg',
      technologies: [
        { name: 'Jenkins', color: 'bg-blue-100 text-blue-800' },
        { name: 'GitHub Actions', color: 'bg-gray-100 text-gray-800' },
        { name: 'Docker', color: 'bg-sky-100 text-sky-800' },
      ],
      repoUrl: 'https://github.com/yourusername/devops-pipeline',
    },
    {
      title: 'Python Microservices',
      description: 'Developed scalable microservices using Python and FastAPI, deployed on Kubernetes.',
      image: '/projects/microservices.jpg',
      technologies: [
        { name: 'Python', color: 'bg-yellow-100 text-yellow-800' },
        { name: 'FastAPI', color: 'bg-green-100 text-green-800' },
        { name: 'Kubernetes', color: 'bg-blue-100 text-blue-800' },
      ],
      demoUrl: 'https://demo.yourdomain.com',
      repoUrl: 'https://github.com/yourusername/python-microservices',
    },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-purple-600/20 dark:from-primary-900/30 dark:to-purple-900/30 animate-gradient" />
        <div className="absolute inset-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-sm" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Welcome to My Portfolio
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8"
          >
            <p>
              I'm Amr Zakariya, a DevOps Engineer specializing in AWS cloud technologies
              and infrastructure automation. I build scalable, secure, and efficient systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#projects"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-gray-700 dark:text-gray-300"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Me</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300">
              I'm a Computer Science and AI student at Helwan University with a strong focus on AWS cloud
              technologies, DevOps, and security. I have experience in backend development
              using Python, building efficient and scalable applications.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Cloud & DevOps',
                description: 'Expertise in AWS services, infrastructure as code, and CI/CD pipelines',
              },
              {
                title: 'Backend Development',
                description: 'Python development with a focus on building scalable and efficient applications',
              },
              {
                title: 'Security',
                description: 'Implementation of secure system design and best practices',
              },
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {skill.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
            Get in Touch
          </h2>
          <ContactForm />
        </div>
      </section>
    </div>
  )
} 