from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from django.db.models import Q
from django.shortcuts import get_object_or_404
from .models import Video, Comment, Like, WatchLater,VideoReaction
from .serializers import VideoSerializer, CommentSerializer, LikeSerializer, WatchLaterSerializer
from django.contrib.auth.models import User


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def upload_video(request):
    serializer = VideoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def list_videos(request):
    videos = Video.objects.all().order_by('-uploaded_at')
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_video(request, pk):
    try:
        video = Video.objects.get(pk=pk)
        serializer = VideoSerializer(video)
        return Response(serializer.data)
    except Video.DoesNotExist:
        return Response({"error": "Video not found"}, status=404)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_dashboard(request):
    videos = Video.objects.filter(user=request.user).order_by('-uploaded_at')
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)


# ---------- LIKE / UNLIKE ----------

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def like_video(request, pk):
    video = get_object_or_404(Video, id=pk)
    user = request.user

    reaction, created = VideoReaction.objects.get_or_create(user=user, video=video)

    if reaction.reaction != 'like':
        if reaction.reaction == 'dislike':
            video.dislikes -= 1
        video.likes += 1
        reaction.reaction = 'like'
        reaction.save()
        video.save()

    return Response({'message': 'Video liked'})

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def dislike_video(request, pk):
    video = get_object_or_404(Video, id=pk)
    user = request.user

    reaction, created = VideoReaction.objects.get_or_create(user=user, video=video)

    if reaction.reaction != 'dislike':
        if reaction.reaction == 'like':
            video.likes -= 1
        video.dislikes += 1
        reaction.reaction = 'dislike'
        reaction.save()
        video.save()

    return Response({'message': 'Video disliked'})



# ---------- WATCH LATER ----------

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def add_watch_later(request):
    video_id = request.data.get('video_id')
    video = Video.objects.get(id=video_id)
    item, created = WatchLater.objects.get_or_create(user=request.user, video=video)
    if created:
        return Response({"message": "Added to Watch Later"})
    return Response({"message": "Already in Watch Later"})


@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def remove_watch_later(request):
    video_id = request.data.get('video_id')
    try:
        item = WatchLater.objects.get(user=request.user, video__id=video_id)
        item.delete()
        return Response({"message": "Removed from Watch Later"})
    except WatchLater.DoesNotExist:
        return Response({"message": "Not in Watch Later"}, status=404)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_watch_later(request):
    items = WatchLater.objects.filter(user=request.user)
    videos = [item.video for item in items]
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)


# ---------- COMMENTS ----------

@api_view(['GET'])
def get_comments(request, video_id):
    comments = Comment.objects.filter(video_id=video_id).order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def post_comment(request):
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


# ---------- SEARCH ----------

@api_view(['GET'])
def search_videos(request):
    query = request.query_params.get('q', '')
    videos = Video.objects.filter(Q(title__icontains=query) | Q(description__icontains=query))
    serializer = VideoSerializer(videos, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticatedOrReadOnly])
def video_comments(request, pk):
    video = get_object_or_404(Video, id=pk)

    if request.method == 'POST':
        serializer = CommentSerializer(data=request.data,context={'video':video,'request':request})
        if serializer.is_valid():
            serializer.save(user=request.user, video=video)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    # GET
    comments = Comment.objects.filter(video=video).order_by('-created_at')
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)
