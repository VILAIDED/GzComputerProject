using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using ServerGz.Models;
using Newtonsoft.Json;
using ServerGz.Data;
using System;
using Microsoft.AspNetCore.Authorization;

using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Rendering;
using System.IO;


namespace GzWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly GzDbContext _context;

        public BillController(GzDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        public IActionResult AddBill(Bill bill)
        {
            bill.accountName = User.Identity.Name;
           
            _context.Bill.Add(bill);
            _context.SaveChangesAsync();

            string json = HttpContext.Session.GetString("Cart");
            var itemList = JsonConvert.DeserializeObject<List<Item>>(json);

            foreach (Item item in itemList)
            {
                BillInfo billInfo = new BillInfo()
                {
                    billId = bill.id,
                    computerId = item.computer.id,
                    price = item.computer.price,
                    quanLiTy = item.quanLiTy
                };

                _context.BillInfo.Add(billInfo);
                _context.SaveChangesAsync();
                HttpContext.Session.Clear();
            }

            return NoContent();
        }

        [HttpGet]
        [Authorize]
        public IEnumerable<Bill> GetBill()
        {
            
            Console.WriteLine(User.Identity.Name);
        
            return _context.Bill.Where(i => i.accountName == User.Identity.Name);
        }

    }
}