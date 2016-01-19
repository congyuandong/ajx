#coding:utf-8
from django.shortcuts import render,get_object_or_404
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.http import Http404

from datetime import date
import simplejson as json
import tools as T

from models import *

#首页
def Index(request):
	context = RequestContext(request)

	setOutObjs = SetOut.objects.order_by('sort')[0:6]
	destInObjs = Destination.objects.filter(types = 1).order_by('sort')[0:6]
	destOutObjs = Destination.objects.filter(types = 2).order_by('sort')[0:6]
	slideBannerObjs = BannerSlide.objects.order_by('sort')[0:5]
	linkObjs = Links.objects.order_by('sort')
	
	context_dict = {
		'setouts':setOutObjs,
		'destins':destInObjs,
		'destouts':destOutObjs,
		'slidebanners':slideBannerObjs,
		'links':linkObjs
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
				daysLeft = (goDateObjs[0].date - date.today()).days
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

	context_dict['indexitems'] = indexItemObjs;
	
	return render_to_response('ajx/index.html',context_dict,context)

#线路详细页面
def RouteDetail(request, rid):
	context = RequestContext(request)

	today = date.today()

	linkObjs = Links.objects.order_by('sort')
	
	routeObj = get_object_or_404(Route, id = rid)
	classObjs = Classification.objects.filter(route = routeObj).order_by('sort')

	context_dict = {
		'route':routeObj,
		'links':linkObjs,
		'classes':classObjs,
		'data':{'year':today.year,'month':today.month}
	}

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
	context_dict = {
		'links':linkObjs
	}

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

	return render_to_response('ajx/made.html',context_dict,context)