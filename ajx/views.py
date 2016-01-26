#coding:utf-8
from django.shortcuts import render_to_response,render,get_object_or_404,get_list_or_404
from django.template import RequestContext
from django.http import HttpResponse,HttpResponseRedirect
from django.http import Http404

from datetime import date,datetime
import simplejson as json
import tools as T

from models import *
from forms import *

#首页
def Index(request):
	context = RequestContext(request)

	setOutObjs = SetOut.objects.order_by('sort')[0:6]
	destInObjs = Destination.objects.filter(types = 1).order_by('sort')[0:6]
	destOutObjs = Destination.objects.filter(types = 2).order_by('sort')[0:6]
	slideBannerObjs = BannerSlide.objects.order_by('sort')[0:5]
	linkObjs = Links.objects.order_by('sort')
	systemInfo = get_list_or_404(SystemInfo)

	context_dict = {
		'setouts':setOutObjs,
		'destins':destInObjs,
		'destouts':destOutObjs,
		'slidebanners':slideBannerObjs,
		'links':linkObjs,
		'S':systemInfo[0],
		'nav':'index'
	}

	#获取筛选数据
	s = int(request.GET.get('s','-1'))
	d = int(request.GET.get('d','-1'))
	m = int(request.GET.get('m','-1'))

	kwargs = {}
	if s > -1:
		kwargs['setOut__id'] = s
		context_dict['setOutObj'] = SetOut.objects.get(id = s)
	if d > -1:
		kwargs['destination__id'] = d
		context_dict['destObj'] = Destination.objects.get(id = d)
	if m > -1:
		context_dict['month'] = m

	#对路线和广告重新排列
	routes = Route.objects.filter(**kwargs).order_by('-update')
	print routes
	listbanners = BannerList.objects.order_by('sort')
	indexItemObjs = []
	counter = 0
	for route in routes:
		counter += 1

		# 求第一个套餐的数据
		classObj = Classification.objects.filter(route = route)[0:1]
		if classObj:
			classObj = classObj[0]
			goDateObjs = GoDate.objects.filter(classification = classObj).order_by('date')
			if goDateObjs:
				sumOfLeft = 0
				daysLeft = (goDateObjs[len(goDateObjs) - 1].date - date.today()).days
				for goDateObj in goDateObjs:
					sumOfLeft += goDateObj.left
				indexItemObjs.append({'type':'route','content':route,'sumOfLeft':sumOfLeft,'godates':goDateObjs[0:3],'daysLeft':daysLeft})
			else:
				indexItemObjs.append({'type':'route','content':route})
		else:
			indexItemObjs.append({'type':'route','content':route})
		if counter % 3 == 0 and len(listbanners) >= counter/3:
			indexItemObjs.append({'type':'ad','content':listbanners[counter/3 - 1]})
	for index in range(counter/3, len(listbanners)):
		indexItemObjs.append({'type':'ad','content':listbanners[index]})
	# 计算结束

	context_dict['indexitems'] = indexItemObjs
	
	return render_to_response('ajx/index.html',context_dict,context)

#线路详细页面
def RouteDetailPage(request, rid):
	context = RequestContext(request)

	today = date.today()

	linkObjs = Links.objects.order_by('sort')
	routeObj = get_object_or_404(Route, id = rid)
	systemInfo = get_list_or_404(SystemInfo)
	classObjs = Classification.objects.filter(route = routeObj).order_by('sort')
	airlinesGo = RouteAirplane.objects.filter(route = routeObj, isgo = 1).order_by('sort')
	airlinesBack = RouteAirplane.objects.filter(route = routeObj, isgo = 2).order_by('sort')
	routeSchedule = RouteDetail.objects.filter(route = routeObj).order_by('sort')

	context_dict = {
		'route':routeObj,
		'links':linkObjs,
		'S':systemInfo[0],
		'classes':classObjs,
		'data':{'year':today.year,'month':today.month},
		'airlines':{'golines':airlinesGo,'backlines':airlinesBack,'golinesCount':len(airlinesGo),'backlinesCount':len(airlinesBack)},
		'schedules':routeSchedule
	}

	if classObjs:
		goDateObjs = GoDate.objects.filter(classification = classObjs[0]).order_by('date')
		for goDateObj in goDateObjs:
			diffDays = (goDateObj.date - date.today()).days
			if diffDays > 0:
				context_dict['data']['lastDays'] = diffDays
				break

	if classObjs:
		calendars = RouteCalendar(request, today.year, today.month, classObjs[0].id)
		context_dict['calendars'] = calendars['calendars']
		if 'go' in calendars.keys():
			print calendars['go']
			context_dict['date'] = calendars['go']['date']
			context_dict['data']['left'] = calendars['go']['left']
		else:
			context_dict['date'] = date.today().strftime('%Y-%m-%d')
			context_dict['data']['left'] = 0
		context_dict['data']['classid'] = classObjs[0].id

	return render_to_response('ajx/route.html',context_dict,context)

