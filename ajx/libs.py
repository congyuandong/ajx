#coding:utf-8
from django.http import HttpResponse,HttpResponseRedirect
from django.http import Http404

import simplejson as json
import tools as T
from datetime import datetime
from SNS import QQ,WeChat,WeiBo

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

#手机验证码快速登录
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

#第三方登录验证
def SNSLogin(request,action):
	if action == 'wx':
		wechatSocial = WeChat.WeChatSocial()
		return HttpResponseRedirect(wechatSocial.getAuthCode())
	elif action == 'wb':
		wbSocial = WeiBo.WBSocial()
		return HttpResponseRedirect(wbSocial.getAuthCode())
	elif action == 'qq':
		qqSocial = QQ.QQSocial()
		return HttpResponseRedirect(qqSocial.getAuthCode())
	elif action == 'callwx':
		code = request.GET.get('code','')
		wechatSocial = WeChat.WeChatSocial()
		openid = wechatSocial.getOpenId(code)
		userInfoObj = UserInfo.objects.filter(authid__exact = openid)
		if userInfoObj:
			request.session['USER'] = {'account':userInfoObj[0].account, 'nick':userInfoObj[0].nick}
			request.session['LOGIN'] = True
			return HttpResponseRedirect('/')
		else:
			userInfo = wechatSocial.getUserInfo()
			nick = userInfo['nickname']
			avater = userInfo['headimgurl']
			account = nick + datetime.now().strftime('%Y%m%d%H%M%S')
			userInfoObj = UserInfo(account = account, nick = nick, avater = avater, authid = openid)
			userInfoObj.save()
			request.session['USER'] = {'account':account, 'nick':nick}
			request.session['LOGIN'] = True
			return HttpResponseRedirect('/')
	elif action == 'callwb':
		code = request.GET.get('code','')
		wbSocial = WeiBo.WBSocial()
		openid = wbSocial.getOpenId(code)
		userInfoObj = UserInfo.objects.filter(authid__exact = openid)
		if userInfoObj:
			request.session['USER'] = {'account':userInfoObj[0].account, 'nick':userInfoObj[0].nick}
			request.session['LOGIN'] = True
			return HttpResponseRedirect('/')
		else:
			userInfo = wbSocial.getUserInfo()
			nick = userInfo['screen_name']
			avater = userInfo['profile_image_url']
			account = nick + datetime.now().strftime('%Y%m%d%H%M%S')
			userInfoObj = UserInfo(account = account, nick = nick, avater = avater, authid = openid)
			userInfoObj.save()
			request.session['USER'] = {'account':account, 'nick':nick}
			request.session['LOGIN'] = True
			return HttpResponseRedirect('/')
	elif action == 'callqq':
		code = request.GET.get('code','')
		qqSocial = QQ.QQSocial()
		openid = qqSocial.getOpenId(code)
		userInfoObj = UserInfo.objects.filter(authid__exact = openid)
		if userInfoObj:
			request.session['USER'] = {'account':userInfoObj[0].account, 'nick':userInfoObj[0].nick}
			request.session['LOGIN'] = True
			return HttpResponseRedirect('/')
		else:
			userInfo = qqSocial.getUserInfo()
			nick = userInfo['nickname']
			avater = userInfo['figureurl_qq_1']
			account = nick + datetime.now().strftime('%Y%m%d%H%M%S')
			userInfoObj = UserInfo(account = account, nick = nick, avater = avater, authid = openid)
			userInfoObj.save()
			request.session['USER'] = {'account':account, 'nick':nick}
			request.session['LOGIN'] = True
			return HttpResponseRedirect('/')
	else:
		raise Http404

def Logout(request):
	if request.session.has_key('LOGIN'):
		del request.session['LOGIN']
		del request.session['USER']
	return HttpResponseRedirect('/')

#注册
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

#发送邮件验证码
def SendMailCode(request):
	response_dict = {}
	mail = request.GET.get('mail','')
	T.SendMailCode(mail)
	response_dict['code'] = 1
	return HttpResponse(json.dumps(response_dict),content_type="application/json")