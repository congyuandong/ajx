#coding:utf-8
from django.conf import settings

import requests
import simplejson as json
from urllib import urlencode

class WeChatSocial:

	def __init__(self, appId = settings.WECHAT_APP_ID, appSecret = settings.WECHAT_APP_SECRET, redirectUrl = settings.WECHAT_REDIRECT_URL):
		self.appId = appId
		self.appSecret = appSecret
		self.redirectUrl = redirectUrl
		self.scope = 'snsapi_login'
		self.responseType = 'code'
		self.grantType = 'authorization_code'
		self.code = None
		self.accessToken = None

	#get Authorization Code
	def getAuthCode(self):
		url = 'https://open.weixin.qq.com/connect/qrconnect'
		params =   {'response_type':self.responseType,
					'appid':self.appId,
					'redirect_uri':self.redirectUrl,
					'scope':self.scope}
		return url + '?' + urlencode(params) + '#wechat_redirect'

	#get Access Token
	def getAccessToken(self):
		url = 'https://api.weixin.qq.com/sns/oauth2/access_token'
		params =   {'grant_type':self.grantType,
					'appid':self.appId,
					'secret':self.appSecret,
					'code':self.code}
		response = requests.get(url, params = params)
		return response.json()

	#get Open ID
	def getOpenId(self, code):
		self.code = code
		response = self.getAccessToken()
		self.accessToken = response['access_token']
		self.openId = response['openid']
		return self.openId

	#get User Info
	def getUserInfo(self):
		url = 'https://api.weixin.qq.com/sns/userinfo'
		params =   {'access_token':self.accessToken,
					'openid':self.openId}
		response = requests.get(url, params = params)
		response.encoding = 'UTF-8'
		return response.json()