﻿using Mes.Client.Model.Parm;
using Mes.Client.Service;
using Mes.Client.Service.BE;
using Mes.Client.Utility;
using Mes.Client.Utility.Pages;
using MES.Libraries;
using System;
using System.Collections.Generic;
using System.Data;
using System.Reflection;
using System.Web;

namespace Mes.Client.UI.Ashx
{
    /// <summary>
    /// PartnerHandler 的摘要说明
    /// </summary>
    public class PartnerHandler : BaseHttpHandler
    {
        #region ===================初始加载=====================
        PartnerParm parm;
        public override void ProcessRequest(HttpContext context)
        {
            base.ProcessRequest(context);
            string method = Request["Method"] ?? "";

            if (!string.IsNullOrEmpty(method))
            {
                parm = new PartnerParm(context);
                foreach (MethodInfo mi in this.GetType().GetMethods())
                {
                    if (mi.Name.ToLower() == method.ToLower())
                    {
                        mi.Invoke(this, null);
                        break;
                    }
                }
            }
        }
        #endregion

        public void SearchPartners()
        {
            try
            {
                using (ProxyBE p = new ProxyBE())
                {
                    SearchPartnerArgs sargs = new SearchPartnerArgs();
                    sargs.OrderBy = "[Created] desc";
                    sargs.RowNumberFrom = pagingParm.RowNumberFrom;
                    sargs.RowNumberTo = pagingParm.RowNumberTo;

                    //Where
                    if (!string.IsNullOrEmpty(parm.PartnerCode))
                    {
                        sargs.PartnerCode = parm.PartnerCode;
                    }
                    if (!string.IsNullOrEmpty(parm.PartnerName))
                    {
                        sargs.PartnerName = parm.PartnerName;
                    }
                    if (!string.IsNullOrEmpty(parm.LinkMan))
                    {
                        sargs.LinkMan = parm.LinkMan;
                    }
                    if (!string.IsNullOrEmpty(parm.Tel))
                    {
                        sargs.Tel = parm.Tel;
                    }
                    if (!string.IsNullOrEmpty(parm.Mobile))
                    {
                        sargs.Mobile = parm.Mobile;
                    }
                    if (!string.IsNullOrEmpty(parm.Fax))
                    {
                        sargs.Fax = parm.Fax;
                    }
                    if (!string.IsNullOrEmpty(parm.Province))
                    {
                        sargs.Province = parm.Province;
                    }
                    if (!string.IsNullOrEmpty(parm.City))
                    {
                        sargs.City = parm.City;
                    }
                    if (!string.IsNullOrEmpty(parm.Address))
                    {
                        sargs.Address = parm.Address;
                    }
                    if (CurrentUser.PartnerID != Guid.Empty)
                    {
                        sargs.PartnerIDs = new List<Guid>();
                        sargs.PartnerIDs.Add(CurrentUser.PartnerID);
                    }
                    SearchResult sr = p.Client.SearchPartner(SenderUser, sargs);
                    Response.Write(JSONHelper.Dataset2Json(sr.DataSet));
                }
            }
            catch (Exception ex)
            {
                WriteError(ex.Message, ex);
                throw ex;
            }
        }


        public void GetPartner()
        {
            try
            {
                using (ProxyBE p = new ProxyBE())
                {
                    Guid custid = new Guid(Request["PartnerID"]);
                    Partner cust = p.Client.GetPartner(SenderUser, custid);
                    if (cust == null)
                    {
                        throw new Exception("所查找商户不存在。");
                    }
                    else
                    {
                        Response.Write(JSONHelper.Object2Json(cust));
                    }
                }
            }
            catch (Exception ex)
            {
                WriteError(ex.Message, ex);
            }
        }

