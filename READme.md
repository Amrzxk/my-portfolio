# Portfolio Web Application

A modern portfolio web application built using Flask and Docker, featuring a responsive design with both server-side and client-side rendering capabilities.

## Features

- **Home Page**: Modern landing page with animations and portfolio introduction
- **Projects Page**: Showcase of projects with interactive cards
- **Contact Page**: Contact form with modern styling
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Theme switching capability
- **Dockerized Deployment**: Easy deployment with Docker
- **CI/CD Pipeline**: Automated testing and deployment using GitHub Actions

## Tech Stack

### Backend

- **Flask**: Python web framework
- **Jinja2**: Template engine for server-side rendering
- **SQLAlchemy**: Database ORM (prepared for future features)

### Frontend

- **HTML5/CSS3**: Modern, responsive layouts
- **JavaScript**: Client-side interactivity
- **Next.js**: React framework for static pages
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework

### DevOps

- **Docker**: Containerization
- **GitHub Actions**: CI/CD pipeline
- **Render**: Cloud deployment platform

## Project Structure

```
├── app.py                # Flask application entry point
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── requirements.txt      # Python dependencies
├── src/                  # Next.js frontend components
│   ├── app/             # Next.js app directory
│   └── components/      # Reusable React components
├── static/              # Static assets
│   ├── css/            # Stylesheets
│   ├── js/             # JavaScript files
│   └── images/         # Image assets
├── templates/           # Jinja2 templates
│   ├── base.html       # Base template
│   ├── index.html      # Home page
│   ├── projects.html   # Projects page
│   └── contact.html    # Contact page
└── .github/            # GitHub Actions workflows
```

## Local Development

1. Clone the repository:

   ```powershell
   git clone https://github.com/yourusername/portfolio-web.git
   cd portfolio-web
   ```

2. Install dependencies:

   ```powershell
   pip install -r requirements.txt
   ```

3. Run the Flask application:

   ```powershell
   python app.py
   ```

4. Visit `http://127.0.0.1:5000` in your browser

## Docker Deployment

1. Build the Docker image:

   ```powershell
   docker build -t portfolio-app .
   ```

2. Run with Docker:

   ```powershell
   docker run -p 5000:5000 portfolio-app
   ```

3. Visit `http://127.0.0.1:5000` in your browser

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration and deployment:

1. **Automated Checks**:
   - Builds the Docker image
   - Tests the container
   - Verifies application accessibility

2. **Deployment**:
   - Automatically deploys to Render on successful builds
   - Ensures application reliability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.