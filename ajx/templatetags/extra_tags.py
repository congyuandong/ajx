#coding=utf-8 
from django import template
register = template.Library()

@register.filter(name='discount')
def discount(price, oldprice):
	return '%0.1f'%(float(price)/float(oldprice)*10)

@register.filter(name='odd')
def odd(dividend, divisor):
	return dividend % divisor

