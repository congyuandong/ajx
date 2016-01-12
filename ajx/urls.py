from django.conf.urls import patterns, url, include
import views

urlpatterns = patterns('',
	url(r'^$', views.Index, name='Index'),
	url(r'^index/$', views.Index, name='Index'),
	url(r'^made/$', views.Made, name='Made'),
	url(r'^north/$', views.North, name='North'),
	url(r'^nd/$', views.NorthDetail, name='NorthDetail'),
	url(r'^route/$', views.RouteDetail, name='RouteDetail'),
	)