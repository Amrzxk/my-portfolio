import os
from datetime import datetime

from dotenv import load_dotenv
from flask import (
    Flask,
    abort,
    jsonify,
    redirect,
    render_template,
    request,
    send_from_directory,
    url_for,
)

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "your-secret-key-here")
app.config["CONTACT_EMAIL"] = os.environ.get("CONTACT_EMAIL", "amrzakariya2018@gmail.com")

# Template filter for current year
@app.template_filter("current_year")
def current_year_filter(s):
    return datetime.now().year


# Home page route
@app.route("/")
def home():
    return render_template("index.html")


# About page route
@app.route("/about")
def about():
    return render_template("about.html")


# Projects page route
@app.route("/projects")
def projects():
    # Sample project data - you can move this to a database later
    projects_data = [
        {
            "title": "Cloud Infrastructure Automation",
            "description": "Automated AWS infrastructure deployment using Terraform and Ansible, implementing Infrastructure as Code best practices.",
            "image": "images/projects/cloud-infra.jpg",
            "technologies": ["AWS", "Terraform", "Ansible", "Python"],
            "github_url": "https://github.com/yourusername/cloud-infra",
            "demo_url": None,
        },
        {
            "title": "DevOps Pipeline Automation",
            "description": "Built CI/CD pipelines using Jenkins and GitHub Actions for automated testing and deployment.",
            "image": "images/projects/devops.jpg",
            "technologies": ["Jenkins", "GitHub Actions", "Docker", "Kubernetes"],
            "github_url": "https://github.com/yourusername/devops-pipeline",
            "demo_url": None,
        },
        {
            "title": "Python Microservices",
            "description": "Developed scalable microservices using Python and FastAPI, deployed on Kubernetes.",
            "image": "images/projects/microservices.jpg",
            "technologies": ["Python", "FastAPI", "Kubernetes", "PostgreSQL"],
            "github_url": "https://github.com/yourusername/python-microservices",
            "demo_url": "https://demo.yourdomain.com",
        },
    ]
    return render_template("projects.html", projects=projects_data)


# Contact page route
@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "POST":
        try:
            # Get form data
            name = request.form.get("name", "").strip()
            email = request.form.get("email", "").strip()
            message = request.form.get("message", "").strip()

            # Basic validation
            if not name or not email or not message:
                return jsonify({
                    "success": False,
                    "message": "All fields are required."
                })

            if len(name) < 2:
                return jsonify({
                    "success": False,
                    "message": "Name must be at least 2 characters long."
                })

            if len(message) < 10:
                return jsonify({
                    "success": False,
                    "message": "Message must be at least 10 characters long."
                })

            # Check if email configuration is available
            if not app.config["CONTACT_EMAIL"]:
                # Fallback: Log to console if email not configured
                print(f"Contact form submission (Email not configured):")
                print(f"Name: {name}")
                print(f"Email: {email}")
                print(f"Message: {message}")
                
                return jsonify({
                    "success": True,
                    "message": "Message received! I'll get back to you soon. (Email configuration pending)"
                })

            # Create email message
            subject = f"Portfolio Contact: Message from {name}"
            
            # HTML email body
            html_body = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #0ea5e9; border-bottom: 2px solid #0ea5e9; padding-bottom: 10px;">
                            New Contact Form Submission
                        </h2>
                        
                        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Submitted:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                        </div>
                        
                        <div style="margin: 20px 0;">
                            <h3 style="color: #374151;">Message:</h3>
                            <div style="background-color: #ffffff; padding: 15px; border-left: 4px solid #0ea5e9; border-radius: 4px;">
                                {message.replace('\n', '<br>')}
                            </div>
                        </div>
                        
                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
                            <p>This message was sent from your portfolio website contact form.</p>
                            <p>Reply directly to this email to respond to {name}.</p>
                        </div>
                    </div>
                </body>
            </html>
            """
            
            # Plain text version
            text_body = f"""
New Contact Form Submission

Name: {name}
Email: {email}
Submitted: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}

Message:
{message}

---
This message was sent from your portfolio website contact form.
Reply directly to this email to respond to {name}.
            """

            # Create message
            # This part of the code is now handled by EmailJS, so we just log the submission
            print(f"Contact form submission:")
            print(f"Name: {name}")
            print(f"Email: {email}")
            print(f"Message: {message}")

            return jsonify({
                "success": True,
                "message": "Message received! I'll get back to you soon."
            })

        except Exception as e:
            # Log the error
            print(f"Error sending contact email: {str(e)}")
            
            # Fallback: Still log to console
            print(f"Contact form submission (Email failed):")
            print(f"Name: {request.form.get('name', '')}")
            print(f"Email: {request.form.get('email', '')}")
            print(f"Message: {request.form.get('message', '')}")
            
            return jsonify({
                "success": False,
                "message": "Failed to send message. Please try emailing me directly at amrzakariya2018@gmail.com"
            })

    return render_template("contact.html")


# Resume download route
@app.route("/resume")
@app.route("/resume/<action>")
def resume(action="view"):
    """
    Serve resume PDF file
    Actions:
    - 'view' (default): Opens PDF in browser
    - 'download': Forces download of PDF
    """
    resume_filename = "Amr_Zakariya_Resume.pdf"
    resume_path = os.path.join(app.static_folder, "resume", resume_filename)

    # Check if file exists
    if not os.path.exists(resume_path):
        abort(
            404,
            description="Resume not found. Please contact me directly for my latest resume.",
        )

    try:
        if action == "download":
            # Force download
            return send_from_directory(
                os.path.join(app.static_folder, "resume"),
                resume_filename,
                as_attachment=True,
                download_name=f'Amr_Zakariya_Resume_{datetime.now().strftime("%Y")}.pdf',
            )
        else:
            # Default: view in browser (redirect to static file)
            return redirect(url_for("static", filename=f"resume/{resume_filename}"))

    except Exception as e:
        abort(500, description="Error accessing resume file.")


# API route for dynamic content
@app.route("/api/skills")
def api_skills():
    skills_categories = [
        {
            "category": "Cloud & Infrastructure",
            "skills": [
                {"name": "AWS", "icon": "images/awsLogo.png"},
                {"name": "EC2", "icon": "images/EC2.webp"},
                {"name": "Terraform", "icon": "images/TerraformLogo.png"},
                {"name": "Docker", "icon": "images/DockerLogo.webp"},
                {"name": "Kubernetes", "icon": "images/kubernetesLogo.png"},
            ],
        },
        {
            "category": "Development",
            "skills": [
                {"name": "Python", "icon": "images/pythonLogo.png"},
                {"name": "Bash", "icon": "images/bashLogo.png"},
                {"name": "Linux", "icon": "images/linuxLogo.png"},
            ],
        },
        {
            "category": "DevOps & Automation",
            "skills": [
                {"name": "Git", "icon": "images/git.png"},
                {"name": "GitHub Actions", "icon": "images/github-actions.webp"},
                {"name": "Jenkins", "icon": "images/jenkinsLogo.png"},
                {"name": "Ansible", "icon": "images/ansibleLogo.png"},
                {"name": "YAML", "icon": "images/yml.png"},
            ],
        },
    ]
    return jsonify(skills_categories)


# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template("404.html"), 404


@app.errorhandler(500)
def internal_error(error):
    return render_template("500.html"), 500


# Run the Flask application
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
