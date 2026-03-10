using OpenAI.Chat;

namespace DocumentAPI.Services;

public class AiService
{
    private readonly string? _apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");

    public async Task<string> AskQuestion(string documentText, string question)
    {
        if (string.IsNullOrEmpty(_apiKey))
            throw new InvalidOperationException("OPENAI_API_KEY environment variable is not set.");

        var client = new ChatClient("gpt-4o-mini", _apiKey);

        var messages = new List<ChatMessage>
        {
            new SystemChatMessage("Answer questions based only on the provided document."),
            new UserChatMessage($"Document:\n{documentText}\n\nQuestion: {question}")
        };

        var response = await client.CompleteChatAsync(messages);

        var completion = response.Value;

        return completion.Content[0].Text;
    }
}