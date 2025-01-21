using DziennikTreningowyAPI.Domain.Interfaces.Utilities;

namespace DziennikTreningowyAPI.Domain.Interfaces.Measurment;

public interface IMeasurmentRepository : IGenericRepository<Entities.Measurment>
{
    Task<IEnumerable<Entities.Measurment>> GetAllByProfileAsync(Guid profileId);
}