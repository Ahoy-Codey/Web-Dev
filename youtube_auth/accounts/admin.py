from django.contrib import admin
from .models import Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_verified', 'token')
    search_fields = ('user__username', 'user__email')
    ordering = ('user__username',)