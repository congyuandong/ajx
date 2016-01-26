from django.conf.urls import patterns, url, include
import views

urlpatterns = patterns('',
	url(r'^$', views.Index, name='Index'),
	url(r'^index/$', views.Index, name='Index'),
	url(r'^made/$', views.Made, name='Made'),
	url(r'^north/$', views.North, name='North'),
	url(r'^nd/$', views.NorthDetail, name='NorthDetail'),
	url(r'^route/(\d+)$', views.RouteDetailPage, name='RouteDetailPage'),
	url(r'^calendar/y(\d+)m(\d+)c(\d+)$', views.RouteCalendar, name='RouteCalendar'),
	url(r'^code/$',views.GetRandomCode, name='GetRandomCode'),
	url(r'^login/$',views.Login, name='Login'),
	url(r'^logout/$',views.Logout, name='Logout'),
	)