#coding:utf-8
import xadmin
from xadmin import views
from models import *

from DjangoUeditor.models import UEditorField
from DjangoUeditor.widgets import UEditorWidget
from xadmin.views import BaseAdminPlugin, ModelFormAdminView, DetailAdminView
from django.conf import settings

class GlobalSetting(object):
	#设置base_site.html的Title
	site_title = '爱简行后台管理系统'

	def get_site_menu(self):
		return (
				{'title': '线路管理','menus':(
					{'title': '线路管理', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(Route, 'changelist')},
					{'title': '行程管理', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(RouteDetail, 'changelist')},
					{'title': '套餐管理', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(Classification, 'changelist')},
					{'title': '出发日期管理', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(GoDate, 'changelist')},
					{'title': '出发地管理', 'icon': 'fa fa-location-arrow', 'url': self.get_model_url(SetOut, 'changelist')},
					{'title': '目的地管理', 'icon': 'fa fa-map-marker', 'url': self.get_model_url(Destination, 'changelist')},
					{'title': '附加产品', 'icon': 'fa fa-cutlery', 'url': self.get_model_url(Addition, 'changelist')},
					{'title': '航班信息', 'icon': 'fa fa-plane', 'url': self.get_model_url(RouteAirplane, 'changelist')},
				)},
				{'title': '订单管理 ','menus':(
					{'title': '线路订单', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(Order, 'changelist')},
				)},
				{'title': '用户管理','menus':(
					{'title': '用户管理', 'icon': 'fa fa-user', 'url': self.get_model_url(UserInfo, 'changelist')},
				)},
			)

	# def get_site_menu(self):

	# 	return (
 #            {'title': '用户管理','menus':(
 #                {'title': '用户管理', 'icon': 'fa fa-user', 'url': self.get_model_url(USERS, 'changelist')},
 #                {'title': '账户管理', 'icon': 'fa fa-file', 'url': self.get_model_url(ACCOUNT, 'changelist')},
 #                {'title': '收益管理', 'icon': 'fa fa-cny', 'url': self.get_model_url(PROFIT, 'changelist')},
 #                {'title': '定金管理', 'icon': 'fa fa-usd', 'url': self.get_model_url(PAYMENT, 'changelist')},
 #            )},
 #            {'title':'众筹管理','menus':(
 #            	{'title':'股权众筹','icon': 'fa fa-line-chart','url':self.get_model_url(STOCK,'changelist')},
 #            	{'title':'债权众筹','icon': 'fa fa-money','url':self.get_model_url(BOND,'changelist')},	
 #            )},
 #            {'title': '认购管理','menus':(
 #                {'title': '股权认购', 'icon': 'fa fa-bar-chart-o', 'url': self.get_model_url(INVEST_STOCK, 'changelist')},
 #                {'title': '债权认购', 'icon': 'fa fa-bank', 'url': self.get_model_url(INVEST_BOND, 'changelist')},
 #            )},
 #            {'title':'基础数据维护','menus':(
 #            	{'title':'行业方向','icon': 'fa fa-location-arrow','url':self.get_model_url(INDUSTRY,'changelist')},
 #            	{'title':'辐射区域','icon': 'fa fa-globe','url':self.get_model_url(PROVINCE,'changelist')},
 #            	{'title':'项目属性','icon': 'fa fa-briefcase','url':self.get_model_url(PRO_TYPE,'changelist')},
 #            	{'title':'企业类型','icon': 'fa fa-credit-card','url':self.get_model_url(COM_TYPE,'changelist')},
 #            )},
 #            {'title':'通知管理','menus':(
 #            	{'title':'系统通知','icon': 'fa fa-envelope','url':self.get_model_url(NOTICE,'changelist')},
 #            	{'title':'用户通知','icon': 'fa fa-envelope-o','url':self.get_model_url(NOTICE_USER,'changelist')},	
 #            )},
 #            {'title':'其他','menus':(
 #            	{'title':'用户反馈','icon': 'fa fa-comment','url':self.get_model_url(FEEDBACK,'changelist')},
 #            	{'title':'系统参数','icon': 'fa fa-gear','url':self.get_model_url(SETTINGS,'changelist')},	
 #            	{'title':'协议管理','icon': 'fa fa-file-o','url':self.get_model_url(PROTOCOL,'changelist')},
 #            )},
 #        )