#根据年月和日期获取套餐的价格和余位信息
def RouteCalendar(request, year, month, classid):
	response = {}

	weeks = T.getcal(year, month)
	calendars = []

	for week in weeks:
		oneWeek = []
		for day in week:
			goObjs = GoDate.objects.filter(classification__id = classid, date = day)
			if goObjs:
				oneWeek.append({'has':1,'day':day.day,'date':day.strftime('%Y-%m-%d'),'left':goObjs[0].left,'price':int(goObjs[0].price)})
				if 'go' not in response.keys():
					response['go'] = {'date':goObjs[0].date.strftime('%Y-%m-%d'),'left':goObjs[0].left}
			else:
				oneWeek.append({'has':0,'day':day.day})
		calendars.append(oneWeek)

	response['calendars'] = calendars
	response['code'] = 1

	if request.is_ajax():
		return HttpResponse(json.dumps(response),content_type="application/json")
	else:
		return response

#东北游
def North(request):
	context = RequestContext(request)

	linkObjs = Links.objects.order_by('sort')
	systemInfo = get_list_or_404(SystemInfo)

	setOuts = NorthSetOut.objects.order_by('sort')
	dests = NorthDest.objects.order_by('sort')
	travelTypes = NorthType.objects.order_by('sort')

	context_dict = {
		'setouts':setOuts,
		'dests':dests,
		'traveltypes':travelTypes,
		'links':linkObjs,
		'S':systemInfo[0],
		'nav':'north'
	}

	banner = NorthBanner.objects.order_by('-update')
	if banner:
		context_dict['banner'] = banner[0]


	#获取筛选数据
	s = int(request.GET.get('s','-1'))
	d = int(request.GET.get('d','-1'))
	t = int(request.GET.get('t','-1'))

	kwargs = {}
	if s > -1:
		kwargs['setOut__id'] = s
	if d > -1:
		kwargs['destination__id'] = d
	if t > -1:
		kwargs['northType__id'] = t
	print kwargs

	routeObjs = NorthRoute.objects.filter(**kwargs).order_by('-update')
	context_dict['routes'] = routeObjs

	return render_to_response('ajx/north.html',context_dict,context)

#东北游详细页面
def NorthDetail(request):
	context = RequestContext(request)
	context_dict = {}

	return render_to_response('ajx/northdetail.html',context_dict,context)

#定制
def Made(request):
	context = RequestContext(request)
	context_dict = {}

	if request.method == 'POST':
		response = {'code':1}
		madeOrderData = request.POST.copy()
		madeOrderForm = MadeOrderForm(data = madeOrderData)
		if madeOrderForm.is_valid():
			response['code'] = 1
			madeOrderForm.save()
		else:
			response['code'] = 0

	 	return HttpResponse(json.dumps(response),content_type="application/json")

	linkObjs = Links.objects.order_by('sort')
	systemInfo = get_list_or_404(SystemInfo)
	setOuts = MadeSetOut.objects.order_by('types', 'sort')
	destIns = MadeDest.objects.order_by('types', 'sort')
	destOuts = MadeDestOut.objects.order_by('types', 'sort')
	travelTypes = MadeTravelType.objects.order_by('sort')
	budgets = MadeBudget.objects.order_by('sort')

	context_dict = {
		'setOuts':setOuts,
		'destIns':destIns,
		'destOuts':destOuts,
		'travelTypes':travelTypes,
		'budgets':budgets,
		'links':linkObjs,
		'S':systemInfo[0],
		'nav':'made'
	}

	return render_to_response('ajx/made.html',context_dict,context)

#获取随机验证码
def GetRandomCode(request):
	response_dict = {}
	if request.method == 'GET':
		tel = request.GET.get('tel','')
		if len(tel) != 11:
			response_dict['status'] = 0
		else:
			randomCodeObj = RandomCode.objects.filter(tel = tel)
			if randomCodeObj:
				if (datetime.now() - randomCodeObj[0].time).seconds < 60:
					response_dict['status'] = 2
				else:
					if T.SendSMS(tel) == True:
						response_dict['status'] = 1
					else:
						response_dict['status'] = 0
			else:
				if T.SendSMS(tel) == True:
					response_dict['status'] = 1
				else:
					response_dict['status'] = 0
	else:
		response_dict['status'] = 0
	return HttpResponse(json.dumps(response_dict),content_type="application/json")

#判断用户的验证码是否错误或者超时 5min
def CheckRandomCode(tel, code):
	randomCode_obj = RandomCode.objects.filter(tel = tel)
	if randomCode_obj:
		if randomCode_obj[0].code == code and (datetime.now() - randomCode_obj[0].time).seconds < 300:
			return True
		else:
			return False
	else:
		return False

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

def Logout(request):
	if request.session.has_key('LOGIN'):
		del request.session['LOGIN']
		del request.session['USER']
	return HttpResponseRedirect('/')