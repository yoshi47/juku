from rest_framework import viewsets
from rest_framework.response import Response

from .models import Lesson
from .serializers import LessonSerializer


# Create your views here.
class LessonViewSet(viewsets.ModelViewSet):
    serializer_class = LessonSerializer
    def get_queryset(self):
        queryset = Lesson.objects.all()

        # 生徒 or 先生で絞り込み
        teacher = self.request.query_params.get('teacher_username', None)
        student = self.request.query_params.get('student_username', None)
        if student is not None:
            queryset = queryset.filter(student__username=student)
        elif teacher is not None:
            queryset = queryset.filter(teacher__username=teacher)
        return queryset