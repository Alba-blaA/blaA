import json
from rest_framework import status
from rest_framework.generics import ListCreateAPIView,ListAPIView,CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from crews.models import Crew, CrewArticle, CrewArticleComment, CrewSchedule
from rest_framework import filters
from django.http import Http404
from django.db.models import Count 
from django.db.models import Sum
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from crews.serializer.article import CrewArticleRUDSerializer, CrewArticleSerializer
from crews.serializer.comment import CrewCommentSerializer
from crews.serializer.crew import CrewCreateSerializer, CrewListSerializer, CrewSerializer
from crews.serializer.schedule import CrewScheduleSerializer
from rest_framework.decorators import api_view
from django.db.models import Q

#리뷰를 작성할 가게 검색 or 가게 추가
class CrewListCreateAPIView(ListCreateAPIView):
    # authentication_classes=[]
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


#크루 상세조회, 크루 변경, 크루 삭제
# 변경 삭제는 크루 리더만 
class CrewRetriveUpdateDeleteView(RetrieveUpdateDestroyAPIView) :

    # authentication_classes=[]
    serializer_class = CrewSerializer
    queryset=Crew.objects.all()
    lookup_field = 'crew_pk'


    def update(self, request,crew_pk, *args, **kwargs):
        crew = Crew.objects.get(crew_pk=crew_pk)
        if request.user != crew.crew_leader :
            return Response({'message':"You do not have permission to change the user's information,try again"},status=status.HTTP_400_BAD_REQUEST)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def destroy(self, request,crew_pk, *args, **kwargs):
        crew = Crew.objects.get(crew_pk=crew_pk)
        if request.user != crew.crew_leader :
            return Response({'message':"You do not have permission to change the crew's information,try again"},status=status.HTTP_400_BAD_REQUEST)
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class CrewArticleListCreateAPIView(ListCreateAPIView):
    # authentication_classes=[]
    serializer_class = CrewArticleSerializer
    queryset=CrewArticle.objects.all()
    lookup_field = 'crew_id'

    def list(self, request, crew_id,*args, **kwargs):
        crew = Crew.objects.get(crew_pk=crew_id)
        if request.user in crew.crew_member.all() :

            queryset = CrewArticle.objects.filter(crew=crew_id).order_by('-crew_pin')
        else :
            queryset = CrewArticle.objects.filter(crew=crew_id,crew_private=False).order_by('-crew_pin')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, crew_id,*args, **kwargs):
        crew = Crew.objects.get(crew_pk=crew_id)
        if request.user in crew.crew_member.all() :
            serializer = self.get_serializer(data=request.data)
            print(request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(crew_id,serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else :
            return Response({'message':"You do not have permission to create the article in crew ,try again"},status=status.HTTP_400_BAD_REQUEST)


    def perform_create(self, crew_id,serializer):
        crew = Crew.objects.get(crew_pk=crew_id)
        serializer.save(user=self.request.user,crew=crew)
        return serializer.data



class CrewArticleRetriveUpdateDeleteView(RetrieveUpdateDestroyAPIView) :

    # authentication_classes=[]
    serializer_class = CrewArticleRUDSerializer
    queryset=CrewArticle.objects.all()
    lookup_field = 'crew_article_pk'


    def retrieve(self, request, crew_article_pk,*args, **kwargs):
        instance = self.get_object()
        crew_article = CrewArticle.objects.get(crew_article_pk=crew_article_pk)
        crew = Crew.objects.get(crew_pk=crew_article.crew_id)
        if crew_article.crew_private and not (request.user in crew.crew_member.all() ):
            return Response({'message':"You do not have permission to view the article's ,try again"},status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


    def update(self, request,crew_article_pk, *args, **kwargs):
        article = CrewArticle.objects.get(crew_article_pk=crew_article_pk)
        
        if request.user != article.user :
            return Response({'message':"You do not have permission to change the article's information,try again"},status=status.HTTP_400_BAD_REQUEST)
    
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer,article.crew_id)
        
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def perform_update(self, serializer,crew_id):
        crew = Crew.objects.get(crew_pk=crew_id)
        serializer.save(user=self.request.user,crew=crew)
        return serializer.data


    def destroy(self, request,crew_article_pk, *args, **kwargs):
        article = CrewArticle.objects.get(crew_article_pk=crew_article_pk)
        if request.user != article.user :
            return Response({'message':"You do not have permission to change the article's information,try again"},status=status.HTTP_400_BAD_REQUEST)
        
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)




class CrewCommentListCreateAPIView(ListCreateAPIView):
    # authentication_classes=[]
    serializer_class = CrewCommentSerializer
    queryset=CrewArticleComment.objects.all()
    lookup_field = 'crew_article_pk'

    def list(self, request, crew_article_pk,*args, **kwargs):
        queryset = CrewArticleComment.objects.filter(article=crew_article_pk)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, crew_article_pk,*args, **kwargs):
        article = CrewArticle.objects.get(crew_article_pk=crew_article_pk)
        crew = Crew.objects.get(crew_pk=article.crew_id)
        if request.user in crew.crew_member.all() :
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(crew.crew_pk,crew_article_pk,serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else :
            return Response({'message':"You do not have permission to create the article in crew ,try again"},status=status.HTTP_400_BAD_REQUEST)


    def perform_create(self, crew_id,crew_article_pk,serializer):
        crew = Crew.objects.get(crew_pk=crew_id)
        article = CrewArticle.objects.get(crew_article_pk=crew_article_pk)
        serializer.save(user=self.request.user,crew=crew,article=article)
        return serializer.data


class CrewCommentUpdateDeleteAPIView(RetrieveUpdateDestroyAPIView):
    # authentication_classes=[]
    serializer_class = CrewCommentSerializer
    queryset=CrewArticleComment.objects.all()
    lookup_field = 'crew_comment_pk'
    def update(self, request,crew_comment_pk, *args, **kwargs):
        comment = CrewArticleComment.objects.get(crew_comment_pk=crew_comment_pk)
        
        if request.user != comment.user :
            return Response({'message':"You do not have permission to change the comment's information,try again"},status=status.HTTP_400_BAD_REQUEST)
    
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # print(crew_id)
        self.perform_update(serializer,comment.crew_id,comment.article_id)
        
        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)

    def perform_update(self, serializer,crew_id,crew_article_pk ):
        print(crew_id,crew_article_pk)
        crew = Crew.objects.get(crew_pk=crew_id)
        article = CrewArticle.objects.get(crew_article_pk=crew_article_pk)
        serializer.save(user=self.request.user,crew=crew,article=article)
        return serializer.data

    def destroy(self, request,crew_comment_pk, *args, **kwargs):
        comment = CrewArticleComment.objects.get(crew_comment_pk=crew_comment_pk)
        if request.user != comment.user :
            return Response({'message':"You do not have permission to change the comment's information,try again"},status=status.HTTP_400_BAD_REQUEST)
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET', 'POST'])    
def crew_schedule_list_or_create(request, crew_id):
    
    def schedule_list():
        schedule = CrewSchedule.objects.filter(Q(crew_id=crew_id))
        serializer = CrewScheduleSerializer(schedule, many = True)
        return Response(serializer.data)
    
    def schedule_create():
        serializer = CrewScheduleSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(crew_id=crew_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    if request.method == 'GET':
        return schedule_list()
    elif request.method == 'POST':
        return schedule_create()
    
@api_view(['PUT', 'DELETE'])  
def crew_schedule_update_or_delete(request, crew_schedule_pk):
    
    schedule = CrewSchedule.objects.get(crew_schedule_pk=crew_schedule_pk)
    
    def schedule_update():
        serializer = CrewScheduleSerializer(instance=schedule, data=request.data)
        if serializer.is_valid(raise_exception=True):
                serializer.save(crew_id=schedule.crew_id)
                return Response(serializer.data)
            
    def schedule_delete():
        schedule.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    if request.method == 'PUT':
        return schedule_update()
    elif request.method == 'DELETE':
        return schedule_delete()

@api_view(['GET'])
def crew_schedule_work_list(request, crew_schedule_pk):
    schedule = CrewSchedule.objects.get(crew_schedule_pk=crew_schedule_pk)
    print(schedule.crew_day)
    tmp = CrewSchedule.objects.filter(crew_day=schedule.crew_day)
    print(tmp)
    print(len(tmp))
    for tm in len(tmp):
        print(tm.get('user_id'))
    
    