class RouteAdmin(object):
	list_display = ['name', 'ifAct', 'marketPrice', 'realPrice', 'destination', 'setOut', 'adultLeft', 'day', 'night']
	list_editable = ['name', 'ifAct', 'marketPrice', 'realPrice', 'destination', 'setOut', 'adultLeft', 'day', 'night']
	style_fields = {'supplier':'ueditor', 'detail':'ueditor', 'cost':'ueditor', 'ship':'ueditor', 'traffic':'ueditor', 'visa':'ueditor', 'notice':'ueditor', 'netsign':'ueditor', 'hotel':'ueditor'}
	search_fields = ['name']
	list_per_page = 20

class UserInfoAdmin(object):
	list_display = ['account', 'phone', 'email', 'nick', 'sex', 'birthday']
	list_editable = ['phone', 'email', 'nick', 'sex', 'birthday']
	search_fields = ['account', 'phone', 'email', 'nick']
	list_per_page = 20

class SetOutAdmin(object):
	list_display = ['name', 'sort']
	list_editable = ['name', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class DestinationAdmin(object):
	list_display = ['name', 'types', 'sort']
	list_editable = ['name', 'types', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class AdditionAdmin(object):
	list_display = ['name', 'types', 'price', 'sort']
	list_editable = ['name', 'types', 'price', 'sort']
	search_fields = ['name']
	style_fields = {'summary':'ueditor'}
	list_per_page = 20
	ordering = ['sort']

class RouteAirplaneAdmin(object):
	list_display = ['route', 'isgo', 'fromandgo', 'airplane', 'startTime', 'startPlace', 'endTime', 'endPlace']
	list_editable = ['isgo', 'fromandgo', 'airplane', 'startTime', 'startPlace', 'endTime', 'endPlace']
	search_fields = ['route']
	list_per_page = 20

class ClassificationAdmin(object):
	list_display = ['route', 'name']
	list_editable = ['name']
	search_fields = ['name']
	list_per_page = 20

class GoDateAdmin(object):
	list_display = ['classification', 'date', 'price', 'childPrice', 'left', 'childLeft']
	list_editable = ['date', 'price', 'childPrice', 'left', 'childLeft']
	search_fields = ['classification']
	list_per_page = 20

class RouteDetailAdmin(object):
	list_display = ['route', 'day', 'fromPlace', 'goType', 'endPlace']
	list_editable = ['day', 'fromPlace', 'goType', 'endPlace']
	search_fields = ['classification']
	list_per_page = 20
	style_fields = {'traffic':'ueditor', 'content':'ueditor'}

class OrderAdmin(object):
	list_display = ['orderID', 'user', 'route', 'username', 'phone', 'adult', 'child', 'amount', 'status', 'comment', 'date']
	list_editable = ['status']
	search_fields = ['orderID', 'username', 'phone']
	list_per_page = 20

class XadminUEditorWidget(UEditorWidget):
	def __init__(self,**kwargs):
		self.ueditor_options=kwargs
		self.Media.js = None
		super(XadminUEditorWidget,self).__init__(kwargs)

class UeditorPlugin(BaseAdminPlugin):
	def get_field_style(self, attrs, db_field, style, **kwargs):
		if style == 'ueditor':
			if isinstance(db_field, UEditorField):
				widget = db_field.formfield().widget
				param = {}
				param.update(widget.ueditor_settings)
				param.update(widget.attrs)
				return {'widget': XadminUEditorWidget(**param)}
			if isinstance(db_field, TextField):
				return {'widget': XadminUEditorWidget}
		return attrs
	def block_extrahead(self, context, nodes):
		js = '<script type="text/javascript" src="%s"></script>' % (settings.STATIC_URL + "ueditor/ueditor.config.js")
		js += '<script type="text/javascript" src="%s"></script>' % (settings.STATIC_URL + "ueditor/ueditor.all.min.js")
		nodes.append(js)

xadmin.site.register(views.CommAdminView, GlobalSetting)
xadmin.site.register_plugin(UeditorPlugin,DetailAdminView)
xadmin.site.register_plugin(UeditorPlugin,ModelFormAdminView)
xadmin.site.register(UserInfo,UserInfoAdmin)
xadmin.site.register(Destination,DestinationAdmin)
xadmin.site.register(SetOut,SetOutAdmin)
xadmin.site.register(Route,RouteAdmin)
xadmin.site.register(Addition,AdditionAdmin)
xadmin.site.register(RouteAirplane,RouteAirplaneAdmin)
xadmin.site.register(Classification,ClassificationAdmin)
xadmin.site.register(GoDate,GoDateAdmin)
xadmin.site.register(RouteDetail,RouteDetailAdmin)
xadmin.site.register(Order,OrderAdmin)