from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
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

class UsuarioManager(BaseUserManager):
    def create_user(self, correo_electronico, contraseña=None, **extra_fields):
        """Crea y devuelve un usuario con correo electrónico y contraseña."""
        if not correo_electronico:
            raise ValueError("Los usuarios deben tener un correo electrónico.")
        correo_electronico = self.normalize_email(correo_electronico)
        usuario = self.model(correo_electronico=correo_electronico, **extra_fields)
        usuario.set_password(contraseña)  # Almacenar la contraseña de forma segura
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, correo_electronico, contraseña=None, **extra_fields):
        """Crea y devuelve un superusuario con correo electrónico y contraseña."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(correo_electronico, contraseña, **extra_fields)

class RegistroForm(UserCreationForm):
    class Meta:
        model = Usuario
        fields = ('username', 'email', 'password1', 'password2')
        
class Usuario(AbstractBaseUser, PermissionsMixin):
    nombre_usuario = models.CharField(max_length=100, unique=True)
    correo_electronico = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)  # No es necesario almacenar la contraseña aquí
    metodo_autenticacion = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo_electronico'  # Campo que se utilizará para autenticar
    REQUIRED_FIELDS = ['nombre_usuario', 'metodo_autenticacion']  # Campos requeridos al crear un superusuario

    def __str__(self):
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