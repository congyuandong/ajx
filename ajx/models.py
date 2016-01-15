#coding:utf-8
from django.db import models
from DjangoUeditor.models import UEditorField
from django.conf import settings

SEX_CHOICES =(
	(0,u'男'),
	(1,u'女'),
	)

DEST_CHOICES =(
	(1,u'国内'),
	(2,u'国外'),
	)

TRAFFIC_CHOICES =(
	(0,u'飞机'),
	(1,u'游轮'),
	(2,u'火车'),
	(3,u'汽车'),
	)

YESORNO_CHOICES =(
	(0,u'否'),
	(1,u'是'),
	)

ROUTE_CHOICES =(
	(0,u'自由行'),
	(1,u'跟团游'),
	(2,u'半自由行'),
	(3,u'游轮'),
	(4,u'海岛'),
	(5,u'本地'),
	)

FEATURE_CHOICES =(
	(0,u'无'),
	(1,u'品质游'),
	(2,u'纯玩游'),
	(3,u'高端游'),
	(4,u'常规游'),
	(5,u'特价游'),
	(6,u'购物游'),
	)

ADDITION_CHOICES =(
	(0,u'保险'),
	(1,u'WIFI'),
	(2,u'本地游'),
	)

ISGO_CHOICES =(
	(1,u'去程'),
	(2,u'返程'),
	)

#用户表
class UserInfo(models.Model):
	account = models.CharField(max_length = 50, verbose_name = '账户')
	password = models.CharField(max_length = 20, verbose_name = '密码', null = True, blank = True)
	phone = models.CharField(max_length = 20, verbose_name = '手机号码', null = True, blank = True)
	email = models.CharField(max_length = 50, verbose_name = '邮箱', null = True, blank = True)
	nick = models.CharField(max_length = 50, verbose_name = '昵称', null = True, blank = True)
	sex = models.IntegerField(default=0,verbose_name='性别',choices=SEX_CHOICES)
	birthday = models.DateField(verbose_name='生日', null = True, blank = True)
	avater = models.ImageField(upload_to ='avater/',verbose_name='头像', null = True, blank = True)
	authid = models.CharField(max_length = 200, verbose_name = '第三方登录ID', null = True, blank = True)

	def __unicode__(self):
		return self.account

	class Meta:
		verbose_name = '用户'
		verbose_name_plural = '用户管理'

#出发地
class SetOut(models.Model):
	name = models.CharField(max_length = 50, verbose_name = '地名')
	sort =  models.IntegerField(default=0,verbose_name="排序")

	def __unicode__(self):
		return self.name

	class Meta:
		verbose_name = '线路出发地'
		verbose_name_plural = '目的地管理'

#路线目的地
class Destination(models.Model):
	name = models.CharField(max_length = 50, verbose_name = '地名')
	types = models.IntegerField(default = 1, verbose_name = '类型', choices = DEST_CHOICES)
	sort =  models.IntegerField(default = 0, verbose_name = "排序")

	def __unicode__(self):
		return self.name

	class Meta:
		verbose_name = '线路目的地'
		verbose_name_plural = '目的地管理'

