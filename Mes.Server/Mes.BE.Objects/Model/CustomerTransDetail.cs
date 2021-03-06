﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Runtime.Serialization;

using MES.Libraries;

namespace Mes.BE.Objects
{
	/// <summary>
	/// 代码工具生成，不可以手工修改。2017-09-22 15:42:17。
	/// </summary>
	[Serializable]
	[DataContract(Name = "CustomerTransDetail")]
	public class CustomerTransDetail
	{
		public CustomerTransDetail()
		{
		}
		
		/// <summary>
		///
		/// </summary>
		[DataMember(Name = "TransID")]
		public Guid TransID
		{
			get;
			set;
		}
		
		/// <summary>
		///
		/// </summary>
		[DataMember(Name = "QuoteID")]
		public Guid QuoteID
		{
			get;
			set;
		}
		
		/// <summary>
		///客户编号
		/// </summary>
		[DataMember(Name = "CustomerID")]
		public Guid CustomerID
		{
			get;
			set;
		}
		
		/// <summary>
		///交易日期
		/// </summary>
		[DataMember(Name = "TransDate")]
		public DateTime TransDate
		{
			get;
			set;
		}
		
		/// <summary>
		///金额
		/// </summary>
		[DataMember(Name = "Amount")]
		public decimal Amount
		{
			get;
			set;
		}
		
		/// <summary>
		///凭证号
		/// </summary>
		[DataMember(Name = "VoucherNo")]
		public string VoucherNo
		{
			get;
			set;
		}
		
		/// <summary>
		///收款人
		/// </summary>
		[DataMember(Name = "Payee")]
		public string Payee
		{
			get;
			set;
		}
		
		/// <summary>
		///
		/// </summary>
		[DataMember(Name = "Created")]
		public DateTime Created
		{
			get;
			set;
		}
		
		/// <summary>
		///
		/// </summary>
		[DataMember(Name = "CreatedBy")]
		public string CreatedBy
		{
			get;
			set;
		}
	}
}
