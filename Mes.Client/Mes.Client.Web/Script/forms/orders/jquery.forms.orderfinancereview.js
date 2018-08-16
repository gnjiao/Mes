﻿//(function ($) {
'use strict';
document.msCapsLockWarningOff = true;
var editIndex = undefined;
var orderReviewForm = {
    init: function () {
        orderReviewForm.initControls();
        orderReviewForm.controls.searchData.on('click', function () { orderReviewForm.controls.dgdetail.datagrid('reload'); });//加载数据            
        orderReviewForm.events.loadGrid();
        orderReviewForm.controls.revieworder_submit.on('click', orderReviewForm.events.revieworder_submit);//审核保存  
        orderReviewForm.controls.review_reject.on('click', orderReviewForm.events.review_reject);//审核关闭  
        orderReviewForm.events.verifyright();
    },
    initControls: function () {
        orderReviewForm.controls = {
            pid: getUrlParam('pid'),
            dgdetail: $('#dgdetail'),//填充数据              
            searchData: $('#btn_search_ok'),
            search_form: $('#search_form'),//查询表单
            review_window: $('#review_window'),
            review_form: $('#review_form'),
            revieworder_submit: $('#btn_review_ok'),//审核
            review_reject: $('#btn_review_reject'),//拒绝        
            steps_window: $('#steps_window')
        }
        $('#btn_search_ok').linkbutton()

        //订货日期
        $('#BookingDate').datebox({
            onSelect: function (date) {
                $("#ShipDate").datebox("setValue", '');
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                var d = date.getDate();
                var SelectDay = y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);

                var mydate = new Date();
                var yy = mydate.getFullYear();
                var mm = mydate.getMonth() + 1;
                var dd = mydate.getDate();
                var NowDay = yy + '-' + (mm < 10 ? ('0' + mm) : mm) + '-' + (dd < 10 ? ('0' + dd) : dd);
                if (SelectDay > NowDay) {
                    alert("订货日期必须是：" + NowDay + ",或者之前的日期，请重新选择！");
                    $("#BookingDate").datebox("setValue", '');
                }
            }
        });
        //交货日期
        $('#ShipDate').datebox({
            onSelect: function (date) {
                var BookingDate = "";
                BookingDate = $("#BookingDate").datebox("getValue");
                if (BookingDate == "") {
                    alert("请选择订货日期！");
                    return;
                }
                var ShipDate = $("#ShipDate").datebox("getValue");
                var bookingTemp = BookingDate.split("-");
                var bDate = new Date(bookingTemp[0] + '-' + bookingTemp[1] + '-' + bookingTemp[2]); //转换为MM-DD-YYYY格式    
                var shipTemp = ShipDate.split("-");
                var sDate = new Date(shipTemp[0] + '-' + shipTemp[1] + '-' + shipTemp[2]); //转换为MM-DD-YYYY格式  
                var iDays = parseInt(Math.abs(sDate - bDate) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
                if (iDays < 30) {
                    alert("交货日期必须为订货日期的30天之后！");
                    $("#ShipDate").datebox("setValue", '');
                }
            }
        });
    },
    events: {
        //初始化数据 
        loadGrid: function () {
            orderReviewForm.controls.dgdetail.datagrid({
                sortName: 'Created',
                idField: 'OrderID',
                url: '/ashx/ordershandler.ashx?Method=SearchOrders&Review=true&' + jsNC(),
                collapsible: false,
                fitColumns: true,
                pagination: true,
                striped: false,   //设置为true将交替显示行背景。
                pageSize: 20,
                singleSelect: false,
                columns: [[
                 //{ field: 'cp', checkbox: true },
                 {
                     field: 'OrderNo', title: '订单编号', width: 120, align: 'center', formatter: function (value, rowData, rowIndex) {
                         var strReturn = '<a href="javascript:void(0)" class="l-btn-text" title="查看详细" onClick="showdetail(\'' + rowData['OrderID'] + '\',\'' + rowData['OrderNo'] + '\');">' + rowData['OrderNo'] + '</a>';
                         return strReturn;
                     }
                 },
                { field: 'OutOrderNo', title: '外部订单号', width: 105, sortable: false, align: 'center' },
                { field: 'PurchaseNo', title: '采购单号', width: 105, sortable: false, align: 'center' },
                { field: 'CabinetType', title: '产品类型', width: 60, sortable: false, align: 'center' },
                { field: 'OrderType', title: '订单类型', width: 60, sortable: false, align: 'center' },
                { field: 'CustomerName', title: '客户名称', width: 85, sortable: false, align: 'center', halign: 'center' },               
                //{ field: 'Address', title: '客户地址', width: 220, sortable: false, align: 'center', halign: 'center' },
                { field: 'LinkMan', title: '联系人', width: 75, sortable: false, align: 'center' },
                { field: 'Mobile', title: '联系电话', width: 95, sortable: false, align: 'center' },
                {
                    field: 'BookingDate', title: '订货日期', width: 85, hidden: false, sortable: false, align: 'center', formatter: function (value, rowData, rowIndex) {
                        if (value == undefined) return "";
                        return (new Date(value.replace(/-/g, "/"))).Formats("yyyy-MM-dd");
                    }
                },
                {
                    field: 'ShipDate', title: '交货日期', width: 85, sortable: false, align: 'center', formatter: function (value, rowData, rowIndex) {
                        if (value == undefined) return "";
                        return (new Date(value.replace(/-/g, "/"))).Formats("yyyy-MM-dd");
                    }
                },
                //{
                //    field: 'Created', title: '创建时间', width: 120, hidden: true, sortable: false, align: 'center', formatter: function (value, rowData, rowIndex) {
                //        if (value == undefined) return "";
                //        return (new Date(value.replace(/-/g, "/"))).Formats("yyyy-MM-dd hh:mm");
                //    }
                //},
                {
                    field: 'IsStandard', title: '是否正标', width: 60, sortable: false, align: 'center', formatter: function (value, rowData, rowIndex) {
                        if (value == undefined) return "";
                        if (value == "True")
                            return "是";
                        else
                            return "否";
                    }
                },
                //{
                //    field: 'IsOutsourcing', title: '是否外购', width: 60, sortable: false, align: 'center', formatter: function (value, rowData, rowIndex) {
                //        if (value == undefined) return "";
                //        if (value == "True")
                //            return "是";
                //        else
                //            return "否";
                //    }
                //},

                {
                    field: 'Status', title: '订单状态', width: 60, align: 'center', formatter: function (value, rowData, rowIndex) {
                        var strReturn = '<a href="javascript:void(0)" class="l-btn-text" title="审核明细" onClick="loadstep(\'' + rowData['OrderID'] + '\');"><span style="color:#0094ff;">' + GetOrderStatusName(rowData['Status']) + '</span></a>';
                        return strReturn;
                    }
                }
                ]],
                toolbar: [
                    //{ text: '财务审核', iconCls: 'icon-add', handler: orderReviewForm.events.orderreview },
                ],
                onBeforeLoad: function (param) {
                    orderReviewForm.controls.search_form.find('select').each(function (index) {
                        param[this.name] = $(this).val();
                    });
                    orderReviewForm.controls.search_form.find('input').each(function (index) {
                        if (this.name != "")
                            param[this.name] = $(this).val();
                    });
                }
            });
        },

        orderreview: function () {
            var selRows = orderReviewForm.controls.dgdetail.datagrid('getChecked');
            if (!selRows.length) {
                showError('请选择待审核的订单。');
                return;
            }
            orderReviewForm.controls.review_window.window('open');
            $('#Remark').val(''); //清空textarea
        },

        //拒绝
        review_reject: function () {
            var selRows = orderReviewForm.controls.dgdetail.datagrid('getChecked');
            var orderids = [];
            $.each(selRows, function (index, item) {
                orderids.push(item.OrderID);
            });
            if (orderids == "") {
                return;
            }
            else {
                orderReviewForm.controls.review_form.find('#OrderIDs').val(orderids.join(','));
            }
            if (orderReviewForm.controls.review_form.form('validate')) {
                $.ajax({
                    url: '/ashx/ordershandler.ashx?Method=RejectFinanceOrder',
                    data: orderReviewForm.controls.review_form.serialize(),
                    success: function (returnData) {
                        if (returnData) {
                            if (returnData.isOk == 0) {
                                showError(returnData.message);
                            }
                            else {
                                orderReviewForm.controls.dgdetail.datagrid('reload');
                                orderReviewForm.controls.review_window.window('close');
                                $('#Remark').val(''); //清空textarea
                            }
                        }
                    }
                });
            }
        },

        //审核提交
        revieworder_submit: function () {
            var selRows = orderReviewForm.controls.dgdetail.datagrid('getChecked');
            var orderids = [];
            $.each(selRows, function (index, item) {
                orderids.push(item.OrderID);
            });
            if (orderids == "") {
                return;
            }
            else {
                orderReviewForm.controls.review_form.find('#OrderIDs').val(orderids.join(','));
            }

            if (orderReviewForm.controls.review_form.form('validate')) {
                $.ajax({
                    url: '/ashx/ordershandler.ashx?Method=FinanceReview',
                    data: orderReviewForm.controls.review_form.serialize(),
                    success: function (returnData) {
                        if (returnData) {
                            if (returnData.isOk == 0) {
                                showError(returnData.message);
                            }
                            else {
                                orderReviewForm.controls.dgdetail.datagrid('reload');
                                orderReviewForm.controls.review_window.window('close');
                                $('#Remark').val(''); //清空textarea
                            }
                        }
                    }
                });
            }

        },

        //获取权限
        verifyright: function () {
            $.ajax({
                url: '/ashx/verifyright.ashx?Method=GetRight&pid=' + orderReviewForm.controls.pid,
                success: function (data) {
                    if (data) {
                        rightType(data);
                    }
                }
            });
        }
    }
};

