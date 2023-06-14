from django.shortcuts import render
from rest_framework import viewsets

from accounts.models import User, Student
from .serializers import UserSerializer, StudentSerializer

# Create your views here.
class TeacherViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(user_type__in=["admin", "teacher"])
    serializer_class = UserSerializer
    lookup_field = "username"

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer