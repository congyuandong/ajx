#coding:utf-8
from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.http import Http404

from datetime import date

from  models import *


#首页
def Index(request):
	context = RequestContext(request)

	setOutObjs = SetOut.objects.order_by('sort')[0:6]
	destInObjs = Destination.objects.filter(types = 1).order_by('sort')[0:6]
	destOutObjs = Destination.objects.filter(types = 2).order_by('sort')[0:6]
	slideBannerObjs = BannerSlide.objects.order_by('sort')[0:5]
	linkObjs = Links.objects.order_by('sort')
	
	#对路线和广告重新排列
	routes = Route.objects.order_by('-update')[0:18]
	listbanners = BannerList.objects.order_by('sort')[0:5]
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

	context_dict = {
		'setouts':setOutObjs,
		'destins':destInObjs,
		'destouts':destOutObjs,
		'indexitems':indexItemObjs,
		'slidebanners':slideBannerObjs,
		'links':linkObjs
	}
	return render_to_response('ajx/index.html',context_dict,context)