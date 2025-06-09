# Portfolio Web Application

This is a modern portfolio web application built using Flask and Docker. It showcases projects, contact information, and a clean, responsive design.

## Features

- **Home Page**: Introduces the portfolio owner.
- **Projects Page**: Displays a list of projects.
- **Contact Page**: Provides contact information.
- **Dockerized Deployment**: Easily deployable using Docker.
- **CI/CD Pipeline**: Automated checks and deployment using GitHub Actions.

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, Jinja2 templates
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Project Structure

```
app.py                # Flask application entry point
Dockerfile            # Docker configuration for deployment
docker-compose.yml    # Docker Compose configuration
requirements.txt      # Python dependencies
src/                  # Source files for frontend components
static/               # Static assets (CSS, JS, images)
templates/            # HTML templates
.github/workflows/    # GitHub Actions workflows
```

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/portfolio-web.git
   cd portfolio-web
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask application:
   ```bash
   python app.py
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## How to Run with Docker

1. Build the Docker image:
   ```bash
   docker build -t portfolio-app .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 5000:5000 portfolio-app
   ```

3. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000
   ```

## CI/CD Pipeline

This project uses GitHub Actions for CI/CD. The pipeline:

- Lints Python code using `flake8`.
- Builds the Docker image.
- Tests the Docker container.

## License

This project is licensed under the MIT License. Feel free to use and modify it for your own portfolio!