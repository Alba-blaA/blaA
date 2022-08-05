from django.shortcuts import get_object_or_404
from rest_framework import serializers

from stories.serializers.comment import CommentSerializer
from ..models import Story,Comment


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = '__all__'
        read_only_fields = ('user_pk','region','category')

class StoryDetailSerializer(serializers.ModelSerializer) :
    
    class CommentSerializer(serializers.ModelSerializer):
        class Meta:
            model = Comment
            fields = '__all__'
    
    comment_set = CommentSerializer()
    # comment = get_object_or_404(Comment)
            
    class Meta :
        model = Story
        fields= ('story_pk','user_pk','story_title','story_picture','created_at','comment_set')
        

