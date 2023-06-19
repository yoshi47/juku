from rest_framework import serializers
from .models import Lesson, Subject
from accounts.models import User

class LessonSerializer(serializers.ModelSerializer):
    student = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    teacher = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)
    teacher_name = serializers.CharField(source='teacher.get_full_name', read_only=True)
    subject = serializers.SlugRelatedField(queryset=Subject.objects.all(), slug_field='name')


    class Meta:
        model = Lesson
        fields = ('id', 'student', 'student_name', 'teacher', 'teacher_name', 'subject', 'period', 'date',)