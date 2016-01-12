#coding:utf-8
from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.http import Http404

from datetime import date

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

	kwargs = {}
	if s > -1:
		kwargs['setOut__id'] = s
		context_dict['setOutObj'] = SetOut.objects.get(id = s)
	if d > -1:
		kwargs['destination__id'] = d
		context_dict['destObj'] = Destination.objects.get(id = d)

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
def RouteDetail(request):
	context = RequestContext(request)
	context_dict = {}

	return render_to_response('ajx/route.html',context_dict,context)

#东北游
def North(request):
	context = RequestContext(request)
	context_dict = {}

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