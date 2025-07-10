from rest_framework import serializers
from .models import Video, Comment, Like, WatchLater
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class VideoSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Video
        fields = ['id', 'user', 'title', 'description', 'video', 'uploaded_at', 'likes', 'dislikes']

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'video', 'text', 'created_at']
        extra_kwargs = {'video': {'required': False}}

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        validated_data['video'] = self.context['video']
        return Comment.objects.create(**validated_data)


class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = '__all__'

class WatchLaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = WatchLater
        fields = '__all__'
