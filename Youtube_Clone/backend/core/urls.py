from django.urls import path
from . import views

urlpatterns = [
    path('videos/', views.list_videos),
    path('videos/upload/', views.upload_video),
    path('videos/<int:pk>/', views.get_video),
    path('videos/user/', views.user_dashboard),

    path('videos/<int:pk>/like/', views.like_video),
    path('videos/<int:pk>/dislike/', views.dislike_video),

    path('watchlater/', views.my_watch_later),
    path('watchlater/add/', views.add_watch_later),
    path('watchlater/remove/', views.remove_watch_later),

    path('comments/<int:video_id>/', views.get_comments),
    path('comments/add/', views.post_comment),
    path('videos/<int:pk>/comments/', views.video_comments),
    path('search/', views.search_videos),
]
