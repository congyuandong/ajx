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

xadmin.site.register(views.CommAdminView, GlobalSetting)

class UserInfoAdmin(object):
	list_display = ['account', 'phone', 'email', 'nick', 'sex', 'birthday']
	list_editable = ['phone', 'email', 'nick', 'sex', 'birthday']
	search_fields = ['account', 'phone', 'email', 'nick']
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

xadmin.site.register_plugin(UeditorPlugin,DetailAdminView)
xadmin.site.register_plugin(UeditorPlugin,ModelFormAdminView)
xadmin.site.register(UserInfo,UserInfoAdmin)