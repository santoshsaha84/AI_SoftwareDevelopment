# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy everything and restore as distinct layers
COPY . .
RUN dotnet restore "backend/GrowthGuide.Api/GrowthGuide.Api.csproj"

# Build and publish a release
RUN dotnet publish "backend/GrowthGuide.Api/GrowthGuide.Api.csproj" -c Release -o /app/publish

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "GrowthGuide.Api.dll"]
