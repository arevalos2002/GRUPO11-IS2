from rest_framework import serializers
from .models import CustomUser, Usuario, EspacioTrabajo, Tablero, Lista, Tarjeta, Tarea

# Serializador para el modelo CustomUser
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'groups', 'user_permissions']


# Serializador para el modelo Usuario (otros datos)
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nombre_usuario', 'contraseña', 'metodo_autenticacion', 'correo_electronico']


# Serializador para el modelo EspacioTrabajo
class EspacioTrabajoSerializer(serializers.ModelSerializer):
    propietario = UsuarioSerializer(read_only=True)
    usuarios = UsuarioSerializer(many=True, read_only=True)

    class Meta:
        model = EspacioTrabajo
        fields = ['id', 'nombre_espacio', 'propietario', 'estado', 'usuarios']


# Serializador para el modelo Tablero
class TableroSerializer(serializers.ModelSerializer):
    espacio_trabajo = EspacioTrabajoSerializer(read_only=True)

    class Meta:
        model = Tablero
        fields = ['id', 'nombre_tablero', 'espacio_trabajo']


# Serializador para el modelo Lista
class ListaSerializer(serializers.ModelSerializer):
    tablero = TableroSerializer(read_only=True)

    class Meta:
        model = Lista
        fields = ['id', 'nombre_lista', 'max_wip', 'tablero']


# Serializador para el modelo Tarjeta
class TarjetaSerializer(serializers.ModelSerializer):
    lista = ListaSerializer(read_only=True)
    usuario_asignado = UsuarioSerializer(read_only=True)

    class Meta:
        model = Tarjeta
        fields = ['id', 'nombre_actividad', 'descripcion', 'fecha_creacion', 'fecha_vencimiento', 'usuario_asignado', 'etiqueta', 'lista']


# Serializador para el modelo Tarea
class TareaSerializer(serializers.ModelSerializer):
    tarjeta = TarjetaSerializer(read_only=True)

    class Meta:
        model = Tarea
        fields = ['id', 'nombre_tarea', 'descripcion', 'estado', 'fecha_vencimiento', 'tarjeta']
