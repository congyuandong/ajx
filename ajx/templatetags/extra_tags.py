#coding=utf-8 
from django import template
register = template.Library()

import sys
sys.path.append("..")
from ajx.models import SetOut,Destination


def index_left(context, setouts, destins, destouts):

	result = {
		'setouts':setouts,
		'destins':destins,
		'destouts':destouts
	}
	
	if 'request' in context:
		params = context['request'].GET.copy()
		if 's' in params:
			if int(params['s']) != -1:
				result['sall'] = 1
			result['sid'] = int(params['s'])
			del params['s']
		if len(params.keys()) > 0:
			result['except_s'] = "&%s" % params.urlencode()
		else:
			result['except_s'] = ''
		params = context['request'].GET.copy()
		if 'd' in params:
			if int(params['d']) != -1:
				result['dall'] = 1
			result['did'] = int(params['d'])
			del params['d']
		if len(params.keys()) > 0:
			result['except_d'] = "&%s" % params.urlencode()
		else:
			result['except_d'] = ''


	return result

register.inclusion_tag('ajx/includes/index_left.html', takes_context=True)(index_left)