import pytest
import json
from app import app


@pytest.fixture
def client():
    """Create a test client for the Flask application."""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


class TestRoutes:
    """Test basic application routes."""

    def test_home_page(self, client):
        """Test that the home page loads correctly."""
        response = client.get("/")
        assert response.status_code == 200
        assert b"DevOps Engineer" in response.data
        assert b"Amr Zakariya" in response.data

    def test_projects_page(self, client):
        """Test that the projects page loads correctly."""
        response = client.get("/projects")
        assert response.status_code == 200

    def test_contact_page_get(self, client):
        """Test that the contact page loads correctly."""
        response = client.get("/contact")
        assert response.status_code == 200

    def test_contact_form_post(self, client):
        """Test contact form submission."""
        data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message",
        }
        response = client.post("/contact", data=data)
        assert response.status_code == 200
        json_data = json.loads(response.data)
        assert json_data["success"] is True

    def test_skills_api(self, client):
        """Test the skills API endpoint."""
        response = client.get("/api/skills")
        assert response.status_code == 200
        json_data = json.loads(response.data)
        assert isinstance(json_data, list)
        assert len(json_data) > 0
        # Check that it has the expected categories
        categories = [category["category"] for category in json_data]
        assert "Cloud & Infrastructure" in categories
        assert "Development" in categories
        assert "DevOps & Automation" in categories

    def test_resume_route_without_file(self, client):
        """Test resume route behavior when PDF doesn't exist."""
        response = client.get("/resume")
        # Should either redirect or return 404
        assert response.status_code in [302, 404]

    def test_404_handler(self, client):
        """Test 404 error handler."""
        response = client.get("/nonexistent-page")
        assert response.status_code == 404


class TestAppConfiguration:
    """Test application configuration."""

    def test_app_config(self):
        """Test basic app configuration."""
        assert app.config["SECRET_KEY"] is not None

    def test_testing_mode(self, client):
        """Test that testing mode can be enabled."""
        app.config["TESTING"] = True
        assert app.config["TESTING"] is True
         