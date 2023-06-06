from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


# Register your models here.
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (_('Personal info'), {"fields": ("last_name", "first_name", "email", "user_type", "text")}),
        (_('Permissions'), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_('Important dates'), {"fields": ("last_login", "date_joined")}),
    )
    list_display = ("username", "full_name", "user_type")
    search_fields = ("username", "last_name", "first_name", "email")
    filter_horizontal = ("groups", "user_permissions")

    def full_name(self, obj):
        return obj.last_name + obj.first_name
