using GrowthGuide.Core.Entities;
using GrowthGuide.Infra.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GrowthGuide.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public CategoriesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _context.Categories.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Category>> GetCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        return category;
    }

    [HttpGet("{id}/items")]
    public async Task<ActionResult<IEnumerable<Item>>> GetCategoryItems(int id)
    {
        var items = await _context.Items
            .Where(i => i.CategoryId == id)
            .ToListAsync();

        return items;
    }
}
