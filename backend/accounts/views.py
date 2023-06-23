from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import User, School
from .serializers import StudentSerializer, UserSerializer, MyTokenObtainPairSerializer, SchoolSerializer


# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(user_type="student")
    serializer_class = StudentSerializer
    lookup_field = "username"


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(user_type__in=["admin", "teacher"])
    serializer_class = UserSerializer
    lookup_field = "username"


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class SchoolListView(generics.ListAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer