from rest_framework.generics import CreateAPIView,ListAPIView
from rest_framework.response import Response
from reviews.models import Store,Review,ButtonReview
from reviews.serializers.store import StoreCreateSerializer, StoreListSerializer
from rest_framework import filters
from django.shortcuts import get_list_or_404, get_object_or_404
class StoreCreateAPIView(CreateAPIView):
    #요청한 user_pk로 유저 조회 
    authentication_classes=[]
    serializer_class = StoreCreateSerializer

class StoreListAPIView(ListAPIView):
    #요청한 user_pk로 유저 조회 
    authentication_classes=[]
    serializer_class = StoreListSerializer
    filter_backends = [filters.SearchFilter]
    queryset=Store.objects.all()
    search_fields = ['name']


    

