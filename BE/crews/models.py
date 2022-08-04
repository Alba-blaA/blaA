from django.db import models
from Tracking.models import TrackingModel
from django.conf import settings
# Create your models here.

class Crew(TrackingModel,models.Model) :
    crew_pk = models.AutoField(primary_key=True)
    crew_leader = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    is_business = models.BooleanField()
    crew_name = models.CharField(max_length=50,unique=True)
    crew_img = models.ImageField(upload_to='crew/image',
                default='media/crew/image/상점기본.png',
                null=True,blank=True)
    crew_explain = models.TextField()
    crew_region = models.TextField(null=True,blank=True)
    crew_member = models.ManyToManyField(settings.AUTH_USER_MODEL,related_name='crews',blank=True)

    
