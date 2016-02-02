#coding:utf-8
from django.conf import settings

import requests
import simplejson as json
from urllib import urlencode

class WBSocial:

	def __init__(self, appId = settings.WB_APP_ID, appSecret = settings.WB_APP_SECRET, redirectUrl = settings.WB_REDIRECT_URL):
		self.appId = appId
		self.appSecret = appSecret
		self.redirectUrl = redirectUrl
		self.responseType = 'code'
		self.grantType = 'authorization_code'
		self.code = None
		self.accessToken = None

	#get Authorization Code
	def getAuthCode(self):
		url = 'https://api.weibo.com/oauth2/authorize'
		params =   {'response_type':self.responseType,
					'client_id':self.appId,
					'redirect_uri':self.redirectUrl}
		return url + '?' + urlencode(params)

	#get Access Token
	def getAccessToken(self):
		url = 'https://api.weibo.com/oauth2/access_token'
		params =   {'grant_type':self.grantType,
					'client_id':self.appId,
					'client_secret':self.appSecret,
					'code':self.code,
					'redirect_uri':self.redirectUrl}
		response = requests.post(url, params = params)
		responseJson = response.json()
		self.accessToken = responseJson['access_token']
		return responseJson['uid']

	#get Open ID
	def getOpenId(self, code):
		self.code = code
		openid = self.getAccessToken()
		self.openId = openid

		return self.openId

	#get User Info
	def getUserInfo(self):
		url = 'https://api.weibo.com/2/users/show.json'
		params =   {'access_token':self.accessToken,
					'uid':self.openId}
		response = requests.get(url, params = params)
		return response.json()