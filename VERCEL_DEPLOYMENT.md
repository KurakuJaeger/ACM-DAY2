# Vercel Deployment Guide for Django + Front-End

## Quick Deployment Steps

### Step 1: Prepare Your App for Vercel
✅ **Already done in your config:**
- `vercel.json` properly configured
- `.vercelignore` created
- Django settings updated for production
- WhiteNoise middleware installed for static files

### Step 2: Set Environment Variables in Vercel Dashboard

Go to your Vercel project settings and add these environment variables:

```
DEBUG=False
SECRET_KEY=<generate-a-secure-key>
DJANGO_SETTINGS_MODULE=config.settings
```

To generate a secure SECRET_KEY:
```python
from django.core.management.utils import get_random_secret_key
print(get_random_secret_key())
```

### Step 3: CSRF Token Configuration

For front-end requests to your API, update `config/settings.py`:

```python
# Add to MIDDLEWARE (after SecurityMiddleware)
CSRF_TRUSTED_ORIGINS = [
    'https://*.vercel.app',
    'https://yourdomain.com',  # If using custom domain
    'http://localhost:3000',   # For local development
]

CORS_ALLOWED_ORIGINS = [
    'https://*.vercel.app',
    'https://yourdomain.com',
    'http://localhost:3000',
]
```

### Step 4: Update Requirements (if needed)

Install these if not already present:
```
django-cors-headers
whitenoise
gunicorn
```

Run: `pip freeze > requirements.txt`

### Step 5: Deploy

```bash
vercel deploy --prod
```

## Routing Architecture

Your `vercel.json` now routes:

- `/static/*` → Static files (CSS, JS, images)
- `/api/*` → Django app (API endpoints)
- `/admin/*` → Django admin
- All other routes → Django app (for front-end rendering)

## Front-End API Calls

Use absolute URLs in your front-end:

```javascript
// ✅ CORRECT - Uses current domain
fetch('/api/scores/', {
    method: 'GET',
    headers: {
        'X-CSRFToken': getCookie('csrftoken')
    }
})

// ❌ WRONG - Don't hardcode localhost
fetch('http://localhost:8000/api/scores/')
```

## Testing Before Deployment

1. **Local testing:**
   ```bash
   python manage.py collectstatic
   export DEBUG=False
   python manage.py runserver
   ```

2. **Preview deployment:**
   ```bash
   vercel deploy
   ```

3. **Production deployment:**
   ```bash
   vercel deploy --prod
   ```

## Database Considerations

⚠️ **Important:** SQLite doesn't work well in Vercel (ephemeral storage).

For production, use:
- **PostgreSQL** (recommended)
- **MongoDB**
- **Railway** (has built-in PostgreSQL)

Update `DATABASES` in settings:
```python
if os.getenv('DATABASE_URL'):
    import dj_database_url
    DATABASES['default'] = dj_database_url.config(
        default=os.getenv('DATABASE_URL')
    )
```

## Troubleshooting

### Static files not loading
- Ensure `STATIC_ROOT = BASE_DIR / 'staticfiles'` in settings
- Run: `python manage.py collectstatic --noinput`

### API returns 404
- Check that your URL patterns in `main/urls.py` are correct
- Verify route precedence in `vercel.json`

### CSRF token errors
- Ensure front-end sends `X-CSRFToken` header
- Check `CSRF_TRUSTED_ORIGINS` includes your Vercel domain

### Timeout errors
- Optimize database queries
- Use connection pooling for database
- Consider serverless database options

## Next Steps

1. Add environment variables to Vercel dashboard
2. Update CORS settings if needed
3. Switch to a production database
4. Deploy and test thoroughly
