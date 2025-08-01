"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Building2,
  Mail,
  Globe,
  Github,
  Linkedin,
  Home,
  ArrowLeft,
  Calendar,
  GraduationCap,
  Award,
  Code,
  Briefcase,
  ExternalLink,
} from "lucide-react"

const techStack = [
  "JavaScript", "React.js", "Node.js", "Nest.js", "MongoDB", "PostgreSQL", 
  "Git", "Docker", "CSS", "TypeScript", "Tailwind"
]

const socialLinks = [
  { name: "GitHub", icon: Github, url: "https://github.com/hasanshahriar32" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/hasanshahriar32" },
  { name: "Medium", icon: ExternalLink, url: "https://medium.com/@hasanshahriar32" },
  { name: "Dev.to", icon: Code, url: "https://dev.to/hasanshahriar32" },
]

const experiences = [
  {
    role: "Full-stack Developer",
    company: "Bangladeshi Software",
    duration: "October 2023 - Present",
    type: "current"
  },
  {
    role: "Front End Developer",
    company: "SJ Innovation",
    duration: "May 2023 - July 2023",
    type: "past"
  },
  {
    role: "Front End Developer",
    company: "3W Business Private LTD",
    duration: "February 2023 - February 2023",
    type: "past"
  }
]

const projects = [
  {
    name: "ECE Club Website",
    description: "A comprehensive website for the ECE Club with features for event management, certificate generation, and alumni networking."
  },
  {
    name: "Smart Agriculture System",
    description: "IoT-based system for monitoring and controlling agricultural parameters using embedded systems."
  },
  {
    name: "E-Learning Platform",
    description: "A full-stack e-learning platform with course management, video streaming, and assessment features."
  },
  {
    name: "Health Monitoring App",
    description: "Mobile application for health monitoring with data visualization and alert systems."
  }
]

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="w-8 h-8 text-orange-600" />
              <span className="text-2xl font-bold text-slate-800">HSTU Mess Finder</span>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 py-20">
        <div className="relative container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link href="/">
              <Button
                variant="secondary"
                size="sm"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">Developer</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Meet the developer behind the HSTU Mess Finder website
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card className="border-0 shadow-xl">
              <CardHeader className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">SH</span>
                </div>
                <CardTitle className="text-2xl">Shahriar Hasan</CardTitle>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Full-stack software engg. || Web Security Expert || ML & DevSecOps enthusiast || 
                  Embedded Systems Programmer || Postman Std. Leader || Open-Source Contributor.
                </p>
              </CardHeader>
            </Card>

            {/* Contact Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <div className="font-medium text-slate-800">Based in</div>
                    <div className="text-slate-600">Dhaka, BD</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Building2 className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <div className="font-medium text-slate-800">Company</div>
                    <div className="text-slate-600">University of HSTU</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <div className="font-medium text-slate-800">Email</div>
                    <a href="mailto:hasanshahriar32@gmail.com" className="text-orange-600 hover:underline">
                      hasanshahriar32@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-slate-600 mr-3" />
                  <div>
                    <div className="font-medium text-slate-800">Website</div>
                    <a 
                      href="https://shahriarhasan.vercel.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      shahriarhasan.vercel.app
                    </a>
                  </div>
                </div>

                <Separator />

                {/* Social Links */}
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Social Links</h4>
                  <p className="text-sm text-slate-600 mb-3">All have username: hasanshahriar32</p>
                  <div className="grid grid-cols-2 gap-2">
                    {socialLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <social.icon className="w-4 h-4 mr-2 text-slate-600" />
                        <span className="text-sm text-slate-700">{social.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tech Stack */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-orange-100 text-orange-700">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Experience, Education, Projects */}
          <div className="lg:col-span-2 space-y-8">
            {/* Experience */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Briefcase className="w-6 h-6 mr-3" />
                  Experience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      exp.type === 'current' ? 'bg-green-500' : 'bg-slate-400'
                    }`}></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">{exp.role}</h3>
                      <p className="text-orange-600 font-medium">{exp.company}</p>
                      <p className="text-slate-600 text-sm flex items-center mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {exp.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <GraduationCap className="w-6 h-6 mr-3" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-2"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">B.Sc Engg. in ECE</h3>
                    <p className="text-orange-600 font-medium">
                      Hajee Mohammad Danesh Science and Technology University. Dinajpur, Bangladesh.
                    </p>
                    <p className="text-slate-600 text-sm flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      2020 - Present
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-slate-400 mt-2"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">HSC & SSC</h3>
                    <p className="text-orange-600 font-medium">Saidpur Govt. Technical College.</p>
                    <p className="text-slate-600 text-sm flex items-center mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      2012 - 2019
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certification */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Award className="w-6 h-6 mr-3" />
                  Certification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mt-2"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">Full Stack Development</h3>
                    <p className="text-slate-600 mt-1">
                      MERN Stack development with TypeScript, Next JS, Docker, AWS.
                    </p>
                    <p className="text-slate-600 text-sm flex items-center mt-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      March 2022
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Code className="w-6 h-6 mr-3" />
                  Projects
                </CardTitle>
                <p className="text-slate-600 mt-2">
                  Some of the notable projects developed by Shahriar Hasan include:
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <h3 className="font-semibold text-slate-800 mb-2">{project.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{project.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">HSTU Mess Finder</h3>
          <Separator className="bg-slate-700 mb-6" />
          <p className="text-slate-400 mb-2">&copy; 2025 HSTU Mess Finder. All rights reserved.</p>
          <p className="text-slate-500">
            Developed with ❤️ by <span className="text-orange-400 font-medium">Shahriar Hasan</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
