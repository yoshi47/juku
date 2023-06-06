from django.contrib import admin

from .models import Lesson, Subject
# Register your models here.
@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    pass

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    pass