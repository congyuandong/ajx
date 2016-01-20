#coding:utf-8
import xadmin
from xadmin import views
from models import *

from DjangoUeditor.models import UEditorField
from DjangoUeditor.widgets import UEditorWidget
from xadmin.views import BaseAdminPlugin, ModelFormAdminView, DetailAdminView
from django.conf import settings
from django.db.models import TextField

class GlobalSetting(object):
	#设置base_site.html的Title
	site_title = '在旅行后台管理系统'

	def get_site_menu(self):
		return (
				{'title': '线路管理','menus':(
					{'title': '线路管理', 'icon': 'fa fa-train', 'url': self.get_model_url(Route, 'changelist')},
					{'title': '参考行程', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(RouteDetail, 'changelist')},
					{'title': '套餐管理', 'icon': 'fa fa-shopping-basket', 'url': self.get_model_url(Classification, 'changelist')},
					{'title': '出发日期', 'icon': 'fa fa-calendar', 'url': self.get_model_url(GoDate, 'changelist')},
					{'title': '出发地', 'icon': 'fa fa-location-arrow', 'url': self.get_model_url(SetOut, 'changelist')},
					{'title': '目的地', 'icon': 'fa fa-map-marker', 'url': self.get_model_url(Destination, 'changelist')},
					{'title': '附加产品', 'icon': 'fa fa-cutlery', 'url': self.get_model_url(Addition, 'changelist')},
					{'title': '航班信息', 'icon': 'fa fa-plane', 'url': self.get_model_url(RouteAirplane, 'changelist')},
				)},
				{'title': '订单管理 ','menus':(
					{'title': '线路订单', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(Order, 'changelist')},
					{'title': '定制订单', 'icon': 'fa fa-suitcase', 'url': self.get_model_url(MadeOrder, 'changelist')},
				)},
				{'title': '用户管理','menus':(
					{'title': '用户管理', 'icon': 'fa fa-user', 'url': self.get_model_url(UserInfo, 'changelist')},
				)},
				{'title': '定制管理','menus':(
					{'title': '出发地', 'icon': 'fa fa-location-arrow', 'url': self.get_model_url(MadeSetOut, 'changelist')},
					{'title': '目的地(境内)', 'icon': 'fa fa-map-marker', 'url': self.get_model_url(MadeDest, 'changelist')},
					{'title': '目的地(境外)', 'icon': 'fa fa-map-marker', 'url': self.get_model_url(MadeDestOut, 'changelist')},
					{'title': '出行方式', 'icon': 'fa fa-user', 'url': self.get_model_url(MadeTravelType, 'changelist')},
					{'title': '出行预算', 'icon': 'fa fa-user', 'url': self.get_model_url(MadeBudget, 'changelist')},
				)},
				{'title': '系统维护','menus':(
					{'title': '横幅广告', 'icon': 'fa fa-picture-o', 'url': self.get_model_url(BannerSlide, 'changelist')},
					{'title': '首页大图', 'icon': 'fa fa-file-image-o', 'url': self.get_model_url(BannerList, 'changelist')},
					{'title': '友情链接', 'icon': 'fa fa-link', 'url': self.get_model_url(Links, 'changelist')},
				)},
			)

class RouteAdmin(object):
	list_display = ['name', 'ifAct', 'marketPrice', 'realPrice', 'destination', 'setOut', 'adultLeft', 'day', 'night']
	list_editable = ['name', 'ifAct', 'marketPrice', 'realPrice', 'destination', 'setOut', 'adultLeft', 'day', 'night']
	style_fields = {'supplier':'ueditor', 'detail':'ueditor', 'cost':'ueditor', 'ship':'ueditor', 'traffic':'ueditor', 'visa':'ueditor', 'notice':'ueditor', 'netsign':'ueditor', 'hotel':'ueditor'}
	search_fields = ['name']
	list_per_page = 20
	ordering = ['-update']

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
	ordering = ['types', 'sort']

