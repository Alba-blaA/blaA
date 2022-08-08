from django.contrib import admin

from crews.models import Crew, CrewArticle, CrewArticleComment, CrewArticleImage

# Register your models here.
admin.site.register(CrewArticleImage)
admin.site.register(CrewArticle)
admin.site.register(Crew)
admin.site.register(CrewArticleComment)