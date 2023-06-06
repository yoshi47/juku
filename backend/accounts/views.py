from django.shortcuts import render
from rest_framework import viewsets

from .models import User
from .serializers import StudentSerializer, TeacherSerializer


# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(user_type="student")
    serializer_class = StudentSerializer
    lookup_field = "username"


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = User.objects.filter(user_type__in=["admin", "teacher"])
    serializer_class = TeacherSerializer
    lookup_field = "username"
