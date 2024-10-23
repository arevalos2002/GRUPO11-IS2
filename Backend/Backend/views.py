from rest_framework import viewsets
from .models import CustomUser, Usuario, EspacioTrabajo, Tablero, Lista, Tarjeta, Tarea
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    CustomUserSerializer,
    UsuarioSerializer,
    EspacioTrabajoSerializer,
    TableroSerializer,
    ListaSerializer,
    TarjetaSerializer,
    TareaSerializer
)

# Vista para CustomUser
class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    


# Vista para el modelo Usuario
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# Vista para el modelo EspacioTrabajo
class EspacioTrabajoViewSet(viewsets.ModelViewSet):
    queryset = EspacioTrabajo.objects.all()
    serializer_class = EspacioTrabajoSerializer
    permission_classes = [IsAuthenticated]

# Vista para el modelo Tablero
class TableroViewSet(viewsets.ModelViewSet):
    queryset = Tablero.objects.all()
    serializer_class = TableroSerializer


# Vista para el modelo Lista
class ListaViewSet(viewsets.ModelViewSet):
    queryset = Lista.objects.all()
    serializer_class = ListaSerializer


# Vista para el modelo Tarjeta
class TarjetaViewSet(viewsets.ModelViewSet):
    queryset = Tarjeta.objects.all()
    serializer_class = TarjetaSerializer


# Vista para el modelo Tarea
class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    serializer_class = TareaSerializer
