#coding:utf-8
from django.http import HttpResponse,HttpResponseRedirect

import simplejson as json
import tools as T
from datetime import datetime

from models import *

def Login(request):
	response_dict = {}
	if request.method == 'POST':
		account = request.POST.get('account','')
		password = request.POST.get('password','')
		remember = request.POST.get('remember','')

		if T.CheckExist(UserInfo,{'account':account, 'password':password}):
			response_dict['code'] = 1
			userObj = UserInfo.objects.get(account__exact = account)
			if remember == 'false':
				request.session.set_expiry(False)
			else:
				request.session.set_expiry(7 * 24 * 3600)
			request.session['USER'] = {'account':userObj.account, 'nick':userObj.nick}
			request.session['LOGIN'] = True
		else:
			response_dict['code'] = 0
	else:
		response_dict['code'] = 0
	return HttpResponse(json.dumps(response_dict),content_type="application/json")

def QuickLogin(request):
	response_dict = {}
	if request.method == 'POST':
		account = request.POST.get('account','')
		code = request.POST.get('code','')
		remember = request.POST.get('remember','')

		if T.CheckRandomCode(account, code):
			if remember == 'false':
				request.session.set_expiry(False)
			else:
				request.session.set_expiry(7 * 24 * 3600)
			if not T.CheckExist(UserInfo,{'account':account}):
				userInfoObj = UserInfo(account = account, phone = account, nick = account)
				userInfoObj.save()
				request.session['USER'] = {'account':account, 'nick':account}
			else:
				userInfoObj = UserInfo.objects.get(account__exact = account)
				request.session['USER'] = {'account':account, 'nick':userInfoObj.nick}
			request.session['LOGIN'] = True
			response_dict['code'] = 1
		else:
			response_dict['code'] = -1
	else:
		response_dict['code'] = 0
	return HttpResponse(json.dumps(response_dict),content_type="application/json")

def Logout(request):
	if request.session.has_key('LOGIN'):
		del request.session['LOGIN']
		del request.session['USER']
	return HttpResponseRedirect('/')

def Reg(request):
	response_dict = {}
	if request.method == 'POST':
		account = request.POST.get('account','')
		password = request.POST.get('password','')
		code = request.POST.get('code','')
		regType = request.POST.get('type','tel')

		if T.CheckRandomCode(account, code):
			if not T.CheckExist(UserInfo,{'account':account}):
				phone = ''
				email = ''
				if regType == 'tel':
					phone = account
				elif regType == 'mail':
					email = account
				userInfoObj = UserInfo(account = account, password = password, phone = phone, email = email, nick = account)
				userInfoObj.save()
				request.session['USER'] = {'account':account, 'nick':account}
				request.session['LOGIN'] = True
				response_dict['code'] = 1
			else:
				response_dict['code'] = -2
		else:
			response_dict['code'] = -1
	else:
		response_dict['code'] = 0
	return HttpResponse(json.dumps(response_dict),content_type="application/json")

#获取随机验证码
def GetRandomCode(request):
	response_dict = {}
	if request.method == 'GET':
		tel = request.GET.get('tel','')
		if len(tel) != 11:
			response_dict['code'] = 0
		else:
			randomCodeObj = RandomCode.objects.filter(tel = tel)
			if randomCodeObj:
				if (datetime.now() - randomCodeObj[0].time).seconds < 60:
					response_dict['code'] = 2
				else:
					if T.SendSMS(tel) == True:
						response_dict['code'] = 1
					else:
						response_dict['code'] = 0
			else:
				if T.SendSMS(tel) == True:
					response_dict['code'] = 1
				else:
					response_dict['code'] = 0
	else:
		response_dict['code'] = 0
	return HttpResponse(json.dumps(response_dict),content_type="application/json")

def SendMailCode(request):
	response_dict = {}
	mail = request.GET.get('mail','')
	T.SendMailCode(mail)
	response_dict['code'] = 1
	return HttpResponse(json.dumps(response_dict),content_type="application/json")