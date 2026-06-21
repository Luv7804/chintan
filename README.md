# 🚀 DevOps Portfolio Website

An interactive, responsive, and modern personal portfolio website showcasing DevOps capabilities, skillsets, and professional experience. Built with clean, vanilla HTML/CSS/JavaScript and utilizing Three.js for immersive 3D background visual effect.

✨ **Live Demo**: [https://Luv7804.github.io/chintan/](https://Luv7804.github.io/chintan/)

---

## 🛠️ Tech Stack & Libraries
* **Core**: HTML5, Vanilla CSS3 (Custom Variables, Flexbox/Grid layouts), JavaScript (ES6+)
* **3D Visuals**: [Three.js](https://threejs.org/) (Interactive particle wave in the Hero section)
* **Icons**: [FontAwesome 6](https://fontawesome.com/) & [Devicons](https://devicon.dev/)
* **CI/CD**: GitHub Actions (Node.js 24 environment)
* **Hosting**: GitHub Pages

---

## 🌟 Key Features
* **Interactive 3D Particle Canvas**: Smooth, responsive particle field built using custom shaders & vectors in Three.js that reacts to user interactions.
* **Modern dark/light theme toggle**: Implemented using CSS variables and local storage for persisting user preferences.
* **Typing Animation**: Dynamically cycles through various DevOps and SRE roles.
* **Formspree Contact Form Integration**: Working contact section with validation.
* **Fully Responsive**: Fine-tuned breakpoints for flawless display across all screen sizes (mobile, tablet, desktop).
* **Automated CI/CD Pipeline**: GitHub Actions automatically updates the site on GitHub Pages on every push to the `main` branch.

---

## 📁 Repository Structure
```bash
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD deployment workflow using Node.js 24
├── Chintan_profile.jpg     # Profile image
├── index.html              # Main webpage structure (semantic HTML5)
├── README.md               # Repository documentation (this file)
├── script.js               # Three.js animation, typing effect, and theme control logic
└── style.css               # Styling system, responsive styling, and CSS variables
```

---

## 🚀 Getting Started & Local Development

### Prerequisites
To run this website locally, you don't need any complex local setup. Any simple web server will do.

### Quick Start
1. **Clone the repository:**
   ```bash
   git clone git@github.com:Luv7804/chintan.git
   cd chintan
   ```

2. **Run a local development server:**
   You can open `index.html` directly in the browser, or run a simple python/node server:
   ```bash
   python3 -m http.server 8000
   # OR
   npx serve .
   ```
   Open `http://localhost:8000` (or the respective port) in your browser.

---

## ⚙️ CI/CD Deployment

The repository uses GitHub Pages for hosting. A preconfigured workflow runs on every push to `main`:

1. It checks out the repository.
2. Injects the contact form ID from GitHub Secrets.
3. Automatically packages and publishes the static assets to GitHub Pages.

Check [.github/workflows/deploy.yml](.github/workflows/deploy.yml) for the deployment steps.
