import uuid
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from .forms import CustomUserCreationForm
from .models import Profile

def register_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            token = str(uuid.uuid4())
            profile = Profile.objects.create(user=user, token=token)
            profile.is_verified = True
            profile.save()
            print(f"Verification link: http://127.0.0.1:8000/verify/{token}") 
            messages.success(request, "Registration successful! Check console for verification link.")
            return redirect('login')  
    else:
        form = CustomUserCreationForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user:
            if not user.profile.is_verified:
                messages.error(request, "Account not verified. Please check your email link.")
                return redirect('login')

            login(request, user)
            return redirect('dashboard')

        else:
            messages.error(request, "Invalid username or password.")
            return redirect('login')

    return render(request, 'login.html')

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def dashboard_view(request):
    return render(request, 'dashboard.html')

def verify_view(request, token):
    try:
        profile = Profile.objects.get(token=token)
        profile.is_verified = True
        profile.save()
        return render(request, 'verify.html', {'message': 'Account Verified Successfully'})
    except:
        return render(request, 'verify.html', {'message': 'Invalid or expired token'})