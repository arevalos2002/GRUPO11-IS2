from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

class CustomUser(AbstractUser):
    """
    Un modelo de usuario personalizado que extiende AbstractUser,
    añadiendo grupos y permisos personalizados.
    """
    # Relacionamos los grupos con un nombre único para evitar conflictos.
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='Grupos a los que pertenece el usuario.'
    )
    
    # Relacionamos los permisos con un nombre único para evitar conflictos.
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set_permissions',
        blank=True,
        help_text='Permisos específicos para este usuario.'
    )

    def __str__(self):
        return self.username

# Modelo de Usuario
class Usuario(models.Model):
    """
    Este modelo se usa para almacenar datos adicionales del usuario.
    """
    nombre_usuario = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=100)
    metodo_autenticacion = models.CharField(max_length=50)
    correo_electronico = models.EmailField(unique=True)
    
    def __str__(self):
        return self.nombre_usuario

# Modelo de Espacio de Trabajo
class EspacioTrabajo(models.Model):
    """
    Modelo que representa un espacio de trabajo en la aplicación.
    Los espacios de trabajo son contenedores para tableros y usuarios.
    """
    nombre_espacio = models.CharField(max_length=100)
    propietario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='espacios_propietario')
    estado = models.BooleanField(default=True)
    usuarios = models.ManyToManyField(Usuario, related_name='espacios_usuarios')

    def __str__(self):
        return self.nombre_espacio


# Modelo de Tablero
class Tablero(models.Model):
    """
    Un tablero que pertenece a un espacio de trabajo.
    Los tableros contienen listas de tareas.
    """
    nombre_tablero = models.CharField(max_length=100)
    espacio_trabajo = models.ForeignKey(EspacioTrabajo, on_delete=models.CASCADE, related_name='tableros')

    def __str__(self):
        return self.nombre_tablero


# Modelo de Lista
class Lista(models.Model):
    """
    Una lista que contiene tarjetas. Cada lista tiene un límite WIP.
    """
    nombre_lista = models.CharField(max_length=100)
    max_wip = models.IntegerField()  # WIP: Work In Progress limit
    tablero = models.ForeignKey(Tablero, on_delete=models.CASCADE, related_name='listas')

    def __str__(self):
        return self.nombre_lista


# Modelo de Tarjeta
class Tarjeta(models.Model):
    """
    Una tarjeta de actividad que pertenece a una lista.
    Puede estar asignada a un usuario.
    """
    nombre_actividad = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)
    usuario_asignado = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name='tarjetas_asignadas')
    etiqueta = models.CharField(max_length=50, blank=True, null=True)
    lista = models.ForeignKey(Lista, on_delete=models.CASCADE, related_name='tarjetas')

    def __str__(self):
        return self.nombre_actividad


# Modelo de Tarea
class Tarea(models.Model):
    """
    Modelo que representa una tarea específica dentro de una tarjeta.
    """
    nombre_tarea = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.BooleanField(default=False)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)
    tarjeta = models.ForeignKey(Tarjeta, on_delete=models.CASCADE, related_name='tareas')

    def __str__(self):
        return self.nombre_tarea
