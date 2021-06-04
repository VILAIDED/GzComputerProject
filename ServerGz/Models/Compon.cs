//using System.Text.Json.Serialization;
using Newtonsoft.Json;
namespace ServerGz.Models
{
    public class Compon
    {
        public int id { get; set; }
        public string typeCpu { get; set; }
        public double sizeScreen { get; set; }
        public string typeDisk { get; set; }
        public double sizeDisk { get; set; }
        public double sizeRam { get; set; }
        public double sizePin { get; set; }
        public double weight { get; set; }
        public string image { get; set; }

        public int computerId { get; set; }

       [JsonIgnore]
        public Computer computer { get; set; }
    }
}