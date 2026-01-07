# Build stage for Frontend
FROM node:20 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Build stage for Backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY . .
RUN dotnet restore "backend/GrowthGuide.Api/GrowthGuide.Api.csproj"
RUN dotnet publish "backend/GrowthGuide.Api/GrowthGuide.Api.csproj" -c Release -o /app/out

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app/out .
COPY --from=frontend-build /app/frontend/dist ./wwwroot
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "GrowthGuide.Api.dll"]
