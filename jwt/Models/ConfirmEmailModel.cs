using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace jwt.Models
{
    public class ConfirmEmailModel
    {
        [Required]
        public string UserID { get; set; }
        [Required]
        public string Token { get; set; }
    }
}