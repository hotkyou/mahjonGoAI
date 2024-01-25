import json
import hashlib

from django.http import JsonResponse
from django.shortcuts import render
from Application.mahjongAI import mahjongAI
from .models import UserInfo
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
# from DetectFace import trustycat

def index(request):
    message = {'user': 'ログイン'}
    if request.session.get('user'):
        #print(request.session.get('user'))
        message = {'user': request.session.get('user')}
    return render(request, 'index.html', message)

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
    
def login(request):
    if request.method == 'POST':
        data = request.POST
        print(data)
        message = {'error': ''}
        if data["username"] == '' or data["password"] == '':
            print("ユーザー名またはパスワードが入力されていません")
            message = {'error': 'ユーザー名またはパスワードが入力されていません'}
            return render(request, 'login.html', message)
        else:
            message = {'user': data["username"]}
            
            try:
                instance = UserInfo.objects.get(username=data["username"])
            except UserInfo.DoesNotExist:
                hash_sha256 = hashlib.sha256(data["password"].encode()).hexdigest()
                print(hash_sha256)
                new_user = UserInfo(username=data["username"], password=hash_sha256)
                new_user.save()
                message = {'user': data["username"]}
                return render(request, 'index.html', message)
            
            if instance.password == hashlib.sha256(data["password"].encode()).hexdigest():
                print("ログイン成功")
                message = {'user': data["username"]}
                request.session['user'] = data["username"]
            else:
                message = {'error': 'パスワードが間違っていますまたはアカウントが存在しません。'}
                return render(request, 'login.html', message)
            
            return render(request, 'index.html', message)
    else:
        print(request.session.get('user'))
        if request.session.get('user'):
            return mypage(request)
        return render(request, 'login.html')

def mypage(request):
    if request.session.get('user'):
        return render(request, 'mypage.html')
    else:
        return render(request, 'login.html')

@csrf_exempt
def auth(request):
    if request.method == "POST":
        data = request.body
        
        return JsonResponse({'message': 'OK'})
    else:
        return render(request, 'auth.html')

def adddata(request):
    if request.method == "POST":
        
        return JsonResponse({'message': 'OK'})
    else:
        return JsonResponse({'error': 'POSTリクエストのみ受け付けます'}, status=405)