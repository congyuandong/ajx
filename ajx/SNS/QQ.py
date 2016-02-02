#coding:utf-8
from django.conf import settings

import requests
import simplejson as json
from urllib import urlencode
from urlparse import parse_qs

class QQSocial:

	def __init__(self, appId = settings.QQ_APP_ID, appSecret = settings.QQ_APP_SECRET, redirectUrl = settings.QQ_REDIRECT_URL):
		self.appId = appId
		self.appSecret = appSecret
		self.redirectUrl = redirectUrl
		self.scope = 'get_user_info'
		self.responseType = 'code'
		self.grantType = 'authorization_code'
		self.code = None
		self.accessToken = None

	#get Authorization Code
	def getAuthCode(self):
		url = 'https://graph.qq.com/oauth2.0/authorize'
		params =   {'response_type':self.responseType,
					'client_id':self.appId,
					'redirect_uri':self.redirectUrl,
					'scope':self.scope}
		return url + '?' + urlencode(params)

	#get Access Token
	def getAccessToken(self):
		url = 'https://graph.qq.com/oauth2.0/token'
		params =   {'grant_type':self.grantType,
					'client_id':self.appId,
					'client_secret':self.appSecret,
					'code':self.code,
					'redirect_uri':self.redirectUrl}
		response = requests.get(url, params = params)
		responseJson = parse_qs(response.text)
		return responseJson['access_token'][0]

	#get Open ID
	def getOpenId(self, code):
		self.code = code
		self.accessToken = self.getAccessToken()

		url = 'https://graph.qq.com/oauth2.0/me'
		params = {'access_token':self.accessToken}
		response = requests.get(url, params = params)
		responseJson = eval(response.text[9:-3])

		self.openId = responseJson['openid']
		return self.openId

	#get User Info
	def getUserInfo(self):
		url = 'https://graph.qq.com/user/get_user_info'
		params =   {'access_token':self.accessToken,
					'oauth_consumer_key':self.appId,
					'openid':self.openId}
		response = requests.get(url, params = params)
		return response.json()