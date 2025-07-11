from flask import Flask, render_template, request, jsonify, redirect, url_for, send_from_directory, abort
import os
from datetime import datetime

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Template filter for current year
@app.template_filter('current_year')
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
            'title': 'Cloud Infrastructure Automation',
            'description': 'Automated AWS infrastructure deployment using Terraform and Ansible, implementing Infrastructure as Code best practices.',
            'image': 'images/projects/cloud-infra.jpg',
            'technologies': ['AWS', 'Terraform', 'Ansible', 'Python'],
            'github_url': 'https://github.com/yourusername/cloud-infra',
            'demo_url': None
        },
        {
            'title': 'DevOps Pipeline Automation',
            'description': 'Built CI/CD pipelines using Jenkins and GitHub Actions for automated testing and deployment.',
            'image': 'images/projects/devops.jpg',
            'technologies': ['Jenkins', 'GitHub Actions', 'Docker', 'Kubernetes'],
            'github_url': 'https://github.com/yourusername/devops-pipeline',
            'demo_url': None
        },
        {
            'title': 'Python Microservices',
            'description': 'Developed scalable microservices using Python and FastAPI, deployed on Kubernetes.',
            'image': 'images/projects/microservices.jpg',
            'technologies': ['Python', 'FastAPI', 'Kubernetes', 'PostgreSQL'],
            'github_url': 'https://github.com/yourusername/python-microservices',
            'demo_url': 'https://demo.yourdomain.com'
        }
    ]
    return render_template("projects.html", projects=projects_data)

# Contact page route
@app.route("/contact", methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        try:
            name = request.form.get('name')
            email = request.form.get('email')
            message = request.form.get('message')
            
            # For now, just return success (later we'll add email functionality)
            print(f"Contact form submission:")
            print(f"Name: {name}")
            print(f"Email: {email}")
            print(f"Message: {message}")
            
            return jsonify({'success': True, 'message': 'Message received! (Email functionality will be added later)'})
        except Exception as e:
            return jsonify({'success': False, 'message': 'Failed to send message. Please try again.'})
    
    return render_template("contact.html")

# Resume download route
@app.route("/resume")
@app.route("/resume/<action>")
def resume(action='view'):
    """
    Serve resume PDF file
    Actions:
    - 'view' (default): Opens PDF in browser
    - 'download': Forces download of PDF
    """
    resume_filename = 'Amr_Zakariya_Resume.pdf'
    resume_path = os.path.join(app.static_folder, 'resume', resume_filename)
    
    # Check if file exists
    if not os.path.exists(resume_path):
        abort(404, description="Resume not found. Please contact me directly for my latest resume.")
    
    try:
        if action == 'download':
            # Force download
            return send_from_directory(
                os.path.join(app.static_folder, 'resume'),
                resume_filename,
                as_attachment=True,
                download_name=f'Amr_Zakariya_Resume_{datetime.now().strftime("%Y")}.pdf'
            )
        else:
            # Default: view in browser (redirect to static file)
            return redirect(url_for('static', filename=f'resume/{resume_filename}'))
            
    except Exception as e:
        abort(500, description="Error accessing resume file.")

# API route for dynamic content
@app.route("/api/skills")
def api_skills():
    skills_categories = [
        {
            'category': 'Cloud & Infrastructure',
            'skills': [
                {'name': 'AWS', 'icon': 'images/awsLogo.png'},
                {'name': 'Terraform', 'icon': 'images/TerraformLogo.png'},
                {'name': 'Docker', 'icon': 'images/DockerLogo.webp'},
                {'name': 'Kubernetes', 'icon': 'images/kubernetesLogo.png'}
            ]
        },
        {
            'category': 'Development',
            'skills': [
                {'name': 'Python', 'icon': 'images/pythonLogo.png'},
                {'name': 'Bash', 'icon': 'images/bashLogo.png'},
                {'name': 'Linux', 'icon': 'images/linuxLogo.png'}
            ]
        },
        {
            'category': 'DevOps & Automation',
            'skills': [
                {'name': 'Jenkins', 'icon': 'images/jenkinsLogo.png'},
                {'name': 'Ansible', 'icon': 'images/ansibleLogo.png'}
            ]
        }
    ]
    return jsonify(skills_categories)

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

# Run the Flask application
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
