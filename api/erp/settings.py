from pathlib import Path
import os

# from datetime import timedelta

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/


# USAR VARIABLES DE ENTORNO. TENER LA SECRET KEY AHÍ EN EL CÓDIGO ES MALO!!!.
SECRET_KEY =  'django-insecure-@k(6mh4o=qj!7zs&^#=_rjax1$k5-4%2f-ijcplhd!1ksams)h'

# SECURITY WARNING: don't run with debug turned on in production!

# CAMBIAR DEBUG A FALSE EN PRODUCCIÓN
DEBUG = True

# NO USAR * EN PRODUCCIÓN
ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
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
    'corsheaders',
    'rest_framework',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True

CORS_ORIGIN_WHITELIST = [
    'http://localhost:3000',
    'https://erp-tecsup.vercel.app'
]

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
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases


# USAR SQLITE EN DESARROLLO Y CAMBIAR A MYSQL AUTOMATICAMENTE EN PRODUCCIÓN
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
        'ENGINE': 'django.db.backends.mysql',
        'HOST': 'db',
        'PORT': 3306,
        'NAME': 'erp',
        'USER': 'root',
        'PASSWORD': 'test',
    }
}

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Lima'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = 'static/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# cloudinary.config(
#   cloud_name = "dm8aqmori",
#   api_key = "416938536925695",
#   api_secret = "PDq8lrOVNA3hI3EwM3c3b1gosVU",
#   secure = True
# )
