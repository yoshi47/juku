from rest_framework import serializers
from .models import Lesson, Subject
from accounts.models import User

class LessonSerializer(serializers.ModelSerializer):
    teacher = serializers.SlugRelatedField(queryset=User.objects.filter(user_type__in=['admin', 'teacher']), slug_field='username')
    teacher_name = serializers.CharField(source='teacher.get_full_name', read_only=True)
    student = serializers.SlugRelatedField(queryset=User.objects.filter(user_type='student'), slug_field='username')
    student_name = serializers.CharField(source='student.get_full_name', read_only=True)
    subject = serializers.SlugRelatedField(queryset=Subject.objects.all(), slug_field='name')


    class Meta:
        model = Lesson
        fields = ('id', 'student', 'student_name', 'teacher', 'teacher_name', 'subject', 'period', 'date',)
        
class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'name',)