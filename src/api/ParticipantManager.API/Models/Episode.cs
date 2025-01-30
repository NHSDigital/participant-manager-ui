namespace ParticipantManager.API.Models;

public class Episode
{
  public Guid EpisodeId { get; set; }
  public Guid AssignmentId { get; set; }
  public string PathwayVersion { get; set; }
  public string Status { get; set; }
  public PathwayTypeAssignment PathwayTypeAssignment { get; set; }
  public ICollection<Encounter> Encounters { get; set; }
}
