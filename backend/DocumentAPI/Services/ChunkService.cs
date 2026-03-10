namespace DocumentAPI.Services;

public class ChunkService
{
    public List<string> SplitText(string text, int chunkSize = 500)
    {
        var chunks = new List<string>();

        for (int i = 0; i < text.Length; i += chunkSize)
        {
            var length = Math.Min(chunkSize, text.Length - i);
            chunks.Add(text.Substring(i, length));
        }

        return chunks;
    }
}