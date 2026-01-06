using GrowthGuide.Core.Entities;
using GrowthGuide.Infra.Data;
using GrowthGuide.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GrowthGuide.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IAIGrowingService _aiService;

    public ItemsController(AppDbContext context, IAIGrowingService aiService)
    {
        _context = context;
        _aiService = aiService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Item>> GetItem(int id)
    {
        var item = await _context.Items
            .Include(i => i.Category)
            .FirstOrDefaultAsync(i => i.Id == id);

        if (item == null)
        {
            return NotFound();
        }

        return item;
    }

    [HttpGet("{id}/growing-details")]
    public async Task<ActionResult<string>> GetGrowingDetails(int id)
    {
        var item = await _context.Items.FindAsync(id);
        
        if (item == null)
            return NotFound();

        // Check cache first (optional, simplest implementation for now)
        if (!string.IsNullOrEmpty(item.GrowingDetails))
        {
             return item.GrowingDetails;
        }

        var details = await _aiService.GetGrowingDetailsAsync(item.Name);
        
        // Cache it? (requires saving to DB, skip for now or do it)
        // item.GrowingDetails = details;
        // await _context.SaveChangesAsync();
        
        return Ok(details);
    }
}
