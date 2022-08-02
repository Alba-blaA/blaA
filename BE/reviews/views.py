from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from reviews.models import Store,Review,ButtonReview
from reviews.serializers.store import StoreListCreateSerializer
from rest_framework import filters
from django.shortcuts import get_list_or_404, get_object_or_404

class StoreListCreateAPIView(ListCreateAPIView):
    #요청한 user_pk로 유저 조회 
    authentication_classes=[]
    serializer_class = StoreListCreateSerializer
    filter_backends = [filters.SearchFilter]
    queryset=Store.objects.all()
    search_fields = ['name']


    

