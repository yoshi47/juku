from rest_framework import serializers

from .models import User, Student


class BaseStudentSerializer(serializers.ModelSerializer):
    school = serializers.CharField(source='school.name')
    grade = serializers.CharField(source='get_grade_display')
    subjects = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')

    class Meta:
        model = Student
        fields = ('school', 'grade', 'subjects',)


class StudentSerializer(serializers.ModelSerializer):
    student = BaseStudentSerializer()

    class Meta:
        model = User
        fields = ('username', 'last_name', 'first_name', 'email', 'student', 'text',)


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'last_name', 'first_name', 'email', 'text',)
