using DocumentAPI.Models;

namespace DocumentAPI.Services;

/// <summary>
/// In-memory list shared by documents upload and /ask endpoints.
/// </summary>
public static class DocumentStore
{
    public static readonly List<Document> documents = new();
}

