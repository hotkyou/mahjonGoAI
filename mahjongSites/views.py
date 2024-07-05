import json
import hashlib

from django.http import JsonResponse
from django.shortcuts import render
from Application.mahjongAI import mahjongAI
from Application.mahjongAI2 import *
from .models import UserInfo
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
# from DetectFace import trustycat

RESULT = []
LASTTEHAI = []

def index(request):
    message = {'user': 'ログイン'}
    if request.session.get('user'):
        #print(request.session.get('user'))
        message = {'user': request.session.get('user')}
    return render(request, 'index.html', message)

async def mahjongAPI(request):
    if request.method == 'GET':
        print(request.GET["mode"])
        #mode1 = 打牌 mode2 = lasttehai
        if request.GET["mode"] == "1":
            #print(RESULT)
            result = await main([RESULT])
            #print(result)
            return JsonResponse(result, safe=False)
        if request.GET["mode"] == "2":
            return JsonResponse(LASTTEHAI, safe=False)
        
    #jsonファイル作成・保存
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            mahjong = mahjongAI2()
            #打牌用
            result = mahjong.jsonCreate(data)
            LASTTEHAI = data['lasttehai']
            RESULT.clear()
            RESULT.extend(result)
            #print(result)
            return JsonResponse({'message': 'OK', 'data': result, 'lasttehai': LASTTEHAI})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': str(e)}, status=400)

def agentJS(request):
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("------------------")
            print(data)
            
            AI = mahjongAI()
            result = AI.autoPredict(data['dataPai'])
            # AI = mahjongAI2()
            # result = AI.autoPredict(data)

            return JsonResponse({'message': 'OK', 'result': result})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'POSTリクエストのみ受け付けます'}, status=405)