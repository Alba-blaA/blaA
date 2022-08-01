from django.db import models

# Create your models here.

class JobMainCategory(models.Model) :
    job_main_code = models.CharField(primary_key=True,max_length=1)
    job_main_category = models.CharField(max_length=20)
    
    
class JobSubCategory(models.Model) :
    job_sub_code = models.CharField(primary_key=True,max_length=4)
    job_sub_category = models.CharField(max_length=20)
    

class Sido(models.Model) :
    sido_code = models.CharField(primary_key=True,max_length=10)
    sido_name = models.CharField(max_length=20)
    
    
class Gugun(models.Model) :
    gugun_code = models.CharField(primary_key=True,max_length=10)
    gugun_name = models.CharField(max_length=20)

class Dong(models.Model) :
    dong_code = models.CharField(primary_key=True,max_length=10)
    sido_name = models.CharField(max_length=20)
    gugun_name = models.CharField(max_length=20)
    dong_name = models.CharField(max_length=20)
    
    