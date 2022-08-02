from django.contrib import admin

# Register your models here.
from .models import ButtonReview,Store,Review
# Register your models here.
admin.site.register(Store)
admin.site.register(ButtonReview)



class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'store','star')


admin.site.register(Review, ReviewAdmin)