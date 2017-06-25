#coding=utf-8 
from django import template
register = template.Library()
from datetime import date,datetime

@register.filter(name = 'discount')
def discount(price, oldprice):
    return '%0.1f'%(float(price)/float(oldprice)*10)

@register.filter(name = 'odd')
def odd(dividend, divisor):
    return dividend % divisor

@register.filter(name = 'week')
def week(value):
    if value:
        value = datetime.strptime(value,'%Y-%m-%d')
        weeks = ['一','二','三','四','五','六','日']
        return weeks[value.weekday()]
    return ''

@register.filter(name = 'multiply')
def multiply(v1, v2):
    return '%0.2f' % (v1 * v2)


