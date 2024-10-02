"""from django.urls import path
from .views import LoginView
from .views import RegisterView
urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/register/', RegisterView.as_view(), name='register'),
]"""

from django.urls import path
from .views import LoginView, RegisterView  # Importa las vistas

urlpatterns = [
    path('api/login/', LoginView.as_view(), name='login'),          # Ruta para login
    path('api/register/', RegisterView.as_view(), name='register'),  # Ruta para registro
]
