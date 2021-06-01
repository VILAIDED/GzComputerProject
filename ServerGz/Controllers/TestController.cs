using Microsoft.AspNetCore.Mvc;
using ServerGz.Models;
using System;
using Microsoft.AspNetCore.Authorization;

namespace ServerGz.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet]
        [Authorize(Roles="admin")]
        public TestModel Get()
        {
            Console.WriteLine("accept call");

            var value = new TestModel{ name ="nguyen"};
            return value;
        }
    }
}
