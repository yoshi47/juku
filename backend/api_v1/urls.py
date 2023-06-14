from rest_framework import routers

from .views import TeacherViewSet, StudentViewSet

router = routers.DefaultRouter()
router.register('teachers', TeacherViewSet)
router.register('students', StudentViewSet)

