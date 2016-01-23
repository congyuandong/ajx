#coding=utf-8 
from django import template
register = template.Library()

import sys
sys.path.append("..")
from ajx.models import NorthDest

from django.shortcuts import get_object_or_404

def route_top(context, setouts, dests, traveltypes):
	result = {
		'setouts':setouts,
		'dests':dests,
		'traveltypes':traveltypes
	}

	if 'request' in context:
		params = context['request'].GET.copy()
		if 's' in params:
			result['sid'] = int(params['s'])
			del params['s']
		if len(params.keys()) > 0:
			result['except_s'] = "&%s" % params.urlencode()
		params = context['request'].GET.copy()
		if 't' in params:
			result['tid'] = int(params['t'])
			del params['t']
		if len(params.keys()) > 0:
			result['except_t'] = "&%s" % params.urlencode()
		params = context['request'].GET.copy()
		if 'd' in params:
			result['did'] = int(params['d'])
			if result['did'] != -1:
				result['dfid'] = get_object_or_404(NorthDest, id = int(params['d'])).types
			del params['d']
		if len(params.keys()) > 0:
			result['except_d'] = "&%s" % params.urlencode()

	return result

register.inclusion_tag('ajx/includes/route_top.html', takes_context=True)(route_top)