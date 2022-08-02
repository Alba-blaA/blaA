from django.shortcuts import get_list_or_404, get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Story,Comment
from .serializers.story import StorySerializer,StoryDetailSerializer
from .serializers.comment import CommentSerializer
from .serializers.hashtag import HashtagSerializer
# Create your views here.

@api_view(['GET', 'POST'])
def story_list_or_create(request):
    
    def story_list():
        story = Story.objects.all()
        serializer = StorySerializer(story, many=True)
        return Response(serializer.data)
    
    def create_story():
        serializer = StorySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user_pk = request.user, region = request.user.region, category = request.user.category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    if request.method == 'GET':
        return story_list()
    elif request.method == 'POST':
        return create_story()
    
@api_view(['GET', 'PUT', 'DELETE'])   
def story_detail_or_update_or_delete(request, story_pk):
    story = get_object_or_404(Story, story_pk=story_pk)
    def story_detail():
        print(request.user.user_pk)
        serializer = StorySerializer(story)
        return Response(serializer.data)
    
    def story_update() :
        # print("~~~~~~~"+request.user.user_pk)
        if request.user.user_pk == story.user_pk_id:
            print(story)
            serializer = StorySerializer(instance=story, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user_pk = request.user, region = request.user.region, category = request.user.category)
                return Response(serializer.data)
            
    def story_delete() : 
        if request.user.user_pk == story.user_pk_id:
            story.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
    if request.method == 'GET':
        return story_detail()
    elif request.method == 'PUT':
        # print(request.user.user_pk)
        # print(story.user_pk_id)
        if request.user.user_pk == story.user_pk_id:
            return story_update()
    elif request.method == 'DELETE':
        if request.user.user_pk == story.user_pk_id:
            return story_delete()

@api_view(['GET', 'POST'])
def comment_list_or_create(request, story_pk):
    def comment_list():
        story = get_object_or_404(Story, story_pk = story_pk)
        print(story)
        comments = get_list_or_404(Comment,story_pk=story)
        serializer = CommentSerializer(comments, many= True)
        return Response(serializer.data)
    
    def comment_create():
        story = get_object_or_404(Story, story_pk = story_pk)
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user_pk = request.user, story_pk = story)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    if request.method == 'GET':
        return comment_list()
    elif request.method == 'POST':
        return comment_create()
    
# @api_view(['GET'])         
# def comment_list(request, story_pk):
#     story = get_object_or_404(Story, story_pk = story_pk)
#     print(story)
#     comments = get_list_or_404(Comment,story_pk=story)
#     serializer = CommentSerializer(comments, many= True)
#     return Response(serializer.data)
        
# @api_view(['POST'])        
# def comment_create(request):
#     serializer = CommentSerializer(data=request.data)
#     if serializer.is_valid(raise_exception=True):
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['PUT','DELETE'])  
def comment_update_or_delete(request, comment_pk):
    comment = get_object_or_404(Comment, comment_pk=comment_pk)
    def comment_update() :
        if request.user.user_pk == comment.user_pk_id:
            serializer = CommentSerializer(instance=comment, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user_pk = request.user)
                return Response(serializer.data)
            
    def comment_delete() :
        if request.user.user_pk == comment.user_pk_id:
            comment.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        
    if request.method == 'PUT':
        if request.user.user_pk == comment.user_pk_id:
            return comment_update()
    elif request.method == 'DELETE':
        if request.user.user_pk == comment.user_pk_id:
            return comment_delete()    
        
@api_view(['POST'])        
def hashtag_create(request, story_pk):
    story = get_object_or_404(Story, story_pk = story_pk)
    serializer = HashtagSerializer(data=request.data)
    print(serializer)
    if serializer.is_valid(raise_exception=True):
        serializer.save(user_pk = request.user, story_pk = story)
        return Response(serializer.data, status=status.HTTP_201_CREATED) 
    
    