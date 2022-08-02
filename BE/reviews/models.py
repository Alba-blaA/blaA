from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator 
from django.conf import settings
from Tracking.models import TrackingModel

# Create your models here.
class Store(models.Model) :
    store_pk = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    image = models.ImageField(upload_to='store/logo')
    region = models.TextField(null=True,blank=True)
    def __str__(self):
        return self.name

class ButtonReview(models.Model) :
    type = models.CharField(max_length=10)
    def __str__(self):
        return self.type

class Review(TrackingModel,models.Model) :
    
    review_pk = models.AutoField(primary_key=True)
    store = models.ForeignKey(Store,on_delete=models.CASCADE,related_name='review')
    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='reviews')
    star = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    oneline_review = models.TextField()
    like_users = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='like_reviews',blank=True)
    chosen_button = models.ManyToManyField(ButtonReview,related_name='review',blank=True)


