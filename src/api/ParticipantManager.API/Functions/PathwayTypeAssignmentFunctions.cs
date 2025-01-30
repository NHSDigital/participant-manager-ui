using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ParticipantManager.API.Functions;

public class PathwayTypeAssignmentFunctions
{
  private readonly ILogger<PathwayTypeAssignmentFunctions> _logger;

  public PathwayTypeAssignmentFunctions(ILogger<PathwayTypeAssignmentFunctions> logger)
  {
    _logger = logger;
  }

  [Function("PathwayTypeAssignmentFunctions")]
  public IActionResult Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
  {
    _logger.LogInformation("C# HTTP trigger function processed a request.");
    return new OkObjectResult("Welcome to Azure Functions!");

  }

}