function rightType(data) {
    $('div.datagrid-toolbar a').eq(0).hide();
    $('div.datagrid-toolbar div').eq(0).hide(); //隐藏第一条分隔线

    $(data).each(function (i, obj) {
        switch (obj.PrivilegeItemCode) {
            case 'FinanceReview':
                $('div.datagrid-toolbar a').eq(0).show();
                $('div.datagrid-toolbar div').eq(0).show(); //隐藏第三条分隔线
                break;
            default: break;
        }
    });
}
$(function () {
    orderReviewForm.init();
});

//})(jQuery); 

function showdetail(id,no) {
    var pid = getUrlParam('pid');
    top.addTab("查看【" + no + "】", "/View/orders/ordersreview.aspx?OrderID=" + id + "&OrderFinanceReviewPid=" + pid);
}

//加载审核明细
function loadstep(orderid) {
    $('#steps_window').window('open');
    $('#dgsteps').datagrid({
        sortName: 'StepNo',
        idField: 'OrderID',
        url: '/ashx/ordershandler.ashx?Method=GetStepsByOrder&OrderID=' + orderid,
        collapsible: false,
        fitColumns: true,
        pagination: true,
        striped: false,   //设置为true将交替显示行背景。
        pageSize: 20,
        loadMsg: '正在加载数据，请稍候....',
        columns: [[
        { field: 'Action', title: '发起步骤', width: 120, sortable: false, align: 'center' },
        { field: 'TargetStep', title: '目标步骤', width: 150, sortable: false, halign: 'center', align: 'center' },
        { field: 'StartedBy', title: '提交人', width: 150, sortable: false, halign: 'center', align: 'center' },
        {
            field: 'Started', title: '提交时间', width: 150, sortable: false, align: 'center', formatter: function (value, rowData, rowIndex) {
                if (value == undefined)
                    return "";
                var date = new Date(+new Date(value) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                return date;
            }
        },
        { field: 'EndedBy', title: '处理人', width: 120, sortable: false, align: 'center' },
        {
            field: 'Ended', title: '处理时间', width: 150, sortable: false, align: 'center', formatter: function (value, rowData, rowIndex) {
                if (value == undefined)
                    return "";
                var date = new Date(+new Date(value) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
                return date;
            }
        },
        { field: 'Remark', title: '审核意见', width: 120, sortable: false, align: 'center' }
        ]],
        onBeforeLoad: function (param) {

        }
    });
    for (var i = 0; i < 20; i++) {
        $('#dgsteps').datagrid('reload');
    }
}