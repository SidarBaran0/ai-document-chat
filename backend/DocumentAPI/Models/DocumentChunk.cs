namespace DocumentAPI.Models;

public class DocumentChunk
{
    public int Id { get; set; }

    public string Content { get; set; }

    public int DocumentId { get; set; }
}