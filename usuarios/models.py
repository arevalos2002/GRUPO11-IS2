from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import AbstractUser, Group, Permission

class CustomUser(AbstractUser):
    # Add the related_name argument to resolve the clashes
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Use a unique related_name for the reverse relationship
        blank=True,
        help_text='The groups this user belongs to.'
    )
    
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set_permissions',  # Use a unique related_name for the reverse relationship
        blank=True,
        help_text='Specific permissions for this user.'
    )

# Modelo de Usuario
class Usuario(models.Model):
    nombre_usuario = models.CharField(max_length=100)
    contraseña = models.CharField(max_length=100)
    metodo_autenticacion = models.CharField(max_length=50)
    correo_electronico = models.EmailField(unique=True)
    
    def _str_(self):
        return self.nombre_usuario

# Modelo de Espacio de Trabajo
class EspacioTrabajo(models.Model):
    nombre_espacio = models.CharField(max_length=100)
    propietario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='espacios_propietario')
    estado = models.BooleanField(default=True)
    usuarios = models.ManyToManyField(Usuario, related_name='espacios_usuarios')

    def _str_(self):
        return self.nombre_espacio

# Modelo de Tablero
class Tablero(models.Model):
    nombre_tablero = models.CharField(max_length=100)
    espacio_trabajo = models.ForeignKey(EspacioTrabajo, on_delete=models.CASCADE, related_name='tableros')

    def _str_(self):
        return self.nombre_tablero

# Modelo de Lista
class Lista(models.Model):
    nombre_lista = models.CharField(max_length=100)
    max_wip = models.IntegerField()  # WIP: Work In Progress limit
    tablero = models.ForeignKey(Tablero, on_delete=models.CASCADE, related_name='listas')

    def _str_(self):
        return self.nombre_lista

# Modelo de Tarjeta
class Tarjeta(models.Model):
    nombre_actividad = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)
    usuario_asignado = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, related_name='tarjetas_asignadas')
    etiqueta = models.CharField(max_length=50, blank=True, null=True)
    lista = models.ForeignKey(Lista, on_delete=models.CASCADE, related_name='tarjetas')

    def _str_(self):
        return self.nombre_actividad

# Modelo de Tarea
class Tarea(models.Model):
    nombre_tarea = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True, null=True)
    estado = models.BooleanField(default=False)
    fecha_vencimiento = models.DateTimeField(null=True, blank=True)
    tarjeta = models.ForeignKey(Tarjeta, on_delete=models.CASCADE, related_name='tareas')

    def _str_(self):
        return self.nombre_tarea