        public void ModifyPartner()
        {
            try
            {
                using (ProxyBE p = new ProxyBE())
                {
                    Partner partner = p.Client.GetPartner(SenderUser, parm.PartnerID);
                    if (partner == null)
                    {
                        partner = new Partner();
                        partner.PartnerID = parm.PartnerID;
                    }
                    if (Request["Province"] == "")
                    {
                        throw new Exception("请选择省份");
                    }
                    if (Request["City"] == "请选择城市")
                    {
                        throw new Exception("请选择城市");
                    }
                    partner.CompanyID =new Guid();
                    partner.ShopType = parm.ShopType;
                    partner.PartnerCode = parm.PartnerCode.Trim();
                    partner.PartnerName = parm.PartnerName.Trim();
                    partner.LinkMan = parm.LinkMan.Trim();
                    partner.Mobile = parm.Mobile.Trim();
                    partner.Tel = parm.Tel.Trim();
                    partner.Remark = parm.Remark.Trim();
                    partner.Province = parm.Province;
                    partner.City = parm.City;

                    partner.ShopType =string.Empty;
                    partner.Email = string.Empty;
                    partner.ShopSize = 0;
                    partner.Fax = string.Empty;

                    partner.Address = parm.Address.Trim();
                    SavePartnerArgs args = new SavePartnerArgs();
                    args.Partner = partner;
                    p.Client.SavePartner(SenderUser, args);
                    WriteSuccess();
                }
            }
            catch (Exception ex)
            {
                WriteError(ex.Message, ex);
            }
        }

        public void SavePartner()
        {
            using (ProxyBE p = new ProxyBE())
            {
                try
                {
                    #region Partner
                    if (Request["Province"] == "")
                    {
                        throw new Exception("请选择省份");
                    }
                    if (Request["City"] == "请选择城市")
                    {
                        throw new Exception("请选择城市");
                    }
                    Partner Partner = new Partner();
                    Partner.CompanyID = new Guid();
                    Partner.PartnerID = parm.PartnerID;
                    Partner.PartnerCode = parm.PartnerCode.Trim();
                    Partner.PartnerName = parm.PartnerName.Trim();
                    Partner.LinkMan = parm.LinkMan.Trim();
                    Partner.Mobile = parm.Mobile.Trim();
                    Partner.Tel = parm.Tel.Trim();
                    Partner.Remark = parm.Remark.Trim();
                    Partner.Province = parm.Province;
                    Partner.City = parm.City;
                    Partner.Address = parm.Address.Trim();

                    Partner.ShopType = string.Empty;
                    Partner.Email = string.Empty;
                    Partner.ShopSize = 0;
                    Partner.Fax = string.Empty;

                    bool flag = p.Client.PartnerUserIsDuplicated(SenderUser, new PartnerUser() { UserCode = Partner.Mobile });
                    if (flag)
                    {
                        throw new Exception("手机号已注册");
                    }

                    SavePartnerArgs args = new SavePartnerArgs();
                    args.Partner = Partner;
                    p.Client.SavePartner(SenderUser, args);
                    #endregion

                    #region PartnerUser 
                    PartnerUser PartnerUser = new PartnerUser();

                    //PartnerUser.CompanyID = parm.CompanyID;
                    PartnerUser.UserID = Guid.NewGuid();
                    PartnerUser.Created = DateTime.Now;
                    PartnerUser.CreatedBy = SenderUser.UserCode + "." + SenderUser.UserName;
                    PartnerUser.Modified = DateTime.Now;
                    PartnerUser.ModifiedBy = SenderUser.UserCode + "." + SenderUser.UserName;

                    //admin经销商默认密码 123456
                    PartnerUser.Password = MES.Libraries.CEncrypt.EncryptString(UserDefaultPassword);
                    //int num = p.Client.GetIncrease(SenderUser, "admin");
                    // PartnerUser.UserCode = "admin" +num.ToString("#000");
                    PartnerUser.UserCode = Partner.Mobile;
                    PartnerUser.UserName = parm.LinkMan;
                    PartnerUser.PartnerID = parm.PartnerID;
                    PartnerUser.Sex = "男";
                    PartnerUser.Position = "管理员";
                    PartnerUser.Email = "";
                    PartnerUser.Mobile = parm.Mobile.Trim();
                    PartnerUser.Description = "管理员";
                    PartnerUser.LoginErrorCount = 0;
                    PartnerUser.IsDisabled = false;
                    PartnerUser.IsLocked = false;
                    PartnerUser.IsSystem = true;
                    PartnerUser.MemberClass = -1;
                    bool flag2 = p.Client.PartnerUserIsDuplicated(SenderUser, PartnerUser);
                    if (flag2)
                    {
                        throw new Exception("服务器忙,请稍候再试");
                    }
                    SavePartnerUserArgs pargs = new SavePartnerUserArgs();
                    pargs.PartnerUser = PartnerUser;
                    p.Client.SavePartnerUser(SenderUser, pargs);
                    #endregion

                    WriteSuccess();
                }
                catch (Exception ex)
                {
                    WriteError(ex.Message, ex);
                }
            }
        }
    }
}