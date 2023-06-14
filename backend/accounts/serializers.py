from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User, Student, School
from lessons.models import Subject


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'last_name', 'first_name', 'email', 'text', 'user_type',)
        extra_kwargs = {'password': {'write_only': True}, 'user_type': {'write_only': True}}


class BaseStudentSerializer(serializers.ModelSerializer):
    # school = serializers.CharField(source='school.name')
    # todo all 以外の書き方知りたい
    school = serializers.PrimaryKeyRelatedField(queryset=School.objects.all(), source='school.name')
    # grade = serializers.ChoiceField(choices=Student.GRADE_CHOICES, source='get_grade_display')
    subjects = serializers.SlugRelatedField(queryset=Subject.objects.all(), many=True, slug_field='name')

    class Meta:
        model = Student
        fields = ('school', 'grade', 'get_grade_display', 'subjects',)
        extra_kwargs = {'grade': {'write_only': True}}


class StudentSerializer(serializers.ModelSerializer):
    student = BaseStudentSerializer()

    class Meta:
        model = User
        fields = ('username', 'password', 'last_name', 'first_name', 'email', 'student', 'text', 'user_type',)
        extra_kwargs = {'password': {'write_only': True}, 'user_type': {'write_only': True}}

    def create(self, validated_data):
        student_data = validated_data.pop('student')
        student_data['school'] = School.objects.get(name=student_data['school']['name'])
        subjects = student_data.pop('subjects')

        user = User.objects.create(**validated_data)
        new_student = Student.objects.create(user=user, **student_data)
        new_student.subjects.add(*subjects)

        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['name'] = user.get_full_name()
        token['role'] = user.user_type

        return token
