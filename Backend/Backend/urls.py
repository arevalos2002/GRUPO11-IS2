from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CustomUserViewSet,
    UsuarioViewSet,
    EspacioTrabajoViewSet,
    TableroViewSet,
    ListaViewSet,
    TarjetaViewSet,
    TareaViewSet
)

# Crear el enrutador que registra las rutas de los ViewSets
router = DefaultRouter()
router.register(r'custom-users', CustomUserViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'espacios-trabajo', EspacioTrabajoViewSet)
router.register(r'tableros', TableroViewSet)
router.register(r'listas', ListaViewSet)
router.register(r'tarjetas', TarjetaViewSet)
router.register(r'tareas', TareaViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Incluir las rutas generadas por el router
    path('auth/', include('dj_rest_auth.urls')),  # Rutas de login y logout
    path('admin/', admin.site.urls),  # Ruta del panel de administración
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Para registro
]
