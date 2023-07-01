from rest_framework import viewsets, generics
from django_filters import rest_framework as filters

from .models import Lesson, Subject
from .serializers import LessonSerializer, SubjectSerializer


# Create your views here.
class LessonFilter(filters.FilterSet):
    teacher_username = filters.CharFilter(field_name='teacher__username', lookup_expr='teacher_username')
    student_username = filters.CharFilter(field_name='student__username')

    class Meta:
        model = Lesson
        fields = ['teacher', 'student', 'date']


class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    filterset_class = LessonFilter


    # def get_queryset(self):
    #     queryset = Lesson.objects.all()
    #
    #     # 生徒 or 先生で絞り込み
    #     teacher = self.request.query_params.get('teacher_username', None)
    #     student = self.request.query_params.get('student_username', None)
    #     if student is not None:
    #         queryset = queryset.filter(student__username=student)
    #     elif teacher is not None:
    #         queryset = queryset.filter(teacher__username=teacher)
    #     return queryset
    

class SubjectListView(generics.ListAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer