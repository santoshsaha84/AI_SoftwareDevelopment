using GrowthGuide.Core.Entities;
using GrowthGuide.Infra.Data;
using Microsoft.EntityFrameworkCore;

namespace GrowthGuide.Infra.Data;

public static class DbInitializer
{
    public static async Task Initialize(AppDbContext context)
    {
        context.Database.EnsureCreated();

        if (await context.Categories.AnyAsync())
        {
            return;   // DB has been seeded
        }

        var categories = new Category[]
        {
            new Category { Name = "Fruits", ImageUrl = "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=800&q=80" },
            new Category { Name = "Vegetables", ImageUrl = "https://images.unsplash.com/photo-1566385101042-1a000c1268c4?auto=format&fit=crop&w=800&q=80" },
            new Category { Name = "Flowers", ImageUrl = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80" },
            new Category { Name = "Shrubs", ImageUrl = "https://images.unsplash.com/photo-1584479898061-15742e14f50d?auto=format&fit=crop&w=800&q=80" }
        };

        foreach (var c in categories)
        {
            context.Categories.Add(c);
        }
        await context.SaveChangesAsync();

        var items = new Item[]
        {
            new Item { Name = "Apple", ImageUrl = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80", CategoryId = categories[0].Id, GrowingDetails = "Apples grow on trees and like temperate climates." },
            new Item { Name = "Banana", ImageUrl = "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80", CategoryId = categories[0].Id, GrowingDetails = "Bananas need lots of water and tropical sun." },
            new Item { Name = "Tomato", ImageUrl = "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80", CategoryId = categories[1].Id, GrowingDetails = "Tomatoes need trellis support and full sun." },
            new Item { Name = "Carrot", ImageUrl = "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80", CategoryId = categories[1].Id, GrowingDetails = "Carrots need light, sandy soil to grow straight." },
            new Item { Name = "Rose", ImageUrl = "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80", CategoryId = categories[2].Id, GrowingDetails = "Roses need regular pruning and lots of sun." },
            new Item { Name = "Sunflower", ImageUrl = "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=800&q=80", CategoryId = categories[2].Id, GrowingDetails = "Sunflowers follow the sun and need space." },
            new Item { Name = "Boxwood", ImageUrl = "https://images.unsplash.com/photo-1596438459194-f275f413d6ff?auto=format&fit=crop&w=800&q=80", CategoryId = categories[3].Id, GrowingDetails = "Boxwoods are great for hedges and topiary." },
            new Item { Name = "Hydrangea", ImageUrl = "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80", CategoryId = categories[3].Id, GrowingDetails = "Hydrangeas love morning sun and plenty of water." }
        };

        foreach (var i in items)
        {
            context.Items.Add(i);
        }
        await context.SaveChangesAsync();
    }
}
