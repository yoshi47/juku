from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.
class Subject(models.Model):
    name = models.CharField(_('教科'), max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('教科')
        verbose_name_plural = _('教科')


class Lesson(models.Model):
    student = models.ForeignKey("accounts.User", on_delete=models.PROTECT, limit_choices_to={"user_type": "student"},
                                related_name="student_username")
    teacher = models.ForeignKey("accounts.User", on_delete=models.PROTECT, limit_choices_to={"user_type": "teacher"},
                                related_name="teacher_username")
    subject = models.ForeignKey("lessons.Subject", on_delete=models.PROTECT)
    CHOICES = [(i, f"{i}限") for i in range(1, 9)]
    period = models.IntegerField(choices=CHOICES)
    date = models.DateField()

    class Meta:
        verbose_name = _('授業')
        verbose_name_plural = _('授業')