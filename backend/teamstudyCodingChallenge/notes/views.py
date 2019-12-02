import os
import json

from django.shortcuts import render
from django.http import JsonResponse, HttpRequest, HttpResponse

from teamstudyCodingChallenge import settings

def index(request):
    with open(os.path.join(settings.BASE_DIR, "notes/notes.json")) as notes_file:
        data = json.load(notes_file)
        return JsonResponse(data)

def createNote(request):
    with open(os.path.join(settings.BASE_DIR, "notes/notes.json")) as notes_file:
        data = json.load(notes_file)
    
    request_body = json.loads(request.body)
    data["notes"].append({
        "title": request_body["title"],
        "body": request_body["body"]
    })
    
    with open(os.path.join(settings.BASE_DIR, "notes/notes.json"), "w") as notes_file:
        notes_file.write("")
        json.dump(data, notes_file)
    
    return HttpResponse(200)