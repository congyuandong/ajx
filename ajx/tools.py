#coding:utf-8
import calendar
import datetime
import requests
import md5,base64
import simplejson as json
import string,random
from models import *
from django.core.mail import send_mail

#查找某个模型的数据是否存在
def CheckExist(model,kwargs):
	objects = model.objects.filter(**kwargs)
	if objects:
		return True
	return False

def getcal(y, m):  
	# 从周日开始  
	cal = calendar.Calendar()  
	if not isinstance(y, int): y = int(y)  
	if not isinstance(m, int): m = int(m)  
	if m == 1: # 1月份  
		py = y - 1; pm = 12;  
		ny = y; nm = 2  
	elif m == 12: # 12月份  
		py = y; pm = 11  
		ny = y + 1; nm = 1  
	else:  
		py = y; pm = m - 1  
		ny = y; nm = m + 1  
	pcal = cal.monthdayscalendar(py, pm) # 上一月  
	ncal = cal.monthdayscalendar(ny, nm) # 下一月  
	ccal = cal.monthdayscalendar(y, m)   # 当前  
	w1 = ccal.pop(0) # 取第一周  
	w2 = ccal.pop()  # 取最后一周  
	wp = pcal.pop()  # 上个月的最后一周  
	wn = ncal.pop(0) # 下个月的第一周  
	#r1 = [datetime.date(y, m ,w1[i]) or wp[i] for i in range(7)]  
	r1 = [w1[i] and datetime.date(y, m, w1[i]) or datetime.date(py, pm, wp[i]) for i in range(7)]  
	r2 = [w2[i] and datetime.date(y, m, w2[i]) or datetime.date(ny, nm, wn[i]) for i in range(7)]  
	# 转datetime  
	result = []  
	result.append(r1) # 第一周  
	for c in ccal:    # 其他周  
		result.append([datetime.date(y,m,i) for i in c])
	result.append(r2) # 最后一周
	return result


#发送验证短信
# to 电话号码
SMS_URL = 'https://sandboxapp.cloopen.com:8883/2013-12-26/Accounts/%s/SMS/TemplateSMS?sig=%s'
SMS_AccountSid = '8a48b5514b827f85014bbec1fe910626'
SMS_AccountToken = '87cef17530f548188f2307095a13775a'
SMS_AppID = 'aaf98f894b827e71014bbecb335a06f2'
SMS_TemplateID = '1'
def SendSMS(to):
	batch = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
	signature = SMS_AccountSid + SMS_AccountToken + batch
	sigParameter = md5.new(signature).hexdigest().upper()
	url = SMS_URL%(SMS_AccountSid,sigParameter)

	src = SMS_AccountSid + ':' + batch
	auth = base64.encodestring(src).strip()
	headers = {'Accept':'application/json', 'content-type':'application/json;charset=utf-8', 'Authorization':auth}

	code = RandCode()
	payload = {'to':to, 'appId':SMS_AppID, 'templateId':SMS_TemplateID, 'datas':'[' + code + ', 5]'}

	response = requests.post(url, data=json.dumps(payload), headers=headers)
	response = response.json()
	statusCode = response['statusCode']
	if statusCode == '000000':
		if CheckExist(RandomCode,{'tel':to}):
			randomCode_obj = RandomCode.objects.get(tel__exact = to)
			randomCode_obj.code = code
			randomCode_obj.time = datetime.datetime.now()
			randomCode_obj.save()
		else:
			randomCode_obj = RandomCode(tel = to, code = code, time = datetime.datetime.now())
			randomCode_obj.save()
		return True
	else:
		return False

#随机产生六个数字
def RandCode():
	return string.join(random.sample(['1','2','3','4','5','6','7','8','9','0'], 6)).replace(' ','')

def SendMailCode(address):
	code = RandCode()
	if CheckExist(RandomCode,{'tel':address}):
		randomCode_obj = RandomCode.objects.get(tel__exact = address)
		randomCode_obj.code = code
		randomCode_obj.time = datetime.datetime.now()
		randomCode_obj.save()
	else:
		randomCode_obj = RandomCode(tel = address, code = code, time = datetime.datetime.now())
		randomCode_obj.save()
	send_mail('在旅行验证码','您的验证码为:' + code + ',请在5分钟内输入该验证码','blvxing@163.com',[address],fail_silently=False)

#判断用户的验证码是否错误或者超时 5min
def CheckRandomCode(account, code):
	randomCode_obj = RandomCode.objects.filter(tel = account)
	if randomCode_obj:
		if randomCode_obj[0].code == code and (datetime.datetime.now() - randomCode_obj[0].time).seconds < 300:
			return True
		else:
			return False
	else:
		return False