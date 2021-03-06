from django.conf.urls import patterns, url, include
import views
import libs

urlpatterns = patterns('',
    url(r'^$', views.Index, name='Index'),
    url(r'^index/$', views.Index, name='Index'),
    url(r'^search/$', views.Search, name='Search'),
    url(r'^made/$', views.Made, name='Made'),
    url(r'^north/$', views.North, name='North'),
    url(r'^nd/(\d+)$', views.NorthDetail, name='NorthDetail'),
    url(r'^route/(\d+)$', views.RouteDetailPage, name='RouteDetailPage'),
    url(r'^calendar/y(\d+)m(\d+)c(\d+)$', views.RouteCalendar, name='RouteCalendar'),
    url(r'^code/$',libs.GetRandomCode, name='GetRandomCode'),
    url(r'^mcode/$',libs.SendMailCode, name='SendMailCode'),
    url(r'^login/$',libs.Login, name='Login'),
    url(r'^qlogin/$',libs.QuickLogin, name='QuickLogin'),
    url(r'^logout/$',libs.Logout, name='Logout'),
    url(r'^reg/$',libs.Reg, name='Reg'),
    url(r'^snslogin/(.+)$',libs.SNSLogin, name='SNSLogin'),
    url(r'^confirm/$',views.OrderConfirm, name='OrderConfirm'),
    url(r'^order/$',views.RouteOrder, name='RouteOrder'),
    url(r'^main/$',views.Main, name='Main'),
    url(r'^about/(\w+)$',views.About, name='About'),
    )