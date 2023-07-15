import json
from django.http import JsonResponse
from django.shortcuts import render
from Application.mahjongAI import mahjongAI

def index(request):
    return render(request, 'index.html')

def agentJS(request):
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            AI = mahjongAI()
            result = AI.autoPredict(data['dataPai'])
            # データの処理をここに追加する
            return JsonResponse({'message': 'OK', 'result': result})
        except json.JSONDecodeError as e:
            return JsonResponse({'error': str(e)}, status=400)
    else:
        return JsonResponse({'error': 'POSTリクエストのみ受け付けます'}, status=405)

