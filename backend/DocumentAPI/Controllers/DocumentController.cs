using DocumentAPI.Models;
using DocumentAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace DocumentAPI.Controllers;

[ApiController]
[Route("documents")]
public class DocumentController : ControllerBase
{
    private readonly PdfService _pdfService;
    private readonly AiService _aiService;
    private readonly ChunkService _chunkService;


    public DocumentController(PdfService pdfService, AiService aiService, ChunkService chunkService)
{
    _pdfService = pdfService;
    _aiService = aiService;
    _chunkService = chunkService;
}


    [HttpGet]
    public IActionResult GetDocuments()
    {
        return Ok(DocumentStore.documents);
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadPdf(IFormFile file, CancellationToken cancellationToken)
    {
        if (file is null || file.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }

        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
        Directory.CreateDirectory(uploadsDir);

        var filePath = Path.Combine(uploadsDir, file.FileName);

        await using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream, cancellationToken);
        }

        var text = _pdfService.ExtractText(filePath);

        var chunks = _chunkService.SplitText(text);

        var doc = new Document
        {
            Id = DocumentStore.documents.Count + 1,
            FileName = file.FileName,
            Content = text
        };

        DocumentStore.documents.Add(doc);

        return Ok(doc);
    }

    [HttpPost("/ask")]
public async Task<IActionResult> Ask([FromBody] QuestionRequest request)
{
    var docs = DocumentStore.documents;

    if (!docs.Any())
        return BadRequest("No documents uploaded.");

    var words = request.Question
    .Split(" ", StringSplitOptions.RemoveEmptyEntries);

var bestMatch = docs
    .SelectMany(d => _chunkService.SplitText(d.Content)
        .Select(chunk => new { Chunk = chunk, Document = d }))
    .FirstOrDefault(x =>
        words.Any(word =>
            x.Chunk.Contains(word, StringComparison.OrdinalIgnoreCase)));

            if (bestMatch == null)
{
    var firstDoc = docs.First();
    bestMatch = new
    {
        Chunk = firstDoc.Content,
        Document = firstDoc
    };
}

var answer = await _aiService.AskQuestion(bestMatch.Chunk, request.Question);

 return Ok(new
{
    answer,
    source = bestMatch.Document.FileName
});

}
}
