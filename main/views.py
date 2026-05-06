from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'index.html')

def rankings(request, genre=None):
    return render(request, 'rankings.html', {'genre': genre})

def about(request):
    return render(request, 'about.html')

def api_scores(request):
    return JsonResponse({'scores': []})
