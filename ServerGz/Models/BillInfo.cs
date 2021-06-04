using System.Text.Json;
using Newtonsoft.Json;

namespace ServerGz.Models
{
    public class BillInfo
    {
        public int id {get;set;}
        
        public int billId {get;set;}
        public int computerId {get;set;}

        public double price {get;set;}
        public int quanLiTy {get;set;}

        [JsonIgnore]
        public Bill Bill {get;set;}
        public Computer Computer {get;set;}
    }
}