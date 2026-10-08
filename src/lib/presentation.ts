export type PresentationItem = { title: string; text?: string; points?: string[] };
export type PresentationSlide = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  items?: PresentationItem[];
  flow?: string[];
  note?: string;
  divider?: boolean;
};

// One entry per page, in the order of the uploaded StudyOS presentation.
export const presentation: PresentationSlide[] = [
  { id: "cover", eyebrow: "Graduation Project", title: "StudyOS", subtitle: "Under the supervision of Dr. Hossam Gomaa", items: [
    { title: "Backend", text: "Ahmed Mohamed" },
    { title: "AI", text: "Fatma Mahmoud" },
    { title: "Frontend", text: "Mohamed Essam · Mohamed Bayoumi" },
    { title: "UI / UX", text: "Hamdi Mohamed" },
    { title: "DevOps", text: "Mohamed Ali · Mohamed Samir" },
  ] },
  { id: "problem", eyebrow: "The Problem", title: "Traditional Learning is Inefficient", items: [
    { title: "Students drown in hundreds of PDF pages before exams" },
    { title: "Manual summarization is time-consuming and inconsistent" },
    { title: "No personalized tracking of weak topics" },
    { title: "Generic revision schedules don't adapt to individual needs" },
    { title: "Students forget material due to poor revision timing" },
  ] },
  { id: "backend", eyebrow: "01 / 05", title: "Backend", subtitle: "Architecture · Document Processing & Data Flow · AI Integration", divider: true },
  { id: "backend-stack", eyebrow: "Backend", title: "Backend Architecture & Technology Stack", items: [
    { title: "Backend Framework", text: ".NET 10 / C# 14 — ASP.NET Core Web API" },
    { title: "Database", text: "SQL Server with Entity Framework Core 10" },
    { title: "Authentication", text: "JWT Access & Refresh Tokens" },
    { title: "Validation", text: "FluentValidation" },
    { title: "API Documentation", text: "OpenAPI / Scalar" },
    { title: "Architecture", text: "Clean Architecture" },
  ] },
  { id: "document-processing", eyebrow: "Backend", title: "Document Processing & Learning Data Flow", items: [
    { title: "Document Upload", text: "Frontend sends the student's document and processing request to the .NET API." },
    { title: "Backend Processing", text: "Validates the request, manages the document and coordinates the processing workflow." },
    { title: "AI Analysis", text: "Backend sends the required document data to the AI service for analysis." },
    { title: "Structured Results", text: "AI returns structured learning data instead of directly accessing the database." },
    { title: "Persistence", text: "Backend maps and stores the generated data in SQL Server." },
  ], flow: ["Frontend", ".NET API", "AI Service", ".NET API", "SQL Server"] },
  { id: "ai-integration", eyebrow: "Backend", title: "AI Integration & Learning Content", subtitle: "AI Responsibilities: Analyze uploaded learning material and generate structured educational content.", items: [
    { title: "Generated Content", points: ["Chapters", "Concepts & Concept Relationships", "Summaries", "Flashcards", "Questions & Quizzes", "Document Keywords"] },
    { title: "Backend Responsibilities", points: ["Receive AI results", "Validate and map generated data", "Maintain relationships between entities", "Persist results in SQL Server"] },
    { title: "Data Ownership", points: ["Backend owns the database", "AI has no direct database access", "Backend controls persistence"] },
  ] },
  { id: "ai", eyebrow: "02 / 05", title: "AI", subtitle: "AI Engineer Role · Tech Stack · Architecture · Workflow · Discussion Preparation", divider: true },
  { id: "ai-role", eyebrow: "AI", title: "My Role as AI Engineer", subtitle: "I am responsible for the AI Layer: receiving learning material, preparing the content, sending the appropriate context to the LLM, validating the generated result, and returning structured AI data to the backend.", flow: ["Receive learning material", "Prepare the content", "Send context to the LLM", "Validate the generated result", "Return structured AI data to the backend"] },
  { id: "ai-architecture", eyebrow: "AI · Architecture", title: "AI Architecture", flow: ["Frontend", "Backend", "AI Layer", "Document Processing", "Gemini LLM", "JSON Validation", "Backend"] },
  { id: "ai-workflow", eyebrow: "AI · Workflow", title: "Main AI Flow", items: [
    { title: "Receive document reference/input from the backend." },
    { title: "Extract text from PDF or PowerPoint files." },
    { title: "Clean and normalize the extracted content." },
    { title: "Split large content into manageable chunks." },
    { title: "Build task-specific prompts." },
    { title: "Send the relevant context to Gemini." },
    { title: "Generate summaries, flashcards and questions." },
    { title: "Validate and normalize the returned JSON." },
  ], note: "Result: Return a predictable response to the backend." },
  { id: "ai-stack-1", eyebrow: "AI · Tech Stack · 1 of 2", title: "AI Tech Stack", items: [
    { title: "Python 3.12", text: "Main programming language for the AI Layer and processing logic." },
    { title: "Google Gemini API", text: "LLM used for content understanding and generation." },
    { title: "Prompt Engineering", text: "Controls how the model performs summarization, question generation and flashcard generation." },
    { title: "Structured JSON Output", text: "Keeps AI responses machine-readable and consistent for the backend." },
    { title: "PyMuPDF (fitz)", text: "Extracts text from PDF documents." },
    { title: "python-pptx", text: "Extracts text/content from PowerPoint files." },
    { title: "Text Chunking", text: "Splits large documents into smaller contextual units before LLM processing." },
  ] },
  { id: "ai-stack-2", eyebrow: "AI · Tech Stack · 2 of 2", title: "AI Tech Stack", items: [
    { title: "Text Preprocessing", text: "Cleans and organizes extracted text before sending it to the model." },
    { title: "FastAPI", text: "Provides the AI service/API endpoints." },
    { title: "Uvicorn", text: "Runs the FastAPI application server." },
    { title: "Pydantic v2", text: "Validates request and response schemas." },
    { title: "python-dotenv / Settings", text: "Manages configuration and secrets such as API keys." },
    { title: "HTTPX", text: "HTTP client for service/API communication when needed." },
    { title: "Pytest", text: "Tests AI logic and API behavior." },
  ] },
  { id: "why-gemini", eyebrow: "AI · Features", title: "AI Features & Why Gemini", items: [
    { title: "AI Features", points: ["Automatic summarization of uploaded learning material.", "Flashcard generation.", "Question/quiz generation.", "Structured output for frontend/backend consumption.", "Content preparation for future knowledge-gap and recommendation features."] },
    { title: "Why Gemini?", points: ["It provides strong natural-language understanding and generation.", "It can process educational content and generate multiple learning formats.", "It can return structured outputs suitable for application integration.", "It avoids the need to train a custom LLM for the project scope."] },
  ] },
  { id: "ai-contribution", eyebrow: "AI · Important Discussion Point", title: "The project does not claim that Gemini itself was trained by our team.", subtitle: "Our contribution is the AI engineering layer around the LLM: document processing, context preparation, prompt design, output validation, integration and application logic." },
  { id: "ai-questions", eyebrow: "AI · Discussion Preparation", title: "Expected Questions", items: [
    { title: "Why do you need chunking?", text: "Because large documents may exceed practical context limits and can reduce response quality. Chunking lets us process the material in controlled contextual pieces." },
    { title: "Why JSON validation?", text: "Because the backend needs predictable fields and data types. Validation prevents malformed AI output from breaking downstream services." },
    { title: "What happens if Gemini fails?", text: "The AI service should handle API errors with timeout/retry logic where appropriate and return a controlled error response instead of passing an invalid result to the backend." },
    { title: "Is this Machine Learning training?", text: "No. We are integrating a pre-trained LLM through an API. Our work is AI application engineering, prompt design, processing and integration." },
  ] },
  { id: "frontend", eyebrow: "03 / 05", title: "Frontend", subtitle: "Architecture · Backend & AI Integration · Student Journey · Design System", divider: true },
  { id: "frontend-stack", eyebrow: "Frontend", title: "Frontend Architecture & Technology Stack", items: [
    { title: "Frontend Framework", text: "Next.js (App Router) with TypeScript in strict mode" },
    { title: "Styling & Components", text: "Tailwind CSS with shadcn/ui, driven by design tokens" },
    { title: "Server State", text: "TanStack Query for caching, retries, polling, and loading states" },
    { title: "Forms & Validation", text: "React Hook Form with Zod schemas that mirror the API constraints" },
    { title: "Data Visualization", text: "Recharts for the student progress charts" },
  ] },
  { id: "frontend-contract", eyebrow: "Frontend", title: "Frontend Integration with the Backend & AI Service", items: [
    { title: "Single Entry Point", text: "The frontend talks only to the .NET API and never directly to the AI service." },
    { title: "Typed API Contract", text: "TypeScript types and client are generated from the backend's OpenAPI contract." },
    { title: "Secure Sessions", text: "JWT tokens live in httpOnly cookies, handled by Next.js Route Handlers that proxy to the API." },
  ] },
  { id: "frontend-integration", eyebrow: "Frontend", title: "Frontend Integration with the Backend & AI Service", items: [
    { title: "Token Refresh", text: "Automatic refresh on expiry, with a single shared refresh to avoid conflicts." },
    { title: "Long-Running AI Tasks", text: "Processing states (uploading, processing, completed, failed) with polling." },
    { title: "Error Handling", text: "API errors are mapped to translated, user-friendly messages." },
  ], flow: ["Browser", "Next.js Route Handlers", ".NET API", "AI Service / SQL Server"] },
  { id: "student-pages", eyebrow: "Frontend", title: "Student Journey & Core Pages", items: [
    { title: "Authentication", text: "Register and login with validated forms and protected routes." },
    { title: "Dashboard", text: "Quick overview of recent summaries, unfinished quizzes, and weakest topics." },
    { title: "Document Upload", text: "PDF, Word, or pasted text, with upload progress and processing status." },
    { title: "Summary Reader", text: "A read-only reading experience designed for long text." },
    { title: "Quizzes", text: "Multiple-choice and true/false questions generated from the learning material, with solving and results review." },
    { title: "Progress Tracking", text: "Score trends, activity, time spent, and strong versus weak topics." },
  ] },
  { id: "student-flow", eyebrow: "Frontend", title: "Student Flow", flow: ["Upload", "Process", "Read Summary", "Generate Quiz", "Solve", "Review Results", "Track Progress"] },
  { id: "frontend-design", eyebrow: "Frontend", title: "Design System, UX Collaboration & Bilingual Support", items: [
    { title: "Design System", text: "Colors, typography, spacing, and radius defined once as design tokens (CSS variables)." },
    { title: "UI/UX Collaboration", text: "Designs from the UI/UX team are translated into reusable components." },
    { title: "Bilingual Interface", text: "Arabic and English with a language switcher, using next-intl." },
    { title: "RTL / LTR Support", text: "Layout uses logical properties so the interface mirrors correctly in both directions." },
    { title: "Interface States", text: "Designed loading, empty, error, and processing states for every screen." },
    { title: "Accessibility", text: "WCAG AA contrast, keyboard navigation, and visible focus indicators." },
  ] },
  { id: "ui-ux", eyebrow: "04 / 05", title: "UI / UX", subtitle: "Study OS · Designing the user experience and interface", divider: true },
  { id: "designer-role", eyebrow: "UI / UX Design · My Role", title: "UI / UX Designer", subtitle: "The design part of the project", flow: ["User Experience Design", "User Interface Design", "Interactive Prototype", "Developer Handoff"], note: "Main Tool: Figma" },
  { id: "design-first", eyebrow: "UI / UX Design", title: "Why UI / UX Comes First", subtitle: "Design is the plan before writing code", flow: ["IDEA", "UX", "UI", "PROTOTYPE", "CODE"], note: "We define the experience and visual system first — then developers turn it into code." },
  { id: "ux-process", eyebrow: "UI / UX Design", title: "UX Process", subtitle: "Simple steps before the final UI", items: [
    { title: "Understand the User", text: "What does the user need?" },
    { title: "User Flow", text: "How does the user move through the platform?" },
    { title: "Wireframe", text: "Where should each element go?" },
    { title: "Prototype", text: "How will the interface behave?" },
  ] },
  { id: "visual-identity", eyebrow: "Study OS · UI Visual Identity", title: "Colors and consistency", items: [
    { title: "Primary Colors", text: "Orange" },
    { title: "Typography", text: "Poppins", points: ["Aa Bb Cc Dd", "0123456789 & 0/0 $ #", "Clean typography for easy reading."] },
  ] },
  { id: "figma", eyebrow: "UI / UX Design", title: "Why Figma?", items: [
    { title: "Auto Layout", text: "Build flexible and responsive layouts." },
    { title: "Collaboration", text: "Work with the team in one shared file." },
    { title: "Prototype", text: "Test interactions before development." },
    { title: "Components", text: "Reuse UI elements and keep the design consistent." },
    { title: "Developer Handoff", text: "Give developers clear specs and assets." },
  ], note: "Figma = Design + Prototype + Collaboration" },
  { id: "dribbble", eyebrow: "Visual Inspiration", title: "Dribbble", subtitle: "Using Dribbble for visual research", items: [
    { title: "Explore modern design trends" },
    { title: "Find visual inspiration" },
    { title: "Improve my design direction" },
  ], note: "I use Dribbble to explore, find and improve — without copying designs." },
  { id: "ui-implementation", eyebrow: "UI / UX Design", title: "UI Implementation", items: [
    { title: "Login & Sign Up screens", text: "Clear, simple and responsive interface" },
    { title: "Main Platform UI", text: "Responsive design for different screen sizes" },
  ] },
  { id: "figma-to-code", eyebrow: "UI / UX Design · The Design Becomes the Development Blueprint", title: "From Figma to Code", items: [
    { title: "Design", text: "Figma" },
    { title: "Handoff", text: "Specs + Assets" },
    { title: "Development", text: "HTML / CSS / JS" },
    { title: "Final UI", text: "Study OS" },
  ], note: "UI / UX is the foundation that turns an idea into a usable product." },
  { id: "devops", eyebrow: "05 / 05", title: "DevOps", subtitle: "StudyOS Graduation Project · DevOps Presentation", divider: true },
  { id: "deployment-stack-1", eyebrow: "DevOps", title: "DevOps Stack & Deployment Architecture", items: [
    { title: "CI/CD Platform", text: "GitHub Actions for automated build, test, and deployment." },
    { title: "Containerization", text: "Docker for packaging the Frontend, the .NET API, and the AI Service into portable containers that run on Amazon ECS with AWS Fargate." },
    { title: "Container Registry", text: "Amazon ECR (Elastic Container Registry) for storing versioned application images." },
    { title: "Environment Management", text: "Development, Staging, and Production environments with separate configuration files and secrets." },
  ] },
  { id: "deployment-stack-2", eyebrow: "DevOps", title: "DevOps Stack & Deployment Architecture", items: [
    { title: "Reverse Proxy & Routing", text: "Nginx and an AWS Application Load Balancer for HTTPS termination and routing requests to the Frontend and the API." },
    { title: "Edge Protection", text: "Cloudflare for DNS, SSL, CDN caching, and protection against malicious traffic." },
    { title: "Configuration Management", text: "AWS Secrets Manager, Environment Variables, and GitHub Secrets for secure runtime configuration." },
    { title: "Database Deployment", text: "SQL Server on Amazon RDS, with migrations managed through Entity Framework Core during the release pipeline." },
  ] },
  { id: "cicd-1", eyebrow: "DevOps · CI/CD · 1 of 2", title: "CI/CD Pipeline & Automated Quality Gates", items: [
    { title: "Source Control", text: "GitHub repositories with feature branches, pull requests, and code reviews." },
    { title: "Continuous Integration", text: "Every push triggers automated restore, build, and unit testing for the .NET backend and the frontend." },
    { title: "Test Automation", text: "Runs backend unit tests and integration tests before deployment." },
    { title: "Code Quality Gate", text: "Fails the pipeline if compilation errors, test failures, or security issues are detected." },
  ] },
  { id: "cicd-2", eyebrow: "DevOps · CI/CD · 2 of 2", title: "CI/CD Pipeline & Automated Quality Gates", items: [
    { title: "Docker Image Build", text: "Creates a tagged Docker image for each service after successful validation and pushes it to Amazon ECR." },
    { title: "Artifact Versioning", text: "Uses semantic versioning and commit SHA tags to ensure release traceability." },
    { title: "Continuous Deployment", text: "Automatically deploys approved builds to the Staging environment on Amazon ECS, then promotes validated releases to Production." },
    { title: "Rollback Strategy", text: "Allows fast rollback to the previous stable ECS task definition and image if a deployment fails." },
  ] },
  { id: "operations-1", eyebrow: "DevOps", title: "Runtime Scalability & Service Operations", items: [
    { title: "Service Separation", text: "Deploys the Frontend, the .NET API, and the AI Service as independent containers that can be scaled separately." },
    { title: "AI Processing Isolation", text: "Document analysis runs in the AI Service, so heavy AI workloads do not slow down the main API." },
    { title: "Horizontal Scaling", text: "Uses ECS Auto Scaling to add more API or AI Service instances when the number of students and uploaded documents increases, especially during exam periods." },
    { title: "Load Balancing", text: "Nginx and the AWS Application Load Balancer distribute incoming traffic across multiple backend instances." },
  ] },
  { id: "operations-2", eyebrow: "DevOps", title: "Runtime Scalability & Service Operations", items: [
    { title: "Timeout & Retry Control", text: "Defines timeouts between the API and the AI Service so slow document processing does not block users." },
    { title: "Health Checks", text: "Exposes readiness and liveness endpoints to verify API, AI Service, and database availability." },
    { title: "Resource Limits", text: "Defines CPU and memory limits for containers to keep the platform stable under heavy workloads." },
    { title: "Data Persistence", text: "Stores SQL Server data on Amazon RDS, so restarting or replacing a container never loses information." },
  ] },
  { id: "monitoring-1", eyebrow: "DevOps", title: "Monitoring, Security & Reliability", items: [
    { title: "Centralized Logging", text: "Collects application logs, HTTP request logs, and AI Service logs in Amazon CloudWatch Logs." },
    { title: "Metrics Monitoring", text: "Tracks API latency, error rate, CPU usage, memory usage, and document processing time using Amazon CloudWatch." },
    { title: "Alerting", text: "Sends alerts through CloudWatch Alarms and Amazon SNS when services are unhealthy, deployment failures occur, or error rates exceed defined thresholds." },
    { title: "Secret Protection", text: "Stores database credentials, JWT keys, and AI service keys in AWS Secrets Manager, outside the codebase." },
  ] },
  { id: "monitoring-2", eyebrow: "DevOps", title: "Monitoring, Security & Reliability", items: [
    { title: "Transport Security", text: "Enforces HTTPS/TLS communication between clients, Cloudflare, Nginx, and the services." },
    { title: "Edge Security", text: "Cloudflare provides DDoS protection, rate limiting, and a web application firewall in front of the platform." },
    { title: "Database Reliability", text: "Uses Amazon RDS automated backups, retention policies, and migration validation for SQL Server." },
    { title: "Deployment Safety", text: "Uses health checks, rolling deployments, and rollback procedures to minimize production downtime." },
  ] },
  { id: "closing", eyebrow: "StudyOS · Graduation Project", title: "Thank You", subtitle: "Any Questions?", note: "We would be happy to discuss any part of the platform: Backend, AI, Frontend, UI/UX or DevOps.", divider: true },
];