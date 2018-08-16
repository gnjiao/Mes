﻿using Mes.BE.Objects;
using MES.Libraries;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace Mes.BE.Services
{
    public partial interface IServiceBE
    {
        [OperationContract]
        PartnerRole2PrivilegeItem GetPartnerRole2PrivilegeItem(Sender sender, Guid RoleID, Guid PrivilegeItemID);
    }
}
