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
        SearchResult SearchOrderMadeSate(Sender sender, SearchOrderMadeStateArgs args);
        [OperationContract]
        List<OrderMadeState> GetOrderMadeStates(Sender sender, Guid OrderID);
    }
}
