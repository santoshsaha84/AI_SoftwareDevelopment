namespace GrowthGuide.Core.Interfaces;

public interface IAIGrowingService
{
    Task<string> GetGrowingDetailsAsync(string cropName);
}