class AdditionAdmin(object):
	list_display = ['name', 'types', 'price', 'sort']
	list_editable = ['name', 'types', 'price', 'sort']
	search_fields = ['name']
	style_fields = {'summary':'ueditor'}
	list_per_page = 20
	ordering = ['sort']

class RouteAirplaneAdmin(object):
	list_display = ['route', 'isgo', 'fromandgo', 'airplane', 'startTime', 'startPlace', 'endTime', 'endPlace', 'sort']
	list_editable = ['isgo', 'fromandgo', 'airplane', 'startTime', 'startPlace', 'endTime', 'endPlace', 'sort']
	search_fields = ['route']
	list_per_page = 20
	ordering = ['route', 'isgo', 'sort']

class ClassificationAdmin(object):
	list_display = ['route', 'name', 'sort']
	list_editable = ['name', 'sort']
	list_filter = ['route']
	search_fields = ['name']
	ordering = ['sort']
	list_per_page = 20

class GoDateAdmin(object):
	list_display = ['classification', 'date', 'price', 'childPrice', 'left', 'childLeft']
	list_editable = ['date', 'price', 'childPrice', 'left', 'childLeft']
	search_fields = ['classification']
	list_per_page = 20

class RouteDetailAdmin(object):
	list_display = ['route', 'day', 'fromPlace', 'goType', 'endPlace', 'sort']
	list_editable = ['day', 'fromPlace', 'goType', 'endPlace', 'sort']
	search_fields = ['classification']
	ordering = ['sort']
	list_per_page = 20
	style_fields = {'traffic':'ueditor', 'content':'ueditor'}

class OrderAdmin(object):
	list_display = ['orderID', 'user', 'route', 'username', 'phone', 'adult', 'child', 'amount', 'status', 'comment', 'date']
	list_editable = ['status']
	search_fields = ['orderID', 'username', 'phone']
	list_per_page = 20

class BannerSlideAdmin(object):
	list_display = ['title', 'link', 'sort']
	list_editable = ['link', 'sort']
	search_fields = ['title']
	list_per_page = 20
	ordering = ['sort']

class BannerListAdmin(object):
	list_display = ['title', 'link', 'sort']
	list_editable = ['link', 'sort']
	search_fields = ['title']
	list_per_page = 20
	ordering = ['sort']

class LinksAdmin(object):
	list_display = ['name', 'link', 'sort']
	list_editable = ['name', 'link', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class MadeSetOutAdmin(object):
	list_display = ['name', 'types', 'sort']
	list_editable = ['name', 'types', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class MadeDestAdmin(object):
	list_display = ['name', 'types', 'sort']
	list_editable = ['name', 'types', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class MadeDestOutAdmin(object):
	list_display = ['name', 'types', 'sort']
	list_editable = ['name', 'types', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class MadeTravelTypeAdmin(object):
	list_display = ['name', 'sort']
	list_editable = ['name', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class MadeBudgetAdmin(object):
	list_display = ['name', 'sort']
	list_editable = ['name', 'sort']
	search_fields = ['name']
	list_per_page = 20
	ordering = ['sort']

class MadeOrderAdmin(object):
	list_display = ['name', 'tel', 'dest', 'setout', 'date', 'persons', 'days', 'budget']
	search_fields = ['name', 'tel']
	list_per_page = 20
	ordering = ['-update']

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
xadmin.site.register(BannerSlide,BannerSlideAdmin)
xadmin.site.register(BannerList,BannerListAdmin)
xadmin.site.register(Links,LinksAdmin)
xadmin.site.register(MadeSetOut,MadeSetOutAdmin)
xadmin.site.register(MadeDest,MadeDestAdmin)
xadmin.site.register(MadeDestOut,MadeDestOutAdmin)
xadmin.site.register(MadeTravelType,MadeTravelTypeAdmin)
xadmin.site.register(MadeBudget,MadeBudgetAdmin)
xadmin.site.register(MadeOrder,MadeOrderAdmin)