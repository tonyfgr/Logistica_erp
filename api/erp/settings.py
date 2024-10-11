from pathlib import Path
from os import environ
from dotenv import load_dotenv


load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY =  environ.get('SECRET_KEY')

DEBUG = True if environ.get('DEBUG') == 'true' else False

ALLOWED_HOSTS = environ.get('ALLOWED_HOSTS').split(',')

# Application definition
PROJECT_APPS = [
    'api_models',
    'api_proveedores',
    'api_ordenes_bienes_servicios',
    'api_requerimientos',
    'api_autenticacion_usuarios',
    'api_clientes',
    'api_trabajadores',
    'api_productos',
    'api_articulos',
    'api_compras',
    'api_cajadiaria',
    'api_kardex_producto',
    'api_produccion_producto',
]

EXTERNAL_APPS = [
    'corsheaders',
    'rest_framework',
]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
] + PROJECT_APPS + EXTERNAL_APPS


CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_WHITELIST = environ.get('CORS_ORIGIN_WHITELIST').split(',')

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    'EXCEPTION_HANDLER':
        'api_autenticacion_usuarios.exceptions.status_code_handler'
}

ROOT_URLCONF = 'erp.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'erp.wsgi.application'


# Database
if DEBUG:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite',
        }
    }
else:
    DATABASES = {
    'default': {
        'ENGINE': f'django.db.backends.{environ.get("DB_ENGINE")}',
        'HOST': environ.get('DB_HOST'),
        'PORT': environ.get('DB_PORT'),
        'NAME': environ.get('DB_NAME'),
        'USER': environ.get('DB_USER'),
        'PASSWORD': environ.get('DB_PASSWORD'),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Lima'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles/'

MEDIA_ROOT = BASE_DIR / 'media'
MEDIA_URL = 'media/'


# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# cloudinary.config(
#   cloud_name = "dm8aqmori",
#   api_key = "416938536925695",
#   api_secret = "PDq8lrOVNA3hI3EwM3c3b1gosVU",
#   secure = True
# )
