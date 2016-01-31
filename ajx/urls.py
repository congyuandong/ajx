from django.conf.urls import patterns, url, include
import views
import libs

urlpatterns = patterns('',
	url(r'^$', views.Index, name='Index'),
	url(r'^index/$', views.Index, name='Index'),
	url(r'^made/$', views.Made, name='Made'),
	url(r'^north/$', views.North, name='North'),
	url(r'^nd/$', views.NorthDetail, name='NorthDetail'),
	url(r'^route/(\d+)$', views.RouteDetailPage, name='RouteDetailPage'),
	url(r'^calendar/y(\d+)m(\d+)c(\d+)$', views.RouteCalendar, name='RouteCalendar'),
	url(r'^code/$',libs.GetRandomCode, name='GetRandomCode'),
	url(r'^mcode/$',libs.SendMailCode, name='SendMailCode'),
	url(r'^login/$',libs.Login, name='Login'),
	url(r'^qlogin/$',libs.QuickLogin, name='QuickLogin'),
	url(r'^logout/$',libs.Logout, name='Logout'),
	url(r'^reg/$',libs.Reg, name='Reg'),
	)