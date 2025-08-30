  "use client";
  import { ModeToggle } from "@/components/mode-toggle";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
  import { Badge } from "@/components/ui/badge";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    ExternalLink,
  } from "lucide-react";
  import Link from "next/link";
  import ProjectCard from "@/components/project-card";
  import ExperienceCard from "@/components/experience-card";
  import SkillBadge from "@/components/skill-badge";
  import { useState } from "react";
  import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
  import { toast } from "react-hot-toast";
  export default function Home() {
    const { executeRecaptcha } = useGoogleReCaptcha();
    // Add these states at the top of your component
    const [form, setForm] = useState({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm({ ...form, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      // Simple validation
      if (!form.name || !form.email || !form.subject || !form.message) {
        setError("Please fill in all required fields.");
        return;
      }
      setLoading(true);
      toast.loading("Sending message...", { id: "sending-message" });
      try {
        if(!executeRecaptcha){
          setError("Please verify that you are not a robot.");
          return;
        }

        const token = await executeRecaptcha("contact_us");
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, token }),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("Message sent successfully!");
          setSuccess("Message sent successfully!");
          setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        } else {
          setError(data.message || "Failed to send message.");
        }
      } catch {
        setError("Failed to send message.");
      }
      setLoading(false);
      toast.dismiss("sending-message");
    };

  return (
    <>
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">
                Pascal Ndacyayisenga
              </span>
            </div>
            <nav className="hidden md:flex gap-6">
              <Link
                href="#about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                About
              </Link>
              <Link
                href="#experience"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Experience
              </Link>
              <Link
                href="#projects"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Projects
              </Link>
              <Link
                href="#skills"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Skills
              </Link>
              <Link
                href="#education"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Education
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Contact
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button
                variant="outline"
                size="sm"
                asChild
                className="hidden md:flex"
              >
                <Link href="#contact">Contact Me</Link>
              </Button>
            </div>
          </div>
        </header>
        <main className="container py-8 md:py-12">
          {/* Hero Section */}
          <section className="py-12 md:py-16 lg:py-20 space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-2/3 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                  Hi, I'm{" "}
                  <span className="text-primary">Pascal Ndacyayisenga</span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                  Full Stack Web Developer
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed md:leading-loose">
                  Motivated Web Developer and eCommerce specialist with strong
                  experience in front-end and back-end development. Skilled in
                  database management, RESTful APIs, and digital sales
                  operations. Adept at delivering scalable web solutions and
                  supporting businesses in optimizing their online presence.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                  >
                    <Link href="#contact">Get in Touch</Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md hover:bg-accent"
                  >
                    <Link href="#projects">View Projects</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <Avatar className="w-48 h-48 border-4 border-primary/20 shadow-lg transition-all duration-500 hover:border-primary/40 hover:shadow-xl">
                  <AvatarImage
                    src="/202202200000023.jpg?height=192&width=192"
                    alt="Pascal Ndacyayisenga"
                  />
                  <AvatarFallback className="text-4xl">PN</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-6">
              <Link href="mailto:pascope250@gmail.com">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full transition-all duration-300 hover:bg-accent hover:scale-110"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>

              <Link href="https://github.com/pascope250">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full transition-all duration-300 hover:bg-accent hover:scale-110"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">Github</span>
                </Button>
              </Link>

              <Link href="https://www.linkedin.com/in/pascal-ndacyayisenga-605390282/">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full transition-all duration-300 hover:bg-accent hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              {/* Add more social links if available */}
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-12 scroll-mt-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  About Me
                </h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="max-w-4xl mx-auto bg-card rounded-xl p-6 md:p-8 shadow-sm border">
                <div className="space-y-6">
                  <p className="text-xl font-medium leading-relaxed md:leading-loose">
                    I'm a{" "}
                    <span className="text-primary font-semibold">
                      Full Stack Web Developer
                    </span>{" "}
                    and eCommerce specialist with a passion for building
                    scalable web solutions.
                  </p>
                  <div className="space-y-5 text-base md:text-lg leading-relaxed md:leading-loose text-card-foreground/90">
                    <p>
                      My journey in tech began with a strong interest in how
                      digital solutions can transform businesses. Over the
                      years, I have developed expertise in both front-end and
                      back-end development, database management, and digital
                      sales operations.
                    </p>
                    <p>
                      I am skilled in designing and implementing RESTful APIs,
                      building responsive interfaces, and managing full-stack
                      projects from planning to deployment. My experience spans
                      working independently as a freelancer and collaborating
                      with international teams.
                    </p>
                    <blockquote className="pl-4 border-l-4 border-primary/50 italic my-6 md:my-8 py-2">
                      <p className="text-lg md:text-xl font-light">
                        I value problem-solving, teamwork, and continuous
                        learning. My goal is to deliver high-quality solutions
                        that help businesses grow online.
                      </p>
                    </blockquote>
                    <p>
                      Outside of coding, I enjoy learning new languages and
                      exploring the latest trends in technology and eCommerce.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4 pt-4">
                    <Button
                      asChild
                      size="lg"
                      className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                    >
                      <Link
                        href="#projects"
                        className="flex items-center gap-2"
                      >
                        <span>View My Work</span>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    {/* Add resume download if available */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-12 scroll-mt-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Work Experience
                </h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="grid gap-6">
                <ExperienceCard
                  title="Web Developer"
                  company="Freelancer"
                  location="Remote / Kigali"
                  type="Freelance"
                  period="2021 - Present"
                  description="Delivered full-stack web solutions for small businesses and startups."
                  responsibilities={[
                    "Designed and implemented database schemas for scalable web applications.",
                    "Built and deployed RESTful APIs using Express.js with user authentication & CRUD operations.",
                    "Developed responsive front-end interfaces with HTML, CSS, and JavaScript.",
                    "Integrated MySQL/MariaDB databases with Node.js backends for dynamic content delivery.",
                    "Managed full-stack projects independently, from planning to deployment.",
                    "Delivered tailored website and eCommerce solutions for clients.",
                  ]}
                />
                <ExperienceCard
                  title="Product Manager"
                  company="Funfu Ltd China-Jihnua"
                  location="China-Jihnua"
                  type="Full-time"
                  period="2024 - 2025"
                  description="Managed product selection, quality, and logistics for eCommerce operations."
                  responsibilities={[
                    "Selected and sorted products based on customer demand and seasonal trends.",
                    "Labeled, packaged, and stocked products, ensuring proper warehouse organization.",
                    "Checked product quality before shipping and assisted with inventory management.",
                    "Collaborated with logistics and customer service teams to streamline order fulfillment.",
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-12 scroll-mt-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Recent Projects
                </h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add your real projects here */}

                <ProjectCard
                  title="Logistic System"
                  period="2025"
                  description="Developed a logistic system for managing transport and logistics operations, including vehicle tracking, route planning, and order management."
                  technologies={[
                    "Node.js",
                    "Express.js",
                    "mariadb",
                    "Prisma",
                    "Nextjs",
                    "TypeScript",
                    "TailwindCSS",
                  ]}
                  imageUrl="/Understanding-Transport-Logistics.jpg?height=300&width=600"
                />

                <ProjectCard
                  title="Hobby Movies"
                  period="2025"
                  description="Developed a responsive Movie Stream platform with single movie details, movies by genre, and search functionality."
                  technologies={[
                    "Node.js",
                    "Express.js",
                    "mariadb",
                    "Nextjs",
                    "TypeScript",
                    "TailwindCSS",
                  ]}
                  imageUrl="/hobbyvb.png?height=300&width=600"
                />

                <ProjectCard
                  title="Inventory Management System"
                  period="2025"
                  description="A web-based inventory and stock management system for small businesses, featuring CRUD operations, user authentication, and reporting."
                  technologies={["Node.js", "Express.js", "Mariadb", "React"]}
                  imageUrl="/inventory-in-out.png?height=300&width=600"
                />
                <ProjectCard
                  title="eCommerce Website"
                  period="2024"
                  description="Developed a responsive eCommerce platform with product catalog, shopping cart, and order management features."
                  technologies={[
                    "Node.js",
                    "Express.js",
                    "mariadb",
                    "React",
                    "TailwindCSS",
                  ]}
                  imageUrl="/ecom.png?height=300&width=600"
                />

                <ProjectCard
                  title="School Management System"
                  period="2024"
                  description="Developed a responsive School Management System with student registration, course management, and attendance tracking features."
                  technologies={[
                    "php",
                    "mariadb",
                    "html",
                    "css",
                    "javascript",
                    "jquery",
                    "Bootstrap",
                    "Ajax",
                  ]}
                  imageUrl="/Which-is-the-best-all-in-one-school-management-system.png?height=300&width=600"
                />
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-12 scroll-mt-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Technical & General Skills
                </h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <Card className="shadow-sm">
                <CardContent className="p-6">
                  <Tabs defaultValue="technical" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="technical">Technical</TabsTrigger>
                      <TabsTrigger value="general">General</TabsTrigger>
                    </TabsList>
                    <TabsContent value="technical" className="mt-6 space-y-4">
                      <h3 className="text-xl font-semibold">
                        Technical Skills
                      </h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <SkillBadge name="HTML" level="Advanced" />
                        <SkillBadge name="CSS" level="Advanced" />
                        <SkillBadge name="JavaScript" level="Advanced" />
                        <SkillBadge name="React" level="Intermediate" />
                        <SkillBadge name="PHP" level="Intermediate" />
                        <SkillBadge name="La" level="Intermediate" />
                        <SkillBadge name="Node.js" level="Advanced" />
                        <SkillBadge name="Nextjs" level="Advanced" />
                        <SkillBadge name="Express.js" level="Advanced" />
                        <SkillBadge name="TypeScript" level="Intermediate" />
                        <SkillBadge name="TailwindCSS" level="Intermediate" />
                        <SkillBadge name="RESTful APIs" level="Advanced" />
                        <SkillBadge
                          name="User Authentication"
                          level="Advanced"
                        />
                        <SkillBadge name="CRUD Operations" level="Advanced" />
                        <SkillBadge name="MySQL/MariaDB" level="Intermediate" />
                        <SkillBadge name="Git" level="Intermediate" />
                        <SkillBadge name="npm" level="Intermediate" />
                        <SkillBadge name="Flutter" level="Intermediate" />
                      </div>
                    </TabsContent>
                    <TabsContent value="general" className="mt-6 space-y-4">
                      <h3 className="text-xl font-semibold">General Skills</h3>
                      <div className="flex flex-wrap gap-3 mt-2">
                        <SkillBadge
                          name="Problem-Solving & Debugging"
                          level="Advanced"
                        />
                        <SkillBadge
                          name="Inventory & Stock Management"
                          level="Intermediate"
                        />
                        <SkillBadge
                          name="Team Collaboration & Communication"
                          level="Advanced"
                        />
                        <SkillBadge name="Time Management" level="Advanced" />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <div className="pt-6">
                    <h3 className="text-xl font-semibold">Languages</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <Badge>Kinyarwanda (Native)</Badge>
                      <Badge>English (Fluent)</Badge>
                      <Badge>Chinese (Basic)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="py-12 scroll-mt-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Education
                </h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="grid gap-6">
                <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          Musanze College / University of Jinhua
                        </CardTitle>
                        <CardDescription className="text-base font-medium mt-1">
                          Advanced Diploma In Information and Communication
                          Technology
                        </CardDescription>
                      </div>
                      <Badge className="w-fit mt-1 sm:mt-0">2021 - 2024</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Focused on software development, database management, and
                      web technologies.
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <CardTitle className="text-xl font-bold">
                          APEKI Tumba TVET School
                        </CardTitle>
                        <CardDescription className="text-base font-medium mt-1">
                          A2, In Software Development
                        </CardDescription>
                      </div>
                      <Badge className="w-fit mt-1 sm:mt-0">2019 - 2021</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Completed vocational education in software development.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-12 scroll-mt-20">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-3xl font-extrabold tracking-tight">
                  Get In Touch
                </h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="shadow-sm transition-transform duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold">
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-base">
                      Feel free to reach out through any of these channels
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-4">
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full text-primary shrink-0"
                      >
                        <Mail className="h-5 w-5" />
                      </Button>
                      <div>
                        <p className="font-semibold text-base">Email</p>
                        <p className="text-sm text-muted-foreground">
                          pascope250@gmail.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full text-primary shrink-0"
                      >
                        <Phone className="h-5 w-5" />
                      </Button>
                      <div>
                        <p className="font-semibold text-base">Phone</p>
                        <p className="text-sm text-muted-foreground">
                          +250-781-495-385 / +250-736-781-948
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full text-primary shrink-0"
                      >
                        <MapPin className="h-5 w-5" />
                      </Button>
                      <div>
                        <p className="font-semibold text-base">Location</p>
                        <p className="text-sm text-muted-foreground">
                          Kigali, Rwanda
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <p className="font-semibold text-base mb-3">Reference</p>
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div>
                          <span className="font-semibold">Funfu CEO:</span>{" "}
                          IZERE Roger
                          <br />
                          Phone: +8613626690114
                        </div>
                        <div>
                          <span className="font-semibold">
                            Hdevtech. / CEO:
                          </span>
                          <br />
                          Phone: +250724270103
                          <br />
                          Email: 627672419@qq.com
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl font-bold">
                      Send Me a Message
                    </CardTitle>
                    <CardDescription className="text-base">
                      I'll get back to you as soon as possible
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <input
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Tel:
                        </label>
                        <input
                          id="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <input
                          id="subject"
                          value={form.subject}
                          onChange={handleChange}
                          placeholder="Message subject"
                          required
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Your message"
                          rows={4}
                          required
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                      {error && (
                        <div className="text-red-600 text-sm">{error}</div>
                      )}
                      {success && (
                        <div className="text-green-600 text-sm">{success}</div>
                      )}
                     
                      <Button
                        type="submit"
                        className="w-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} Pascal Ndacyayisenga. All rights
              reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
