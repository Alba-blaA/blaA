from django.contrib import admin

# Register your models here.
from categorys.models import JobMainCategory,JobSubCategory

# Register your models here.
admin.site.register(JobMainCategory)
admin.site.register(JobSubCategory)