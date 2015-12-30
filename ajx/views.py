#coding:utf-8
from django.shortcuts import render
from django.template import RequestContext
from django.shortcuts import render_to_response
from django.http import HttpResponse,HttpResponseRedirect
from django.http import Http404

from  models import *

def Index(request):
	context = RequestContext(request)

	setouts = SetOut.objects.order_by('sort')[0:6]
	destins = Destination.objects.filter(types = 1).order_by('sort')[0:6]
	destouts = Destination.objects.filter(types = 2).order_by('sort')[0:6]
	slidebanners = BannerSlide.objects.order_by('sort')[0:5]
	
	routes = Route.objects.order_by('-update')[0:18]
	listbanners = BannerList.objects.order_by('sort')[0:5]


	indexitems = []
	counter = 0
	for route in routes:
		counter = counter + 1
		indexitems.append({'type':'route','content':route})
		print counter,len(listbanners)
		if counter % 3 == 0 and len(listbanners) >= counter/3:
			indexitems.append({'type':'ad','content':listbanners[counter/3 - 1]})
	for index in range(counter/3, len(listbanners)):
		indexitems.append({'type':'ad','content':listbanners[index]})

	context_dict = {
		'setouts':setouts,
		'destins':destins,
		'destouts':destouts,
		'indexitems':indexitems,
		'slidebanners':slidebanners
	}
	print context_dict
	return render_to_response('ajx/index.html',context_dict,context)