from rest_framework import generics
from .serializers import LoginSerializer
from rest_framework.response import Response
from .serializers import RegisterSerializer
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import RegistroForm, LoginForm

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "Login successful"}, status=200)


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": serializer.data,
            "message": "Usuario creado exitosamente"
        }, status=status.HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')  # Cambia 'home' por la vista a la que quieras redirigir
    else:
        form = RegistroForm()
    return render(request, 'usuarios/registro.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')  # Cambia 'home' por la vista a la que quieras redirigir
    else:
        form = LoginForm()
    return render(request, 'usuarios/login.html', {'form': form})