#附加产品
class Addition(models.Model):
	name = models.CharField(max_length = 100, verbose_name = '附加产品名称')
	types = models.IntegerField(default = 0, verbose_name = '类型', choices = ADDITION_CHOICES)
	price = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name='价格')
	summary = UEditorField(verbose_name='产品介绍',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	sort =  models.IntegerField(default=0, verbose_name="排序")

	def __unicode__(self):
		return self.name

	class Meta:
		verbose_name = '附加产品'
		verbose_name_plural = '附加产品管理'

#线路表
class Route(models.Model):
	name = models.CharField(max_length = 200, verbose_name = '线路名称')
	code = models.CharField(max_length = 20, verbose_name = '线路编号')
	ifAct = models.IntegerField(default = 0, verbose_name = '是否上架', choices = YESORNO_CHOICES)
	pic = models.ImageField(upload_to ='route/', verbose_name = '详细页图片', help_text = '745*267')
	listPic = models.ImageField(upload_to ='route/', verbose_name = '列表页图片')
	summary = models.CharField(max_length = 200, verbose_name = '线路简介')
	supplyName = models.CharField(max_length = 100, verbose_name = '供应商名称')
	marketPrice = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name='市场价格')
	realPrice = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name='优惠价格')
	childPrice = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name='儿童价格', null = True, blank = True)
	destination = models.ForeignKey(Destination, verbose_name = '出发地')
	setOut = models.ForeignKey(SetOut, verbose_name = '目的地')
	addition = models.ManyToManyField(Addition, verbose_name = '附加产品', null = True, blank = True)
	goType = models.IntegerField(default = 0, verbose_name = '去程交通', choices = TRAFFIC_CHOICES)
	backType = models.IntegerField(default = 0, verbose_name = '返程交通', choices = TRAFFIC_CHOICES)
	origin = models.CharField(max_length = 200, verbose_name = '线路来源', help_text = '本产品由XXXX旅行社提供服务')
	singleRoom = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name = '单房价')
	needConfirm = models.IntegerField(default = 1, verbose_name = '二次确认', choices = YESORNO_CHOICES)
	types = models.IntegerField(default = 0, verbose_name = '线路类型', choices = ROUTE_CHOICES)
	feature = models.IntegerField(default = 0, verbose_name = '线路特色', choices = FEATURE_CHOICES)
 	adultLeft = models.IntegerField(default = 0, verbose_name = '成人余位')
	childLeft = models.IntegerField(default = 0, verbose_name = '儿童余位', null = True, blank = True)
	advance = models.IntegerField(default = 3, verbose_name = '报名提前天数')
	day = models.IntegerField(default = 0, verbose_name = '出游天数(白天)')
	night = models.IntegerField(default = 0, verbose_name = '出游天数(夜晚)')
	hotelStar = models.IntegerField(default = 0, verbose_name = '酒店星级', null=True,blank=True)
	hotel = UEditorField(verbose_name='参考住宿',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	supplier = UEditorField(verbose_name='供应商信息',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	detail = UEditorField(verbose_name='产品详情',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	cost = UEditorField(verbose_name='费用说明',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	ship = UEditorField(verbose_name='轮船信息',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	traffic = UEditorField(verbose_name='参考交通',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	visa = UEditorField(verbose_name='签证信息',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	notice = UEditorField(verbose_name='订购须知',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	netsign = UEditorField(verbose_name='网签协议',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000},null=True,blank=True)
	update = models.DateTimeField(verbose_name = '更新日期', auto_now = True)

	def __unicode__(self):
		return self.name

	class Meta:
		verbose_name = '线路'
		verbose_name_plural = '线路管理'

#航班信息
class RouteAirplane(models.Model):
	route = models.ForeignKey(Route, verbose_name = '路线')
	isgo = models.IntegerField(default = 1, verbose_name = '方向', choices = ISGO_CHOICES)
	fromandgo = models.CharField(max_length = 200, verbose_name = '航班路线', help_text = '出发地-目的地')
	airplane = models.CharField(max_length = 50, verbose_name = '航班号')
	startTime = models.DateTimeField(verbose_name = '起飞时间')
	startPlace = models.CharField(max_length = 100, verbose_name = '起飞机场')
	endTime = models.DateTimeField(verbose_name = '降落时间')
	endPlace = models.CharField(max_length = 100, verbose_name = '降落机场')

	def __unicode__(self):
		return self.fromandgo

	class Meta:
		verbose_name = '航班信息'
		verbose_name_plural = '航班信息管理'

#套餐
class Classification(models.Model):
	route = models.ForeignKey(Route, verbose_name = '路线')
	name = models.CharField(max_length = 200, verbose_name = '套餐名称')
	sort =  models.IntegerField(default=0,verbose_name="排序")

	def __unicode__(self):
		return self.name

	class Meta:
		verbose_name = '线路套餐'
		verbose_name_plural = '套餐管理'

#出行日期管理
class GoDate(models.Model):
	classification = models.ForeignKey(Classification, verbose_name = '套餐')
	date = models.DateField(verbose_name = '出行日期')
	price = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name='成人价格')
	childPrice = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name='儿童价格')
	left = models.IntegerField(default = 0, verbose_name = '成人余位')
	childLeft = models.IntegerField(default = 0, verbose_name = '儿童余位')

	def __unicode__(self):
		return self.classification.name + u'出行日期'

	class Meta:
		verbose_name = '出行日期'
		verbose_name_plural = '出行日期管理'

#参考行程安排
class RouteDetail(models.Model):
	route = models.ForeignKey(Route, verbose_name = '路线')
	day = models.IntegerField(default = 0, verbose_name = '第几天')
	fromPlace = models.CharField(max_length = 100, verbose_name = '出发地')
	goType = models.IntegerField(default = 0, verbose_name = '交通方式', choices = TRAFFIC_CHOICES)
	endPlace = models.CharField(max_length = 100, verbose_name = '目的地')
	breakfast = models.CharField(max_length = 100, verbose_name = '早餐')
	lunch = models.CharField(max_length = 100, verbose_name = '午餐')
	dinner = models.CharField(max_length = 100, verbose_name = '晚餐')
	hotel = models.CharField(max_length = 100, verbose_name = '住宿')
	traffic = UEditorField(verbose_name='参考交通',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000})
	content = UEditorField(verbose_name='行程安排',imagePath="ueditor/images/",
        filePath="ueditor/files/",settings=settings.UEDITOR_SETTINGS['config'],
		upload_settings={'imageMaxSize':2048000})

	def __unicode__(self):
		return self.route.name + u'第' + str(self.day) + u'天行程'

	class Meta:
		verbose_name = '行程'
		verbose_name_plural = '行程安排'

#线路订单
class Order(models.Model):
	orderID = models.CharField(max_length = 20, verbose_name = '编号')
	user = models.ForeignKey(UserInfo, verbose_name = '用户')
	route = models.ForeignKey(Route, verbose_name = '路线')
	adult = models.IntegerField(default = 0, verbose_name = '成人数')
	child = models.IntegerField(default = 0, verbose_name = '儿童数')
	amount = models.DecimalField(max_digits = 12, decimal_places = 2, verbose_name='总价')
	status = models.IntegerField(default = 0, verbose_name = '订单状态')
	username = models.CharField(max_length = 50, verbose_name = '用户姓名')
	phone = models.CharField(max_length = 20, verbose_name = '电话号码')
	email = models.CharField(max_length = 200, verbose_name = '邮箱')
	comment = models.CharField(max_length = 500, verbose_name = '留言')
	classification = models.ForeignKey(Classification, verbose_name = '套餐')
	date = models.DateField(verbose_name = '出行日期')
	goDate = models.ForeignKey(GoDate, verbose_name = '出行日期')
	time = models.DateTimeField(verbose_name = '下单时间')
	ifsingle = models.IntegerField(default = 0, verbose_name = '是否单房', choices = YESORNO_CHOICES)

	def __unicode__(self):
		return u'订单编号' + self.orderID

	class Meta:
		verbose_name = '订单'
		verbose_name_plural = '订单管理'

#首页滚动大图 前五个
class BannerSlide(models.Model):
	title = models.CharField(max_length = 100, verbose_name = '标题')
	image = models.ImageField(upload_to ='banner/', verbose_name = '图片', help_text = '大小742X237')
	link = models.URLField(verbose_name = '链接地址')
	sort =  models.IntegerField(default=0,verbose_name="排序")

	def __unicode__(self):
		return self.title

	class Meta:
		verbose_name = '横幅广告'
		verbose_name_plural = '横幅广告管理'

#首页横幅广告 最多五个
class BannerList(models.Model):
	title = models.CharField(max_length = 100, verbose_name = '标题')
	image = models.ImageField(upload_to ='banner/', verbose_name = '图片', help_text = '大小745X201')
	link = models.URLField(verbose_name = '链接地址')
	sort =  models.IntegerField(default=0,verbose_name="排序")

	def __unicode__(self):
		return self.title

	class Meta:
		verbose_name = '首页大图广告'
		verbose_name_plural = '首页大图广告管理'

#友情链接
class Links(models.Model):
	name = models.CharField(max_length = 100, verbose_name = '网站名称')
	link = models.URLField(verbose_name = '链接地址')
	sort =  models.IntegerField(default=0,verbose_name="排序")

	def __unicode__(self):
		return self.name

	class Meta:
		verbose_name = '友情链接'
		verbose_name_plural = '友情链接管理'

#系统基础信息
class SystemInfo(models.Model):
	name = models.CharField(max_length = 100, verbose_name = '网站名称')
	tel = models.CharField(max_length = 20, verbose_name = '客服电话')
	url = models.URLField(verbose_name = '域名地址')

	def __unicode__(self):
		return u'基础信息'

	class Meta:
		verbose_name = '系统参数'
		verbose_name_plural = '系统参数管理'