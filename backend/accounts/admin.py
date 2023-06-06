from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, School, Student


# Register your models here.
class StudentInline(admin.StackedInline):
    model = Student
    extra = 1


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_('Personal info'), {"fields": ("last_name", "first_name", "email", "user_type", "text")}),
        (_('Permissions'), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_('Important dates'), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ("username", "full_name", "user_type", "person_grade", "person_school")
    list_filter = ["user_type", "student__grade", "student__school"]
    search_fields = ("username", "last_name", "first_name", "email")
    filter_horizontal = ("groups", "user_permissions")

    inlines = [
        StudentInline,
    ]

    def full_name(self, obj):
        return obj.last_name + obj.first_name

    def person_grade(self, obj):
        return obj.student.grade

    def person_school(self, obj):
        return obj.student.school


@admin.register(School)
class shcoolAdmin(admin.ModelAdmin):
    pass
