from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

# Create your views here.

def index(request):
    return render(request, 'typeshift/index.html')


def rankings(request, genre=None):
    return HttpResponse(f"Rankings page: {genre or 'all genres'}")


def about(request):
    return HttpResponse("About TypeShift Trivia")


def api_scores(request):
    data = {"scores": []}
    return JsonResponse(data)
