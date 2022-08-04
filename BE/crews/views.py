import json
from rest_framework import status
from rest_framework.generics import ListCreateAPIView,ListAPIView,CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from crews.models import Crew
from rest_framework import filters
from django.http import Http404
from django.db.models import Count 
from django.db.models import Sum
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from crews.serializer.crew import CrewCreateSerializer, CrewListSerializer, CrewSerializer



#리뷰를 작성할 가게 검색 or 가게 추가
class CrewListCreateAPIView(ListCreateAPIView):
    authentication_classes=[]
    serializer_class = CrewCreateSerializer
    filter_backends = [filters.SearchFilter,DjangoFilterBackend]
    queryset=Crew.objects.all()
    search_fields = ['crew_name']
    filterset_fields = ['is_business']

    
    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = CrewListSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = CrewListSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save(crew_leader=self.request.user)
        crew = Crew.objects.get(pk=serializer.data['crew_pk'])
        crew.crew_member.add(self.request.user)
        return serializer.data



class CrewRetriveUpdateDeleteView(RetrieveUpdateDestroyAPIView) :

    authentication_classes=[]
    serializer_class = CrewSerializer
    queryset=Crew.objects.all()
    lookup_field = 'crew_pk'




