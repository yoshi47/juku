from accounts.models import User, Student
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'last_name', 'first_name', 'email', 'text', 'user_type', 'password',)
        extra_kwargs = {
            'user_type': {'write_only': True},
            'password': {'write_only': True}
        }

class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    grade = serializers.CharField(source='get_grade_display')

    class Meta:
        model = Student
        fields = ('user', 'school', 'grade', 'subjects',)