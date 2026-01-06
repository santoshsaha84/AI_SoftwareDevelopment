using GrowthGuide.Core.Interfaces;

namespace GrowthGuide.Infra.Services;

public class MockAIService : IAIGrowingService
{
    public Task<string> GetGrowingDetailsAsync(string cropName)
    {
        return Task.FromResult($"AI Growing Details for {cropName}: Requires well-drained soil, full sun, and regular watering. (Mock response)");
    }
}
