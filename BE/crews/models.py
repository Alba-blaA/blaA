from django.db import models
from Tracking.models import TrackingModel
from django.conf import settings
# Create your models here.

class Crew(TrackingModel,models.Model) :
    crew_pk = models.AutoField(primary_key=True)
    crew_leader = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,related_name='crew')
    is_business = models.BooleanField()
    crew_name = models.CharField(max_length=50,unique=True)
    crew_img = models.ImageField(upload_to='crew/image')
    crew_explain = models.TextField()
    
