from django.test import TestCase, Client
from django.conf import settings
from django.contrib.auth import get_user_model

class EnvSmokeTests(TestCase):
    def test_settings_basic(self):
        # SECRET_KEY present and DEBUG is boolean
        self.assertTrue(settings.SECRET_KEY)
        self.assertIsInstance(settings.DEBUG, bool)

    def test_database_write_and_read(self):
        User = get_user_model()
        u = User.objects.create_user(username="smoke", email="smoke@example.com", password="pass12345")
        fetched = User.objects.get(username="smoke")
        self.assertEqual(fetched.email, "smoke@example.com")

    def test_root_url_responds(self):
        client = Client()
        resp = client.get("/")
        # Accept common dev outcomes: 200 (has view), 302 (redirect), 404 (no root view)
        self.assertIn(resp.status_code, (200, 302, 404))