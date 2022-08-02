from rest_framework import serializers
from reviews.models import Store

class StoreCreateSerializer(serializers.ModelSerializer) :

    class Meta : 
        model = Store
        fields = '__all__'

class StoreListSerializer(serializers.ModelSerializer) :

    class Meta : 
        model = Store
        fields = ('store_pk','name','image')

