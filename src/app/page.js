"use client";

import "./globals.css"; // relative to src/app/page.js; if your path differs, update

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ---------- Animated Particles Background ---------- */
function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef({ y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    const particleCount = 40;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    // Handle mouse move
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Handle scroll
    const handleScroll = () => {
      scrollRef.current.y = window.scrollY;
    };

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "rgba(11, 11, 11, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // Movement
        p.x += p.vx;
        p.y += p.vy;

        // Scroll effect
        p.y += scrollRef.current.y * 0.0001;

        // Boundary wrapping
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repelDistance = 150;

        if (distance < repelDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / repelDistance) * 0.8;
          p.vx -= Math.cos(angle) * force;
          p.vy -= Math.sin(angle) * force;
        }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Draw particle
        ctx.fillStyle = `rgba(125, 211, 252, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(125, 211, 252, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

/* ---------- Navbar (client) ---------- */
function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Yash
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center">
            <a 
              href="#projects" 
              className="px-4 py-2 text-sm text-white/70 rounded-lg hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Projects
            </a>
            <a 
              href="#contact" 
              className="px-4 py-2 text-sm text-white/70 rounded-lg hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              Contact
            </a>
            <div className="mx-2 w-px h-6 bg-white/10"></div>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-white/70 rounded-lg hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              GitHub
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a 
              href="#contact" 
              className="px-5 py-2 rounded-lg text-sm font-medium bg-linear-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 text-white transition-all duration-200 border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              Let&apos;s Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden relative w-10 h-10 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center group"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#projects"
              className="block px-4 py-2 text-sm text-white/70 rounded-lg hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setOpen(false)}
            >
              Projects
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-sm text-white/70 rounded-lg hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setOpen(false)}
            >
              Contact
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-2 text-sm text-white/70 rounded-lg hover:text-white hover:bg-white/10 transition-all"
              onClick={() => setOpen(false)}
            >
              GitHub
            </a>
            <div className="pt-2 border-t border-white/10 mt-2">
              <a 
                href="#contact" 
                className="block px-4 py-2 rounded-lg text-sm font-medium bg-linear-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 text-white transition-all"
                onClick={() => setOpen(false)}
              >
                Let&apos;s Talk
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section className="grid gap-12 md:grid-cols-2 items-center py-16 md:py-24">
      <div className="space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              IoT & Embedded
            </span>
            <br />
            Systems Engineer
          </h1>
          <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
            Designing intelligent connected systems that merge hardware and software. Passionate about building IoT solutions from firmware to web interfaces.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a href="#about" className="px-6 py-3 rounded-lg bg-cyan-500/20 border border-cyan-500/50 text-white hover:bg-cyan-500/30 transition font-medium">
            Learn More
          </a>
          <a href="#contact" className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 transition font-medium">
            Get in Touch
          </a>
        </div>

        <div className="pt-8 border-t border-white/10">
          <p className="text-sm text-white/50 mb-3">Current Focus</p>
          <div className="flex flex-wrap gap-2">
            {["IoT Devices", "ESP32", "MQTT", "Web Dashboards", "Circuit Design"].map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-96 md:h-full flex items-center justify-center">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Stats cards */}
        <div className="relative z-10 grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-cyan-400">ECE</p>
            <p className="text-xs text-white/60 mt-1">B.Tech Student</p>
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-cyan-400">IoT</p>
            <p className="text-xs text-white/60 mt-1">Enthusiast</p>
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-cyan-400">Full</p>
            <p className="text-xs text-white/60 mt-1">Stack Builder</p>
          </div>
          <div className="p-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-2xl font-bold text-cyan-400">Creative</p>
            <p className="text-xs text-white/60 mt-1">Problem Solver</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <section className="mt-20" id="about">
      <div className="max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          About Me
        </h2>
        <p className="text-white/70 leading-relaxed mb-6 text-lg">
          I&apos;m Yash Kumar Prasad, an ECE (Electronics and Communications Engineering) student at Dronacharya College of Engineering with a passion for IoT and embedded systems. I focus on building connected solutions that bridge hardware and software seamlessly.
        </p>
        <p className="text-white/70 leading-relaxed text-lg">
          My interests span from designing intelligent IoT devices and embedded firmware to crafting web interfaces that control them. I believe in creating practical, scalable solutions that solve real-world problems through thoughtful engineering and clean code.
        </p>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
function Skills() {
  const categories = [
    {
      title: "Embedded Systems",
      skills: ["ESP32", "Arduino", "STM32", "C/C++", "Firmware Development"]
    },
    {
      title: "IoT & Hardware",
      skills: ["MQTT", "Sensor Integration", "Circuit Design", "PCB Design", "Protocol Stacks"]
    },
    {
      title: "Web Development",
      skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Web Dashboards"]
    },
    {
      title: "Tools & Software",
      skills: ["Multisim", "Proteus", "Git", "VS Code", "Arduino IDE"]
    }
  ];

  return (
    <section className="mt-20" id="skills">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills & Expertise</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((cat) => (
          <div key={cat.title} className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all">
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">{cat.title}</h3>
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-sm text-cyan-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Expertise Highlight ---------- */
function ExpertiseHighlight() {
  const highlights = [
    {
      icon: "⚙️",
      title: "Embedded Systems",
      desc: "Building intelligent firmware for microcontrollers with focus on efficiency and performance"
    },
    {
      icon: "🌐",
      title: "IoT Solutions",
      desc: "Designing connected devices that communicate securely and efficiently"
    },
    {
      icon: "🔧",
      title: "Hardware Design",
      desc: "From concept to PCB, creating circuits that solve real problems"
    },
    {
      icon: "💻",
      title: "Web Integration",
      desc: "Crafting intuitive dashboards and interfaces to control and monitor devices"
    }
  ];

  return (
    <section className="mt-20">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">What I Do</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {highlights.map((item) => (
          <div key={item.title} className="group p-6 rounded-xl border border-white/10 bg-linear-to-br from-white/5 to-white/0 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all">
            <div className="text-3xl mb-3">{item.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-white/60 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- ContactCTA ---------- */
function ContactCTA() {
  return (
    <section id="contact" className="mt-24 py-12">
      <div className="relative rounded-2xl border border-white/10 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-blue-500/10"></div>
        
        {/* Content */}
        <div className="relative p-8 md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Connect</h2>
            <p className="text-white/70 text-lg mb-8">
              I&apos;m always interested in discussing IoT projects, embedded systems, and innovative ideas. Feel free to reach out if you&apos;d like to collaborate or just have a chat about technology.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:youremail@example.com" 
                className="px-6 py-3 rounded-lg bg-linear-to-r from-cyan-500/80 to-blue-500/80 hover:from-cyan-500 hover:to-blue-500 text-white font-medium transition-all duration-200 border border-cyan-400/30 hover:border-cyan-400/60 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
              >
                Send Email
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg border border-white/20 text-white hover:bg-white/10 font-medium transition-all"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="mt-20 py-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/50 text-sm">
        <p>© {new Date().getFullYear()} Yash Kumar Prasad — ECE Student & IoT Enthusiast</p>
        <p>Built with Next.js · Tailwind CSS · React</p>
      </div>
    </footer>
  );
}

/* ---------- Page (default export) ---------- */
export default function Page() {
  return (
    <div className="min-h-screen bg-bg text-white antialiased">
      <ParticleBackground />
      <div className="container max-w-6xl mx-auto px-6 py-12 relative z-10">
        <Navbar />
        <main className="py-8">
          <Hero />
          <ExpertiseHighlight />
          <About />
          <Skills />
          <ContactCTA />
          <Footer />
        </main>
      </div>
    </div>
  );
}
