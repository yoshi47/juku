from django.contrib.auth.models import PermissionsMixin, UserManager, AbstractBaseUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    username_validator = UnicodeUsernameValidator()

    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_("Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    first_name = models.CharField(_("first name"), max_length=50, blank=True)
    last_name = models.CharField(_("last name"), max_length=50, blank=True)
    email = models.EmailField(_("email address"), blank=True)
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = UserManager()

    class UserType(models.TextChoices):
        ADMIN = "admin", _("Admin")
        TEACHER = "teacher", _("Teacher")
        STUDENT = "student", _("Student")

    user_type = models.CharField(
        choices=UserType.choices,
        max_length=10,
        default=UserType.STUDENT,
        verbose_name=_("役職"),
    )

    text = models.CharField(max_length=400, verbose_name="メモ", blank=True)

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "user_type"]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        # abstract = True

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.last_name, self.first_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)


class School(models.Model):
    name = models.CharField(_('学校名'), max_length=30)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('学校')
        verbose_name_plural = _('学校')


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    school = models.ForeignKey(School, on_delete=models.PROTECT, verbose_name=_("学校"))
    GRADE_CHOICES = [
        (
            "小学校",
            (
                (1, "1年生"),
                (2, "2年生"),
                (3, "3年生"),
                (4, "4年生"),
                (5, "5年生"),
                (6, "6年生"),
            ),
        ),
        (
            "中学校",
            (
                (7, "1年生"),
                (8, "2年生"),
                (9, "3年生"),
            )
        ),
        (
            "高校",
            (
                (10, "1年生"),
                (11, "2年生"),
                (12, "3年生"),
            )
        ),
        (13, "既卒"),
    ]

    grade = models.IntegerField(choices=GRADE_CHOICES, verbose_name=_("学年"))
    subjects = models.ManyToManyField("lessons.Subject", verbose_name=_("やる教科"), blank=True)

    class Meta:
        verbose_name = _("学年")
        verbose_name_plural = _("学年")
