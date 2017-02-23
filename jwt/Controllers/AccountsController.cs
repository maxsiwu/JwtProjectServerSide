using jwt.Infrastructure;
using jwt.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace jwt.Controllers {
    [RoutePrefix("api/accounts")]
    public class AccountsController : BaseApiController {
        [Authorize(Roles="Admin")] 
	    [Route("users")]
	    public IHttpActionResult GetUsers() {
		    return Ok(this.AppUserManager.Users.ToList()
                     .Select(u => this.TheModelFactory.Create(u)));
	    }

        [Authorize(Roles="Admin")] 
	    [Route("user/{id:guid}", Name = "GetUserById")]
	    public async Task<IHttpActionResult> GetUser(string Id) {
		    var user = await this.AppUserManager.FindByIdAsync(Id);
		    if (user != null) {
			    return Ok(this.TheModelFactory.Create(user));
		    }
		    return NotFound();
	    }

        [Authorize(Roles="Admin")] 
	    [Route("user/{username}")]
	    public async Task<IHttpActionResult> GetUserByName(string username) {
            var user = await this.AppUserManager.FindByNameAsync(username);

            if (user != null)
		    {
                return Ok(this.TheModelFactory.Create(user));
            }
		    return NotFound();
	    }

        [Route("role/{username}")]
        public async Task<IHttpActionResult> GetUserRole(string username)
        {
            var user = await this.AppUserManager.FindByIdAsync(User.Identity.GetUserId());
            if (user != null)
            {
                return Ok(this.TheModelFactory.Create(user));
            }
            return NotFound();
        }

        [Route("create")]
        public async Task<IHttpActionResult> CreateUser(
                     CreateUserBindingModel createUserModel) {
	        if (!ModelState.IsValid) {
		        return BadRequest(ModelState);
	        }
            var existingUser 
            = await this.AppUserManager
            .FindByEmailAsync(createUserModel.Email.ToLower());

            if(existingUser!= null) {
                return BadRequest(ModelState);
            }
	        var user = new ApplicationUser() {
		        UserName = createUserModel.Username,
		        Email = createUserModel.Email,
		        FirstName = createUserModel.FirstName,
		        LastName = createUserModel.LastName,
		        Level = 3,
		        JoinDate = DateTime.Now.Date,
	        };

	        IdentityResult addUserResult = 
            await this.AppUserManager.CreateAsync(user, createUserModel.Password);

	        if (!addUserResult.Succeeded) {
		        return GetErrorResult(addUserResult);
	        }

            string code = await this.AppUserManager.GenerateEmailConfirmationTokenAsync(user.Id);
            string encodedCode = code.Replace("+", "%2B").Replace("/", "%2F");
            //var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute",
            //                  new { userId = user.Id, code = code }));
            var callbackUrl = "http://localhost:3000/page-confirm-email?max=true&userid="+ user.Id +"&code=" + encodedCode;
            
            await this.AppUserManager.SendEmailAsync(user.Id,"Confirm your account", 
            "Please confirm your account by clicking <a href=\"" + callbackUrl + "\">here</a>");

            Uri locationHeader = new Uri(Url.Link("GetUserById", new { id = user.Id }));
            return Created(locationHeader, TheModelFactory.Create(user));
        }

        [Authorize(Roles="Admin")]
        [Route("user/{email}/{roles}")]
        [HttpPut]
        public async Task<IHttpActionResult> AssignRolesToUser([FromUri] string email,
            [FromUri] string roles) {
	        var appUser = await this.AppUserManager.FindByEmailAsync(email);
	        if (appUser == null) {
		        return NotFound();
	        }
            string[] rolesArray = roles.Replace(" ", "").Split(',');
	        var currentRoles   = await this.AppUserManager.GetRolesAsync(appUser.Id);
	        var rolesNotExists = rolesArray.Except(this.AppRoleManager
                .Roles.Select(x => x.Name)).ToArray();

	        if (rolesNotExists.Count() > 0) {
		        ModelState.AddModelError("", 
                    string.Format("Roles '{0}' does not exists in the system", 
                    string.Join(",", rolesNotExists)));
		        return BadRequest(ModelState);
	        }

	        IdentityResult removeResult = await 
                this.AppUserManager.RemoveFromRolesAsync(appUser.Id, currentRoles.ToArray());
	        if (!removeResult.Succeeded) {
		        ModelState.AddModelError("", "Failed to remove user roles");
		        return BadRequest(ModelState);
	        }

	        IdentityResult addResult 
            = await this.AppUserManager.AddToRolesAsync(appUser.Id, rolesArray);

	        if (!addResult.Succeeded) {
		        ModelState.AddModelError("", "Failed to add user roles");
		        return BadRequest(ModelState);
	        }
	        return Ok("Roles: " + roles + " have been assigned");
        }

        [Authorize]
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.AppUserManager
           .ChangePasswordAsync(User.Identity.GetUserId(), model.OldPassword, model.NewPassword);

            if (!result.Succeeded) {
                return GetErrorResult(result);
            }
            return Ok("Password updated.");
        }

        [HttpPost]
        //[Route("ConfirmEmail", Name = "ConfirmEmailRoute")]
        [Route("confirmemail")]
        public async Task<IHttpActionResult> ConfirmEmail(ConfirmEmailModel model) {
            string decodedCode = model.Token.Replace("%2B", "+").Replace("%2F", "/");
            if (string.IsNullOrWhiteSpace(model.UserID) || string.IsNullOrWhiteSpace(decodedCode)) {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            IdentityResult result = await this.AppUserManager.ConfirmEmailAsync(model.UserID, decodedCode);
            if (result.Succeeded) {
                return Ok("Email Confirmed.");
            }
            else {
                return GetErrorResult(result);
            }
        }
    }
}
