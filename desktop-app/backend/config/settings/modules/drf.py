REST_FRAMEWORK = {
    # To configure APISettings of DRF (rest_framework.settings.APISettings)
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 50,
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_simplejwt.authentication.JWTAuthentication",),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAdminUser",),
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Napse API",
    "DESCRIPTION": "API of Napse",
    "VERSION": "1.1.0",
    "SERVE_INCLUDE_SCHEMA": False,
}
